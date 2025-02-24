const BASE_URL = "http://localhost:5000/api";

// Register User
async function registerUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include", // Ensures cookies are stored
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Registration failed");

        alert("Registration successful! Redirecting...");
        setTimeout(() => (window.location.href = "login.html"), 2000);
        return { success: true, data };
    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: error.message };
    }
}

// Login User
async function loginUser(userData) {
    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
            credentials: "include", // Ensures cookies are sent & received
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed");

        alert("Login successful! Redirecting...");
        setTimeout(() => (window.location.href = "index.html"), 2000);
        return { success: true, data };
    } catch (error) {
        console.error("Login Error:", error);
        return { success: false, message: error.message };
    }
}

// Fetch User Profile
async function fetchUserProfile() {
    try {
        const response = await fetch(`${BASE_URL}/users/profile`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Ensures session is included
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch profile");

        return { success: true, data };
    } catch (error) {
        console.error("Profile Fetch Error:", error);
        return { success: false, message: error.message };
    }
}

// Logout User
async function logoutUser() {
    try {
        await fetch(`${BASE_URL}/users/logout`, {
            method: "POST",
            credentials: "include", // Ensures cookies are cleared
        });

        alert("Logged out successfully!");
        window.location.href = "login.html";
    } catch (error) {
        console.error("Logout Error:", error);
    }
}

// Add Recipe to Favorites
async function addToFavorites(recipeId) {
    try {
        const response = await fetch(`${BASE_URL}/favorites/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId }),
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to add to favorites");

        alert("Recipe added to favorites!");
        return { success: true, data };
    } catch (error) {
        console.error("Favorites Error:", error);
        return { success: false, message: error.message };
    }
}

// Remove Recipe from Favorites
async function removeFromFavorites(recipeId) {
    try {
        const response = await fetch(`${BASE_URL}/favorites/remove`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipeId }),
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to remove from favorites");

        alert("Recipe removed from favorites!");
        return { success: true, data };
    } catch (error) {
        console.error("Remove Favorite Error:", error);
        return { success: false, message: error.message };
    }
}

// Fetch All Recipes
async function fetchRecipes() {
    try {
        const response = await fetch(`${BASE_URL}/recipes/`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch recipes");

        return { success: true, data };
    } catch (error) {
        console.error("Fetch Recipes Error:", error);
        return { success: false, message: error.message };
    }
}

// Fetch a Single Recipe
async function fetchRecipe(recipeId) {
    try {
        const response = await fetch(`${BASE_URL}/recipes/${recipeId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch recipe");

        return { success: true, data };
    } catch (error) {
        console.error("Fetch Recipe Error:", error);
        return { success: false, message: error.message };
    }
}

/* ---------- Notes Handling ---------- */
// Add a Note
async function addNote(noteData) {
    try {
        const response = await fetch(`${BASE_URL}/notes/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(noteData),
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to add note");

        alert("Note added successfully!");
        return { success: true, data };
    } catch (error) {
        console.error("Add Note Error:", error);
        return { success: false, message: error.message };
    }
}

// Fetch All Notes
async function fetchNotes() {
    try {
        const response = await fetch(`${BASE_URL}/notes/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch notes");

        return { success: true, data };
    } catch (error) {
        console.error("Fetch Notes Error:", error);
        return { success: false, message: error.message };
    }
}

// Delete a Note
async function deleteNote(noteId) {
    try {
        const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to delete note");

        alert("Note deleted successfully!");
        return { success: true, data };
    } catch (error) {
        console.error("Delete Note Error:", error);
        return { success: false, message: error.message };
    }
}

// Make functions globally accessible
window.registerUser = registerUser;
window.loginUser = loginUser;
window.fetchUserProfile = fetchUserProfile;
window.logoutUser = logoutUser;
window.addToFavorites = addToFavorites;
window.removeFromFavorites = removeFromFavorites;
window.fetchRecipes = fetchRecipes;
window.fetchRecipe = fetchRecipe;
window.addNote = addNote;
window.fetchNotes = fetchNotes;
window.deleteNote = deleteNote;
