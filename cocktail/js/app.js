/*
 - instantiate all the classes
 - event listners
 - global variables
 - DOM content loaded event listner
*/

// instantiate the classes

const ui = new UI ();
const cocktailapi = new CocktailAPI ();

// add event eventListeners

function eventListeners () {
  // event listner for "search-form" in index.html
  const searchForm = document.querySelector('#search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', getCocktails);
  }
  const resultsDiv = document.querySelector('#results');
  if (resultsDiv) {
    resultsDiv.addEventListener('click', resultsDelegation);
  }

}
eventListeners();

// create event listners

function getCocktails (e) {
  e.preventDefault();
  // get the input value index.html > #search-form > #search
  const searchTerm = document.querySelector('#search').value;
  if (searchTerm == '') {
    // call user interface, print message from UI.js, pass 'danger' class to the method
    ui.printMessage('Please add something to the form', 'danger');
  } else {
    // server response from promise
    let serverResponse;
    // type of search (ingredient, cocktail, or name)
    const type = document.querySelector('#type').value;

    // evaluate the type of method and execute a querry

    switch (type) {
      case 'name':
        serverResponse = cocktailapi.getDrinkByName(searchTerm);
        break;
      case 'ingredient':
        serverResponse = cocktailapi.getDrinkByIngredient(searchTerm);
        break;
    }

    ui.clearResults();
    // query by the name of the drink
      serverResponse.then(cocktails => {
          if (cocktails.cocktails.drinks == null) {
            ui.printMessage('No results, try a different term', 'danger');
          } else {
            if (type == 'name') {
              // display with ingredients
              ui.displayDrinksWithIngredients (cocktails.cocktails.drinks);
            } else {
              // display without ingredients
              ui.displayDrinks(cocktails.cocktails.drinks);
            }

          }
      })
  }
}
// delegation for #results area
function resultsDelegation (e) {
  e.preventDefault();
  if (e.target.classList.contains('get-recipe')) {
    cocktailapi.getSingleRecipe(e.target.dataset.id)
        .then (recipe => {
          // display single recipe into modal
          ui.displaySingleRecipe(recipe.recipe.drinks[0])
        })
  }

}
