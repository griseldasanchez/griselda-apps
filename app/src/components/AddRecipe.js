import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase.js";
import { db } from '../firebase.js';

function AddRecipe( {getRecipes} ) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const recipeCollectionRef = collection(db, "recipes");

  const onRecipeSubmit = async () => {
    console.log('Recipe Name is:', name );

    try {
      const imageUrl = image === '' ? 'https://static.vecteezy.com/system/resources/previews/002/621/029/non_2x/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg' : image;
      await addDoc(recipeCollectionRef, {
        // userId: auth?.currentUser?.uid,
        name: name,
        cuisine: cuisine,
        time: time,
        image: imageUrl,
        instructions: instructions,
        ingredients: ingredients,
      });
      getRecipes();
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
          Name: <input onChange={(e) => setName(e.target.value)}></input> <br />
          Cuisine: <input onChange={(e) => setCuisine(e.target.value)}></input> <br />
          Time: <input onChange={(e) => setTime(e.target.value)}></input> <br />
          Image Link: <input onChange={(e) => setImage(e.target.value)}></input> <br />
          Instructions(seperates steps with a new line): 
          <textarea onChange={(e) => setInstructions(e.target.value.split('\n'))}></textarea> <br />
          Ingredients (seperate ingredients with a new line): 
          <textarea onChange={(e) => setIngredients(e.target.value.split('\n'))}></textarea> <br />
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
