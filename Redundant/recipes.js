async function fetchRecipes() {
    try {
        const response = await fetch('recipes.json'); // Fetch the local JSON file
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function getRandomRecipes(recipes, count) {
    const shuffled = recipes.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}


// Fetch and display recipes on page load
document.addEventListener('DOMContentLoaded', fetchRecipes);