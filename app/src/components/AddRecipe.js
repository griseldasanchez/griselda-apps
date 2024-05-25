import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase.js";
import { db } from '../firebase.js';

function AddRecipe({ getRecipes }) {
  
  // Recipe fields on form
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  // Firebase collection being referenced
  const recipeCollectionRef = collection(db, "recipes");

  const onRecipeSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Default image link in case one is not provided
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

      // Call the function to fetch updated recipes
      getRecipes();
      
      // Clear the form fields by resetting state values
      setName("");
      setCuisine("");
      setTime("");
      setImage("");
      setInstructions([]);
      setIngredients([]);

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div>Add Recipe</div>
      
      <div id="create-recipe">
        <form onSubmit={onRecipeSubmit}>
          Name: 
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          /> <br />
          Cuisine: 
          <input 
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)} 
          /> <br />
          Time: 
          <input 
            value={time}
            onChange={(e) => setTime(e.target.value)} 
          /> <br />
          Image Link: 
          <input 
            value={image}
            onChange={(e) => setImage(e.target.value)} 
          /> <br />
          Instructions (separate steps with a new line): 
          <textarea 
            value={instructions.join('\n')}
            onChange={(e) => setInstructions(e.target.value.split('\n'))} 
          /> <br />
          Ingredients (separate ingredients with a new line): 
          <textarea 
            value={ingredients.join('\n')}
            onChange={(e) => setIngredients(e.target.value.split('\n'))} 
          /> <br />
          <button type="submit">Create Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
