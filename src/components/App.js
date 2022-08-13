import '../css/app.css';
import RecipeList from "./RecipeList";
import '../css/app.css'
//Components: -left(list of recipes) and right side of screen (edit section of current recipe selected)
//                 -Particular recipes inside the recipe list
//                 -ingredients section

function App() {
    const sampleRecipes = [
        {
            id: 1,
            name: "Plain Chicken",
            servings: 3,
            cookTime: '1:45',
            instructions: '1. Put salt on chicken\n2. Put chicken in oven\n3. Eat Chicken',
            ingredients: [{
                id: 1,
                name: 'Chicken',
                amount: '2 Pounds'
            },
                {
                    id: 2,
                    name: 'Salt',
                    amount: '1 Tbs'
                }]
        },
        {
            id: 2,
            name: "Plain Pork",
            servings: 5,
            cookTime: '0:45',
            instructions: '1. Put paprika on pork\n 2. Put pork in oven\n3. Eat pork',
            ingredients: [{
                id: 1,
                name: 'Pork',
                amount: '3 Pounds'
            },
                {
                    id: 2,
                    name: 'Paprika',
                    amount: '2 Tbs'
                }]
        }
    ]

    return (
        <RecipeList recipes={sampleRecipes} /> // recipe prop that will pass in all sample recipes
    );
}

export default App;
