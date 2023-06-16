import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

// test('As a Chef, I want to store my recipes so that I can keep track of them.', () => {

//   // 1. render the landing page
//   render(<App />);

//   // 2. wait for the page to load
//   // Implied in this case, nothing to wait for

//   // 3. Then I should see a heading that reads "My Recipes"
//   let recipeHeader = screen.getByText('My Recipes');
//   expect(recipeHeader).toBeInTheDocument();

//   // 4. And I should see text beneath the heading that reads "There are no recipes to list" 
//   let recipeList = screen.getByText('There are no recipes to list.');
//   expect(recipeList).toBeInTheDocument();

//   // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
//   expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
// });

test("contains an add recipe button", () => {
  // 1. render the landing page
  render(<App />);

  // 2. wait for the page to load (implied, no async operations)

  // 3. Then I should see a button that says "Add Recipe" beneath the "My Recipes" heading.
  let recipeHeader = screen.getByText('My Recipes');
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  
  expect(button).toBeInTheDocument();
  // being particular, make sure the heading is above the button (at least in html)
  expect(recipeHeader.compareDocumentPosition(button)).toBe(4);
});

test("contains an add recipe button that when clicked opens a form", async () => {
  // render the landing page
  render(<App />);

  // wait for the page to load (implied, no async operations)

  // click Add Recipe button
  let button = screen.getByRole('button', {name: 'Add Recipe'});
  userEvent.click(button);

  // Wait for the form to appear on the screen (override the default of 1000ms as an example)
  let form = await screen.findByRole('form', undefined, {timeout:3000});

  // Verify the form appears
  expect(form).toBeInTheDocument();

  // Then I should see a form with fields: "Recipe Name" and "Recipe Instructions"
  expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();
  
  // And the "Add Recipe" button should no longer be on the screen.
  // Use queryBy instead of getBy because getBy throws an error when it doesn't have exactly 1 match
  button = screen.queryByRole('button', {name: 'Add Recipe'});
  expect(button).toBeNull();
});

test('adds a recipe when the button is clicked ', async () => {

  render(<App />)
  let button = screen.getByRole('button', {name: 'Add Recipe'})
  userEvent.click(button);
  // Wait for the form to appear on the screen (override the default of 1000ms as an example)
  let form = await screen.findByRole('form', undefined, {timeout:3000});
  // Verify the form appears
  expect(form).toBeInTheDocument();

  // get the textbox
  let recipeNameBox = screen.getByRole('textbox', {name: /Recipe name/i});
  // add the string 'Tofu Scramble Tacos' into the textbox
  userEvent.type(recipeNameBox, 'Tofu Scramble Tacos');

  let instructions = screen.getByRole('textbox', {name: /Instructions/i})
  userEvent.type(instructions, "Cook it. Idk I've never had tofu.")



  // -----------------------------------------------------
  // DOES NOT CLICK THE BUTTON. UNSURE OF WHY
  // I have tried changing the <input type='submit'/> to a <button>. Still doesnt work
  let submit = screen.getByRole('button')
  userEvent.click(submit)

  let recipe = await screen.findAllByText(/Recipe:/i)
  // -----------------------------------------------------

})