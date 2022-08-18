import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import {v4 as uuidv4} from 'uuid'

//***Components***: -left(list of recipes) and right side of screen (edit section of current recipe selected)
//                 -Particular recipes inside the recipe list
//                 -ingredients section




// here we have context that just contains the "handleRecipeAdd" and "handleRecipeDelete" functions
export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
    // first time we call "useState" it is setting recipe to 'samplerecipes'. Once 'setrecipes' is called
    //  is used to update recipe list.
    // "recipes" is our current state, while setRecipes is our function to change the state
    const [recipes, setRecipes] = useState(() => {
        const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (recipeJSON == null) {
            return sampleRecipes;
        } else {
            return JSON.parse(recipeJSON);
        }
    })

    // *** No longer using this useEffect ***
    // useEffect(() => {
        // we only want this to run once (loads all recipes) when the application is loaded, so we put an empty []
        // const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    //     if (recipeJSON !== null) {setRecipes(JSON.parse(recipeJSON))};
    // },[])

    // lets us actually do some sort of side effect everytime we render the application.
        // everytime change something, this hook is called again. Passing an array with all dependencies
        // you want to depend on.
    useEffect(() => {
        // the second parameter to useEffect tells when you actaully want to call the function
            // an empty array means you want the function to run right when the application loads
            // if the array changes, then the component will re-update itself
            // Local storage can ONLY store strings, so JSON.stringify entries
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes])

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

    const recipeContextValue = {
        handleRecipeAdd: handleRecipeAdd,
        handleRecipeDelete: handleRecipeDelete
    }


    return (
        // were wrapping everything we are returning inside of context and providing that value for everything inside it
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} />
        </RecipeContext.Provider>
    )


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

