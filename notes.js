document.addEventListener('DOMContentLoaded', function () {
    const recipeId = getRecipeIdFromURL(); // Extract recipe ID from URL
    const userId = getUserIdFromSession(); // Get logged-in user ID from session/localStorage
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-note');
    const deleteButton = document.getElementById('delete-note');
    const noteStatus = document.getElementById('note-status');

    let currentNoteId = null; // To track the ID of the current note (if it exists)

    // Fetch existing note for the recipe
    fetch(`/api/notes?recipe_id=${recipeId}`)
        .then(response => response.json())
        .then(notes => {
            if (notes.length > 0) {
                const note = notes[0]; // Assuming only one note per recipe per user
                noteInput.value = note.note; // Pre-fill the textarea with the saved note
                currentNoteId = note.id; // Store the note ID for updates/deletes
                deleteButton.style.display = 'inline-block'; // Show the delete button
            }
        })
        .catch(error => {
            console.error("Error fetching notes:", error);
            noteStatus.textContent = "Failed to load notes. Please try again.";
        });

    // Save or update note
    saveButton.addEventListener('click', function () {
        const noteText = noteInput.value.trim();
        if (!noteText) return alert("Note cannot be empty!");

        const url = currentNoteId ? `/api/notes/${currentNoteId}` : '/api/notes';
        const method = currentNoteId ? 'PATCH' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                recipe_id: recipeId,
                note: noteText
            })
        })
        .then(response => {
            if (response.ok) {
                if (!currentNoteId) {
                    // If it was a new note, fetch the ID of the newly created note
                    return fetch(`/api/notes?recipe_id=${recipeId}`)
                        .then(res => res.json())
                        .then(notes => {
                            currentNoteId = notes[0].id; // Update the current note ID
                            deleteButton.style.display = 'inline-block'; // Show delete button
                        });
                }
                noteStatus.textContent = "Note saved successfully!";
            } else {
                throw new Error("Failed to save note.");
            }
        })
        .catch(error => {
            console.error("Error saving note:", error);
            noteStatus.textContent = "Failed to save note. Please try again.";
        });
    });

    // Delete note
    deleteButton.addEventListener('click', function () {
        if (!currentNoteId) return;

        fetch(`/api/notes/${currentNoteId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                noteInput.value = ''; // Clear the textarea
                currentNoteId = null; // Reset the note ID
                deleteButton.style.display = 'none'; // Hide the delete button
                noteStatus.textContent = "Note deleted successfully!";
            } else {
                throw new Error("Failed to delete note.");
            }
        })
        .catch(error => {
            console.error("Error deleting note:", error);
            noteStatus.textContent = "Failed to delete note. Please try again.";
        });
    });

    // Helper functions
    function getRecipeIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Assuming recipe ID is passed as a query parameter
    }

    function getUserIdFromSession() {
        // Replace this with actual session management logic
        return localStorage.getItem('userId'); // Example: Store user ID in localStorage after login
    }
});