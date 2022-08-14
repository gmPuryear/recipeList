import React from 'react'
import '../css/app.css';
import RecipeList from "./RecipeList";
import '../css/app.css'
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid'

//Components: -left(list of recipes) and right side of screen (edit section of current recipe selected)
//                 -Particular recipes inside the recipe list
//                 -ingredients section

function App() {
    // first time we call "useState" it is setting recipe to 'samplerecipes'. Once 'setrecipes' is called
    //  is used to update recipe list.
    // "recipes" is our current state, while setRecipes is our function to change the state
    const [recipes, setRecipes] = useState(sampleRecipes);

    // this function creates a new recipe, then "setRecipes() is called
    const handleRecipeAdd = () => {
        const newRecipe = {
            id: uuidv4(),
            name: 'New',
            servings: 1,
            cookTime: '1:00',
            instructions: 'Instr.',
            ingredients: [
                {
                    id: uuidv4(),
                    name: 'Name',
                    amount: '1 Tbs'
                }
            ]
        }
        // vv This uses spread operator that expects array of recipes, take current recipes array, spread over it
        // which means we are getting all the recipes we have now, then add a newRecipe then create a new array
        // with all the recipes
            // Here we are calling "newRecipe", then passing what we want our state to be
        setRecipes([...recipes, newRecipe])
    }

    const handleRecipeDelete = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id)) // so give me every recipe
    }

    return (
        <RecipeList
            recipes={recipes}  // recipe prop that will pass in all sample recipes
            handleRecipeAdd={handleRecipeAdd}
            handleRecipeDelete={handleRecipeDelete}
        />
    );


}


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


export default App;
