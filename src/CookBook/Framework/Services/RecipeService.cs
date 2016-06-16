using CookBook.Framework.Repos;
using CookBook.Models;
using CookBook.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Services
{
    public class RecipeService : IRecipeService
    {
        #region Variables
        private readonly IRecipeRepository _recipeRepository;
        #endregion

        public RecipeService(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }

        /// <summary>
        /// Returns Recipe specified by id including Steps and Ingredients.
        /// </summary>
        public async Task<RecipeViewModel> GetById(int id)
        {
            Recipe recipe = await _recipeRepository.GetSingleAsync(r => r.Id == id, r => r.Ingredients, r => r.Steps);
            var model = new RecipeViewModel();
            model.Title = recipe.Title;
            model.Id = recipe.Id;
            model.Description = recipe.Description;
            model.Steps = new List<StepViewModel>();
            model.Ingredients = new List<IngredientViewModel>();
            recipe.Steps.ToList().ForEach(s => model.Steps.Add(new StepViewModel() { Id = s.Id, Title = s.Title }));
            recipe.Ingredients.ToList().ForEach(i => model.Ingredients.Add(new IngredientViewModel() { Id = i.Id, Title = i.Title }));
            return model;
        }

        /// <summary>
        /// Returns Id of recipe upons successful insert.
        /// </summary>
        public int Insert(RecipeViewModel model)
        {
            // Buld steps array.
            var steps = new List<Step>();
            model.Steps.ForEach(s => steps.Add(new Step() { Title = s.Title, CreatedOn = DateTime.Now }));

            // Build ingredients array.
            var ingredients = new List<Ingredient>();
            model.Ingredients.ForEach(i => ingredients.Add(new Ingredient() { Title = i.Title, CreatedOn = DateTime.Now }));

            // Build recipe obj.
            var recipe = new Recipe() { Title = model.Title, Description = model.Description, CreatedOn = DateTime.Now, Steps = steps, Ingredients = ingredients };

            // Add to db.
            _recipeRepository.Add(recipe);

            // Commit.
            _recipeRepository.Commit();

            return recipe.Id;
        }      
    }
}
