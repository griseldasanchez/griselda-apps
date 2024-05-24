import React from "react";
import { useState, useEffect } from "react";


import { db } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';

function Recipes() {

  const [recipeList, setRecipeList] = useState([]);
  const recipeCollectionRef = collection(db, "recipes");

  const getRecipes = async () => {
    try {
      const data = await getDocs(recipeCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setRecipeList(filteredData);
    } catch (err) {
      console.log('error on Portfolio tile: ', err);
    }
  }

  useEffect(() => {
    getRecipes();
  }, [])

  return (
    <div>
      {recipeList.map((recipe) => (
        <div>
          {recipe.name} <br />
          {recipe.cuisine} <br />
          <ol>
            {recipe.instructions.map((instruction) => (
              <li>{instruction}</li>
            ))}
          </ol>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <img src={recipe.image} />
        </div>
      ))}

    </div>
  )

}

export default Recipes;
