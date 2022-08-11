import React from 'react'
import IngredientList from "./IngredientList";

// Component for each individual recipe
// export default function Recipe( { name, cookTime, servings, instructions } ) {

export default function Recipe(props) {
    // This is the same as on line 5, but were not bringing in a HUGE number of props on one line making it easier to read
    const {
        name,
        cookTime,
        servings,
        instructions,
        ingredients
    } = props

    return (
        <div>
            <div>
                <h3>{name}</h3>
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div>
                <span>Cook Time: </span>
                <span>{cookTime}</span>
            </div>
            <div>
                <span>Servings: </span>
                <span>{servings}</span>
            </div>
            <div>
                <span>Instructions:</span>
                <div>
                    {instructions}
                </div>
            </div>
            <div>
                <span>Ingredients:</span>
                <div>
                    <IngredientList ingredients={ingredients} />
                </div>
            </div>
        </div>
    )
}