import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase.js";
import { db } from '../firebase.js';

function AddRecipe (props) {
  console.log(props);

  const [name, setName] = useState("");
  const [cuisine, setCuisine ] = useState("");
  const [time, setTime ] = useState("");
  const [image, setImage ] = useState("");
  const [instructions, setInstructions ] = useState([]);
  const [ingredients, setIngredients ] = useState([]);

  const recipeCollectionRef = collection(db, "recipes");


  const onRecipeSubmit = async () => {
    console.log('Recipe Name is:', name );

    try {
      await addDoc(recipeCollectionRef, {
        // userId: auth?.currentUser?.uid,
        name: name,
        cuisine: cuisine,
        time: time,
        image: image,
        instructions: instructions,
        ingredients: ingredients,
      });
      // props.getRecipe();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div> 
      <div>
        Add Recipe
      </div>
      
      <p></p>
      
      <div id="create-recipe">
        <form>
          Name:         <input onChange={(e) => setName(e.target.value)}></input> <br />
          Cuisine:      <input onChange={(e) => setCuisine(e.target.value)}></input> <br />
          Time:         <input onChange={(e) => setTime(e.target.value)}></input> <br />
          Image Link:   <input onChange={(e) => setImage(e.target.value)}></input> <br />
          Instructions: <input onChange={(e) => setInstructions(e.target.value)}></input> <br />
          Ingredients:  <input onChange={(e) => setIngredients(e.target.value)}></input> <br />
        </form>
      </div>

      <p></p>

      <button onClick={onRecipeSubmit}> 
        Create Recipe
      </button>
    </div>
  )

}

export default AddRecipe;