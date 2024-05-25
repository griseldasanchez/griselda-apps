import React from "react";
import { useState, useEffect } from "react";
import { db } from '../firebase.js';
import { getDocs, collection } from 'firebase/firestore';
import '../styles/Recipes.scss';
import AddRecipe from "./AddRecipe.js";

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
      console.log(filteredData)
    } catch (err) {
      console.log('error on Portfolio tile: ', err);
    }
  }

  useEffect(() => {
    getRecipes();
  }, [])

  return (
  <div id="recipes-app">

    <div id="search-recipes">
      <div className="recipes-searchbar">
        <input className="searchbar" placeholder='Search Recipe Name, Description or Ingredients' ></input>
        <button className="searchbar-button"> Search button </button>
      </div>
    </div>

    <AddRecipe getRecipes={getRecipes}/>
        
    <div className="recipes-grid-container">
      {recipeList.map((recipe) => (
      <div className="recipe-item" key={recipe.id}>
        <div className="recipe-image-box"> 
          <img src={recipe.image} className="recipe-thumbnail" alt="Recipe Thumbnail" />
        </div>
        <div className="recipe-content">
          <div className="recipe-name"><h3>{recipe.name}</h3></div>
          <div className="recipe-cuisine">{recipe.cuisine}</div>
        </div>
      </div>
      ))}
    </div>

  </div>
  )
}

export default Recipes;
