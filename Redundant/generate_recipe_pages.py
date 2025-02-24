import json

# Load the recipe data from recipes.json
with open('recipes.json', 'r', encoding='utf-8') as file:
    recipes_data = json.load(file)

# Function to generate HTML content for a recipe
def generate_recipe_html(recipe):
    # Use .get() to safely access dictionary keys and provide default values if keys are missing
    time = recipe.get('time', 'N/A')
    calories = recipe.get('calories', 'N/A')
    ingredients = recipe.get('ingredients', [])
    instructions = recipe.get('instructions', [])
    sustainability_points = recipe.get('why_this_recipe_is_sustainable', [])
    sustainability_ratings = recipe.get('sustainability_ratings', {})

    # Convert ingredients to HTML list items
    ingredients_html = ''.join([f'<li>{ingredient["quantity"]} {ingredient["item"]}</li>' for ingredient in ingredients])

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe - {recipe['name']}</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .recipe-header {{
            display: flex;
            align-items: center;
            padding: 20px;
            background-color: #f8f8f8;
        }}

        .recipe-header img {{
            max-width: 300px;
            border-radius: 10px;
            margin-right: 20px;
        }}

        .recipe-info {{
            flex-grow: 1;
        }}

        .recipe-info h2 {{
            margin-bottom: 10px;
        }}

        .recipe-meta {{
            display: flex;
            gap: 20px;
        }}

        .meta-item {{
            display: flex;
            align-items: center;
        }}

        .meta-item img {{
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }}

        .recipe-description, .ingredients, .instructions, .sustainability {{
            padding: 20px;
            background-color: #fff;
            margin-bottom: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }}

        .ingredients ul, .sustainability ul {{
            list-style-type: disc;
            margin-left: 20px;
        }}

        .instructions ol {{
            margin-left: 20px;
        }}

        .sustainability-ratings {{
            margin-top: 10px;
        }}

        .sustainability-ratings .rating {{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
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
        <section class="recipe-header">
            <img src="{recipe['image']}" alt="{recipe['name']}">
            <div class="recipe-info">
                <h2>{recipe['name']}</h2>
                <div class="recipe-meta">
                    <div class="meta-item">
                        <img src="icons/clock.png" alt="Clock Icon">
                        <span>{time}</span>
                    </div>
                    <div class="meta-item">
                        <img src="icons/flame.png" alt="Flame Icon">
                        <span>{calories} calories</span>
                    </div>
                    <div class="meta-item">
                        <img src="icons/heart.png" alt="Heart Icon">
                        <button>Add to Favorites</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="recipe-description">
            <p>{recipe['short_description']}</p>
        </section>

        <section class="ingredients">
            <h3>Ingredients</h3>
            <ul>
                {ingredients_html}
            </ul>
        </section>

        <section class="instructions">
            <h3>Instructions</h3>
            <ol>
                {''.join([f'<li>{instruction}</li>' for instruction in instructions])}
            </ol>
        </section>

        <section class="sustainability">
            <h3>Why This Recipe is Sustainable</h3>
            <ul>
                {''.join([f'<li>{point}</li>' for point in sustainability_points])}
            </ul>

            <div class="sustainability-ratings">
                <h4>Sustainability Ratings</h4>
                <div class="rating">
                    <span>Water Usage:</span>
                    <span>{'★' * sustainability_ratings.get('water_usage', 0) + '☆' * (5 - sustainability_ratings.get('water_usage', 0))}</span>
                </div>
                <div class="rating">
                    <span>Energy Impact:</span>
                    <span>{'★' * sustainability_ratings.get('energy_impact', 0) + '☆' * (5 - sustainability_ratings.get('energy_impact', 0))}</span>
                </div>
                <div class="rating">
                    <span>Waste Consideration:</span>
                    <span>{'★' * sustainability_ratings.get('waste_consideration', 0) + '☆' * (5 - sustainability_ratings.get('waste_consideration', 0))}</span>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <p>&copy; 2025 EcoBites. All rights reserved.</p>
    </footer>
</body>
</html>
"""
    return html_content

# Create the recipe pages
for recipe in recipes_data['recipes']:
    recipe_name = recipe['name'].replace(' ', '_').lower()
    html_content = generate_recipe_html(recipe)
    with open(f'{recipe_name}.html', 'w', encoding='utf-8') as file:
        file.write(html_content)

print("Recipe pages have been generated.")