import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList'
import '../css/app.css'
import {v4 as uuidv4} from 'uuid'
import RecipeEdit from './RecipeEdit'

// *** anytime you build something in REACT on existing infrastructure, the application reacts to the change***

//***Components***: -left(list of recipes) and right side of screen (edit section of current recipe selected)
//                 -Particular recipes inside the recipe list
//                 -ingredients section

//***TIPS***
    // 1. Try to make sure all state, effect, props, and related logic in one section at the top of a component
    // 2. Put all functions in a group right before the component's return statement
    // 3. Break out into components as much as possible no matter how small. As many components as possible. That way
        // it makes it easier to debug and make it easier to use a component multiple times when needed
        // BUT when is it TOO SMALL? If you will never ever use it again or its too much work to break it out and pass it things
    // 4. Have consistent naming with function names, like 'handle' which is for an event listener
    // 5. Break things into multiple lines so it makes it easier to read instead of one massive line of code
    // 6. When to use context vs props to get info:
        // props: better when only passing info down one level, so like from parent to child
        // context: when passing from a parent multiple levels of children or want to pass it multiple sections in your app
            // that are not directly linked to that parent
        // context use cont.: only use it really inside the main application components so like in App,
            // "export const RecipeContext = React.createContext()" is in App.js
            // or like a sidebar with a ton of info, it would be good to use context for the sidebar to share info to children
    // 7. Do not change variables that come in through props or state. Only use the 'setState' calls. Instead, just
        // create a copy of the thing you want then call the set function
    // 8. Just store IDs inside state instead of an actual object so that you're only referencing the same object and
        // you dont have to worry about them being different.


// here we have context that just contains the "handleRecipeAdd" and "handleRecipeDelete" functions
export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

function App() {
    // store state for editing a recipe and a function that sets the recipe ID. No default value
    const [selectedRecipeId, setSelectedRecipeId] = useState();

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

    // go through all recipes and find the recipe with the given ID of selected recipe ID and that is our current recipe.
    // if there has no selected recipe, then it would be undefined. Used to edit recipe
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)

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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
    }, [recipes])

    // this function creates a new recipe, then "setRecipes() is called
        // this is also the default recipe that will pop up on the right for you to add the new recipe
    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: '',
            servings: 1,
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuidv4(),
                    name: '',
                    amount: ''
                }
            ]
        }
        // this adds a default recipe to be added in the right column and you can see the changes being made in the left
        setSelectedRecipeId(newRecipe.id)
        // vv This uses spread operator that expects array of recipes, take current recipes array, spread over it
        // which means we are getting all the recipes we have now, then add a newRecipe then create a new array
        // with all the recipes
        // Here we are calling "newRecipe", then passing what we want our state to be
        setRecipes([...recipes, newRecipe])
    }

    // we are getting the id of the recipe we want to change and the new recipe that we are going to replace the old recipe with
    function handleRecipeChange(id, recipe) {
        // this is setting the variable to a copy of the array with all recipes. Creating a "duplicate" of the original
        const newRecipes = [...recipes];
        // want to find the index of the wanted recipe by comparing it to the given id
        const index = newRecipes.findIndex(r => r.id === id);
        // setting the the element @ index 'index' to the value of recipe. So were just swapping out a recipe in our array
        newRecipes[index] = recipe;
        setRecipes(newRecipes)
    }

    function handleRecipeDelete(id) {
        // this IF statement is used to clear out a recipe id when we dont have a recipe with that id anymore
            // so, if selectedRecipeId does not exist and equals the ID we passed in were deleting the current recipe we
            // deleted
        if (selectedRecipeId !== null && selectedRecipeId === id) {
            setSelectedRecipeId(undefined);
        }
        setRecipes(recipes.filter(recipe => recipe.id !== id)) // so give me every recipe
    }

    const recipeContextValue = {
        handleRecipeAdd: handleRecipeAdd,
        handleRecipeDelete: handleRecipeDelete,
        handleRecipeSelect: handleRecipeSelect,
        handleRecipeChange: handleRecipeChange
    }

    function handleRecipeSelect(id) {
        setSelectedRecipeId(id);
    }


    return (
        // were wrapping everything we are returning inside of context and providing that value for everything inside it
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} />
            {/*if selectedRecipe is true, then render "recipeEdit", so if it is undefined (false), it wont render it. Kind of like ternarty*/}
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe}/>}
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
        instructions: '1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork',
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

// this means that the App function is the actual default function that will be exported, so the App component in other words
export default App;

