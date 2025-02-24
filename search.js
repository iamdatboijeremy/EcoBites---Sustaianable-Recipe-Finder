// Handle the search functionality
const searchInput = document.getElementById('search-input');
const searchDropdown = document.getElementById('search-dropdown');

// Fetch and filter recipes for search dropdown
async function fetchAndFilterRecipes(query) {
    try {
        const response = await fetch('recipes.json');
        if (!response.ok) throw new Error('Failed to fetch recipes');

        const data = await response.json();
        return data.recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(query) ||
            recipe.short_description.toLowerCase().includes(query)
        );
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

// Display filtered recipes in the dropdown
function displayDropdownItems(filteredRecipes) {
    searchDropdown.innerHTML = '';

    if (filteredRecipes.length === 0) {
        const noResultsItem = document.createElement('div');
        noResultsItem.classList.add('search-dropdown-item');
        noResultsItem.textContent = 'No results found';
        searchDropdown.appendChild(noResultsItem);
        return;
    }

    filteredRecipes.forEach(recipe => {
        const dropdownItem = document.createElement('div');
        dropdownItem.classList.add('search-dropdown-item');
        dropdownItem.textContent = recipe.name;
        dropdownItem.addEventListener('click', () => {
            window.location.href = `search_results.html?query=${encodeURIComponent(recipe.name)}`;
        });
        searchDropdown.appendChild(dropdownItem);
    });
}

// Debounce user input for search efficiency
let debounceTimeout;
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    clearTimeout(debounceTimeout);
    if (query.length > 0) {
        debounceTimeout = setTimeout(async () => {
            const filteredRecipes = await fetchAndFilterRecipes(query);
            displayDropdownItems(filteredRecipes);
            searchDropdown.classList.remove('hidden');
        }, 300);
    } else {
        searchDropdown.classList.add('hidden');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
        searchDropdown.classList.add('hidden');
    }
});

// Redirect on search button click
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();

    if (query) {
        window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
    } else {
        alert('Please enter a search term.');
    }
});
