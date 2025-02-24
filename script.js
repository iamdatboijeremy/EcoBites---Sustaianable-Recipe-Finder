// Fetch recipes from the JSON file and render them
async function fetchAndRenderRecipes() {
    const recipeContainer = document.getElementById('recipes-container');
    const loadingIndicator = document.getElementById('loading-indicator');
    
    try {
        // Show the loading indicator
        loadingIndicator.classList.remove('hidden');

        const response = await fetch('recipes.json');
        if (!response.ok) throw new Error('Failed to fetch recipes');

        const data = await response.json();

        // Render recipes
        renderRecipes(data.recipes);
    } catch (error) {
        // Display an error message
        recipeContainer.innerHTML = '<p class="error">Unable to load recipes. Please try again later.</p>';
        console.error(error);
    } finally {
        // Hide the loading indicator
        loadingIndicator.classList.add('hidden');
    }
}

// Render recipes with pagination
function renderRecipes(recipes) {
    const recipesPerPage = 6;
    let currentPage = 1;
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    const recipeContainer = document.getElementById('recipes-container');
    const paginationContainer = document.getElementById('pagination-container');

    function displayPage(page) {
        recipeContainer.innerHTML = '';
        const start = (page - 1) * recipesPerPage;
        const end = start + recipesPerPage;

        recipes.slice(start, end).forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <a href="${recipe.file}">
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.short_description}</p>
                </a>
            `;
            recipeContainer.appendChild(recipeCard);
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('pagination-button');
            if (i === currentPage) pageButton.classList.add('active');

            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayPage(currentPage);
                renderPagination();
            });

            paginationContainer.appendChild(pageButton);
        }
    }

    displayPage(currentPage);
    renderPagination();
}

// Highlight the active navigation link
function highlightActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}

// Add a Back to Top button functionality
function addBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.textContent = 'Back to Top';
    document.body.appendChild(backToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.classList.add('hidden');
}

// Handle search functionality
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            alert('Please enter a search term.');
            return;
        }

        fetch('recipes.json')
            .then(response => response.json())
            .then(data => {
                const filteredRecipes = data.recipes.filter(recipe =>
                    recipe.name.toLowerCase().includes(query) ||
                    recipe.short_description.toLowerCase().includes(query)
                );

                if (filteredRecipes.length > 0) {
                    renderRecipes(filteredRecipes);
                } else {
                    document.getElementById('recipes-container').innerHTML = '<p>No recipes found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching recipes for search:', error);
            });
    });
}

// Initialize the script
function init() {
    fetchAndRenderRecipes();
    highlightActiveNav();
    addBackToTopButton();
    handleSearch();
}

document.addEventListener('DOMContentLoaded', init);
