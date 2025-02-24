import json
from bs4 import BeautifulSoup

# Load the recipe data from recipes.json
with open('recipes.json', 'r', encoding='utf-8') as file:
    recipes_data = json.load(file)

# Define trending recipes (you can modify this list based on your criteria)
trending_recipes = ["Jollof Rice", "Pasta", "Beans (Ewa Agoyin)", "Afang Soup", "Efo Riro", "Egusi Soup", "Fried Rice", "Okro Soup", "Pilaf", "Yam Porridge"]  # Example trending recipes

# Generate the recipe card HTML for each trending recipe
trending_recipes_html = ""
for recipe in recipes_data['recipes']:
    if recipe['name'] in trending_recipes:
        recipe_name = recipe['name']
        recipe_file = recipe_name.replace(' ', '_').lower() + ".html"
        recipe_card = f"""
        <div class="recipe-card">
            <a href="{recipe_file}">
                <img src="{recipe['image']}" alt="{recipe_name}">
                <h3>{recipe_name}</h3>
                <p>{recipe['short_description']}</p>
            </a>
        </div>
        """
        trending_recipes_html += recipe_card

# Read the existing index.html file
with open('index.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

# Find the trendingrecipes section and update it
trending_section = soup.find(id='trendingrecipes')
if trending_section:
    trending_container = trending_section.find(id='trending-recipes-container')
    if trending_container:
        trending_container.clear()  # Clear existing content
        trending_container.append(BeautifulSoup(trending_recipes_html, 'html.parser'))  # Add new content

# Write the updated content back to index.html
with open('index.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))

print("Index page has been updated with clickable links to trending recipes.")