using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using CookBook.Framework.Repos;
using CookBook.Models;
using CookBook.ViewModels;
using CookBook.Framework;
using CookBook.Framework.Services;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class RecipeController : Controller
    {

        private readonly IAuthorizationService _authorizationService;
        private IRecipeRepository _recipeRepository;
        private IRecipeService _recipeService;
        public RecipeController(IRecipeRepository recipeRepository, IAuthorizationService authorizationService, IRecipeService recipeService)
        {
            _recipeRepository = recipeRepository;
            _authorizationService = authorizationService;
            _recipeService = recipeService;
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            List<Recipe> recipes = _recipeRepository
                     .GetAll()
                     .OrderBy(r => r.CreatedOn)
                     .ToList();

            return new ObjectResult(recipes);
        }

        //[Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            return new ObjectResult(await _recipeService.GetById(id));
        }

        //[Authorize]
        [HttpPost]
        public IActionResult Post([FromBody]RecipeViewModel model)
        {
            var ret = _recipeService.Insert(model);
            if(ret != 0)
            {
                return new ObjectResult(new GenericResult() { Succeeded = true, Message = ret.ToString()});
            }
            return new ObjectResult(new GenericResult() { Succeeded = false, Message = "Recipe insert failed." });
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                Recipe recipe = _recipeRepository.GetSingle(id);
                _recipeRepository.Delete(recipe);
                _recipeRepository.Commit();
                return new ObjectResult(new GenericResult() { Succeeded = true, Message = "Recipe delete succeeded." });
            }
            catch(Exception ex)
            {
                return new ObjectResult(new GenericResult() { Succeeded = false, Message = ex.Message });
            }
        }
    }
}

