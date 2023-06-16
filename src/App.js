import logo from './logo.svg';
import { useEffect, useState } from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);
  const [recipes, setRecipes ] = useState([])

  let submitRecipe = (event) => {
    event.preventDefault()
    setRecipes([...recipes, {
      recipe: event.target[0].value,
      instructions: event.target[1].value
    }])
    showRecipeForm(!recipeFormShown)
  };

  return (
    <div className="App">
      <h1 className="App-header">My Recipes</h1>
      {
        recipeFormShown ? 
          <>
            <form id="recipe-form" name='recipe-form' onSubmit={submitRecipe}>
              <label htmlFor="newRecipeName">Recipe name: </label>
              <input type="text" id="newRecipeName" />
              <label htmlFor="newRecipeInstructions">Instructions:</label>
              <textarea id="newRecipeInstructions" placeholder="write recipe instructions here..." />
              <input type="submit"/>
            </form>
          </>
          : 
            <>
              <button onClick={ () => showRecipeForm(!recipeFormShown) }>Add Recipe</button>
              {recipes.map(e => <><p>Recipe: {e.recipe}</p><p>Instructions: {e.instructions}</p></>)}
            </>

      }
    </div>
  );
}

export default App;