import React from 'react'
import Recipe from "./Recipe";

export default function RecipeList({recipes}) {
    // ***DESTRUCTURING PRACTICE WITH ARRAYS***
    // const arr = [45, 67, 47, 600, 300, 234, 912, 854];
    // const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    // const [a,, c, ...restofarr] = arr;
    //
    // const sumAndMultiply = (a, b) => [a+b, a*b, a/b]
    //
    // const [sum, multiply, division = 'no division here (this is default if nothing passed in'] = sumAndMultiply(2, 3);
    // console.log(sum);
    // console.log(multiply);
    // console.log(division);
    // console.log(a)
    // console.log(c);
    // console.log(restofarr);
    // const newArray = [...arr, ...letters];
    // console.log(newArray);

    // ***DESTRUCTURING WITH OBJECTS***

    // const personOne = {
    //     name: 'George',
    //     age: 34,
    //     address: {
    //         city: 'Round Rock',
    //         state: 'TX'
    //     }
    // }

    // const personTwo = {
    //     age: 32,
    //     favoriteFood: 'Watermelon'
    //     // address: {
    //     //     city: 'Somewhere Else',
    //     //     state: 'Another one of them'
    //     // }
    // }
    // Lets say we want to get the name of the person and their age
    // const { name, age } = personTwo;
    // console.log(name, age) // this is possible because line 33 has the key names
    // const { name: firstName, age, favoriteFood = 'Rice'} = personTwo;  // these are basically setting keys to a value in case there is nothing in the object.
    // console.log(firstName, age)
    // const { name: firstName, ... rest} = personTwo // gets firstname of personTwo, and then the rest of the object
    // console.log(firstName, rest);
    // const { name: firstName, address: { city }} = personTwo; // getting a nested object, so in this case 'address'
    // console.log(firstName, city);
    // const personThree = {...personOne, ...personTwo} // personTwo overwrites things from personOne to make personThree. It combines BOTH objects
    // console.log(personThree)

    // function printUser({ name, age }) {
    //     console.log(`Name is: ${name}. Age is ${age}`)
    // }
    // printUser(personOne);


    return (
        <>
            <div>
                {recipes.map(recipe => {
                    return (
                        <Recipe key={recipe.id}
                                {...recipe}
                        />
                    )// needs a unique key so thats why we have the 'key=' part
                    // it uses keys to know what part of the array it needs to re-render so it ONLY re-render that element
                })}
            </div>
            <button>Add Recipe</button>
        </>
    )
}