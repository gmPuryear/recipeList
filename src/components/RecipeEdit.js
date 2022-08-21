import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { RecipeContext} from './App'
import {v4 as uuidv4} from 'uuid'

export default function RecipeEdit({recipe}) {
    // getting these from our context
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

    function handleChange(changes) {
        // here we are taking everything from recipe and everything from changes and OVERWRITING everything in changes
            // we are actually creating a brand new object, not editing the existing one
            // NEVER OVERRIDE PROPS OR STATE UNLESS HAVE GOOD REASON
        handleRecipeChange(recipe.id, { ...recipe, ...changes})
    }

    function handleIngredientChange(id, ingredient) {
        // creating a duplicate of the current array
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(ingredient => ingredient.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        // This -> [...recipe.ingredients] is just a copy of the array of our ingredients, and we are adding
            // newIngredient to the end of that array
            // SO now we have an object that has all the ingredient
        handleChange({ ingredients: [...recipe.ingredients, newIngredient]})
    }

    function handleIngredientDelete(id) {
        handleChange({
            // filtering the list so we are only getting the ingredients that do NOT have the id
            ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== id) })
    }

    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button
                    className="btn recipe-edit__remove-button"
                    // this makes it so that deselects the current recipe being edited because the selectedrecipe id is
                        // just being set to undefined
                    onClick={() => handleRecipeSelect(undefined)}
                >
                    &times;
                </button>
            </div>
            <div className="recipe-edit__details-grid">
                <label
                    htmlFor="name"
                    className="recipe-edit__label">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={recipe.name}
                    onInput={e => handleChange({ name: e.target.value })}
                    className="recipe-edit__input"/>
                <label
                    htmlFor="cookTime"
                    className="recipe-edit__label">
                    Cook Time
                </label>
                <input
                    type="text"
                    name="cookTime"
                    id="cookTime"
                    value={recipe.cookTime}
                    onInput={e => handleChange({ cookTime: e.target.value })}
                    className="recipe-edit__input"/>
                <label
                    htmlFor="servings"
                    className="recipe-edit__label">
                    Servings
                </label>
                <input
                    type="number"
                    min="1"
                    name="servings"
                    id="servings"
                    value={recipe.servings}
                    // e.target.value is ALWAYS a string, not a number!!!
                        // without the:  || '' NaN would be displayed. So we put an empty string as fallback value
                    onInput={e => handleChange({ servings: parseInt(e.target.value) || '' })}
                    className="recipe-edit__input"/>
                <label
                    htmlFor="instructions"
                    className="recipe-edit__label">
                    Instructions
                </label>
                <textarea
                    name="instructions"
                    id="instructions"
                    onInput={e => handleChange({ instructions: e.target.value })}
                    value={recipe.instructions}
                    className="recipe-edit__input"/>
            </div>
            <br/>
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                        ingredient={ingredient}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-btn-container">
                <button
                    className="btn btn--primary"
                    onClick={() => handleIngredientAdd()}
                >
                    Add Ingredient
                </button>
            </div>
        </div>
    )
}