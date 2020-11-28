/*
 - related to HTML inner project
*/
class UI {
  // displayes the cocktails without ingredient
  displayDrinks (drinks) {
    // show the Results
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';
    // insert the results
    const resultsDiv = document.querySelector('#results');
    // loop through drinks and display results
    drinks.forEach(drink => {
      resultsDiv.innerHTML += `
        <div class ="col-md-4">
          <div class="card my-3">
            <img class="card-img-top" src="http://${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <div class="card-body">
              <h2 class="card-tittle text-center">${drink.strDrink}</h2>
              <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
            </div>
          </div>
        </div>
      `;
    })
  }
  // displays drinks with displayDrinksWithIngredients in index.html > <div "results-wrapper">
  displayDrinksWithIngredients (drinks) {
    // show the Results
    const resultsWrapper = document.querySelector('.results-wrapper');
    resultsWrapper.style.display = 'block';

    // insert the results
    const resultsDiv = document.querySelector('#results');
    drinks.forEach(drink => {
      resultsDiv.innerHTML +=
      `
      <div class="col-md-6">
          <div class="card my-3">
            <img class="card-img-top" src="http://${drink.strDrinkThumb}" alt="${drink.strDrink}">

            <div class="card-body">
              <h2 class="card-tittle text-center">${drink.strDrink}</h2>
              <p class="card-text front-weight-bold">Instructions: </p>
              <p class="card-text">
                ${drink.strInstructions}
              </p>
              <p class="card-text">
                <ul class="list-group">
                  <li class="list-group-item alert alert-danger">ingredients</li>
                  ${this.displayIngredients(drink)}
                </ul>
              </p>
              <p class="card-text front-weight-bold">Extra Information: </p>
              <p class="card-text">
                <span class="badge badge-pill badge-success">
                  ${drink.strAlcoholic}
                </span>
                <span class="badge badge-pill badge-success">
                  Category:${drink.strCategory}
                </span>
              </p>
            </div>
          </div>
      </div>
      `;
    })
  }

  // display ingredients and measurements
  displayIngredients (drink) {
    //console.log(drink);
    let ingredients = [];
    for (let i = 1; i < 16; i++) {
      const ingredientMeasure = {};
        if (drink[`strIngredient${i}`] !== '') {
          ingredientMeasure.ingredient = drink[`strIngredient${i}`];
          ingredientMeasure.measure = drink[`strMeasure${i}`];
          ingredients.push(ingredientMeasure);
        }
      }
      //console.log(ingredients);

      // build ingredient templete here
      let ingredientTemplate = '';
      ingredients.forEach(ingredient => {
        ingredientTemplate +=
        `
          <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
        `;
      });
      return ingredientTemplate;
    }

    // display a single recipe
    displaySingleRecipe (recipe) {
      const modalTitle = document.querySelector('.modal-title');
      const modalDescription = document.querySelector('.modal-body .description-text');

      // set the values
      modalTitle.innerHTML = recipe.strDrink;
      modalDescription.innerHTML = recipe.strInstructions;
    }
    // displays a custom message
    printMessage (message, className) {
      const div = document.createElement('div');
      // add the html

      div.innerHTML = `
        <div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${message}
        </div>
      `;

      // insert div before class jumbotron
      const reference = document.querySelector('.jumbotron h1');
      const parentNode = reference.parentElement;
      parentNode.insertBefore(div, reference);

      // remove error 3 secs
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 2000);
    }
    clearResults () {
      const resultsDiv = document.querySelector('#results');
      resultsDiv.innerHTML = '';
    }
  }
