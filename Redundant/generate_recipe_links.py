import json
import os

# Load the recipe data from recipes.json
with open('recipes.json', 'r', encoding='utf-8') as file:
    recipes_data = json.load(file)

# Define the base HTML structure of the recipes page
recipes_html_structure = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipes - EcoBites</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .recipe-container {{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }}

        .recipe-card {{
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin: 10px;
            padding: 15px;
            width: 300px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }}

        .recipe-card img {{
            max-width: 100%;
            border-radius: 5px;
        }}

        .recipe-card h3 {{
            margin: 10px 0;
            color: #333;
        }}

        .recipe-card p {{
            color: #666;
        }}
    </style>
</head>
<body>
    <header>
        <h1><a href="index.html"><span class="title-eco">Eco</span><span class="title-bites">Bites</span></a></h1>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="recipes.html">Recipes</a></li>
                <li id="favorites-link" class="hidden"><a href="#">Favorites</a></li>
                <li id="sign-in-link"><a href="signin.html">Sign In</a></li>
                <li id="profile-link" class="hidden"><a href="profile.html">Profile</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section id="recipes">
            <h2>All Recipes</h2>
            <div id="recipes-container" class="recipe-container">
                {recipe_cards}
            </div>
        </section>
    </main>
    <footer>
        <p>&copy; 2025 EcoBites. All rights reserved.</p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', function() {{
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user) {{
                document.getElementById('sign-in-link').classList.add('hidden');
                document.getElementById('profile-link').classList.remove('hidden');
                document.getElementById('favorites-link').classList.remove('hidden');
            }}
        }});
    </script>
</body>
</html>
"""

# Generate the recipe card HTML for each recipe
recipe_cards_html = ""
for recipe in recipes_data['recipes']:
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
    recipe_cards_html += recipe_card

# Insert the generated recipe cards into the HTML structure
final_recipes_html = recipes_html_structure.format(recipe_cards=recipe_cards_html)

# Write the final HTML to recipes.html
with open('recipes.html', 'w', encoding='utf-8') as file:
    file.write(final_recipes_html)

print("Recipes page has been updated with links to all recipes.")