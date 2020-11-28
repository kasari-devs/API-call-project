/*
- contains the different methods that we are going to querry the REST API
- return results as JSON
*/
class CocktailAPI {
  // get recipe by name, using => https://www.thecocktaildb.com/api.php
  async getDrinkByName (name) {
    // search by Name --> `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    // return a json apiResponse
    const cocktails = await apiResponse.json();
    //return results as object
    return {
      cocktails
    }
  }

  // get recepies by ingredientTemplate
  async getDrinkByIngredient (ingredient) {
    // search by ingredient
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    // return a json apiResponse
    const cocktails = await apiResponse.json();
    //return results as object
    return {
      cocktails
    }
  }
  // get single Recipe
  async getSingleRecipe (id) {
    // search by Name
    const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    // return a json apiResponse
    const recipe = await apiResponse.json();
    //return results as object
    return {
      recipe
    }
  }
}
