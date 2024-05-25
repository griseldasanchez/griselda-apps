import React, { useState } from 'react';
import Modal from 'react-modal';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import '../styles/AddRecipe.scss';

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function AddRecipe({ getRecipes }) {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility

  // Recipe fields on form
  const [name, setName] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState('');

  // Firebase collection being referenced
  const recipeCollectionRef = collection(db, 'recipes');

  const onRecipeSubmit = async (e) => {
    e.preventDefault();

    try {
      // Default image link in case one is not provided
      const imageUrl = image === '' ? 'https://static.vecteezy.com/system/resources/previews/002/621/029/non_2x/chef-recipe-book-kitchen-utensil-line-style-icon-free-vector.jpg' : image;

      await addDoc(recipeCollectionRef, {
        name: name,
        cuisine: cuisine,
        time: time,
        image: imageUrl,
        instructions: instructions.split('\n'),
        ingredients: ingredients.split('\n'),
      });

      // Call the function to fetch updated recipes
      getRecipes();

      // Clear the form fields by resetting state values
      setName('');
      setCuisine('');
      setTime('');
      setImage('');
      setInstructions('');
      setIngredients('');

      // Close the modal after submitting
      setModalIsOpen(false);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>Add Recipe</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <div className="add-recipe-form">
          <button className="modal-close-button" onClick={() => setModalIsOpen(false)}>X</button>
          <div className="add-recipe-title">Add Recipe</div>
          <form onSubmit={onRecipeSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> <br />
            <label htmlFor="cuisine">Cuisine:</label>
            <input
              type="text"
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            /> <br />
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            /> <br />
            <label htmlFor="image">Image Link:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            /> <br />
            <label htmlFor="instructions">Instructions (separate steps with a new line):</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            /> <br />
            <label htmlFor="ingredients">Ingredients (separate ingredients with a new line):</label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            /> <br />
            <button type="submit">Create Recipe</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default AddRecipe;
