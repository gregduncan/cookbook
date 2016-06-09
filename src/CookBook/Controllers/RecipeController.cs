﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Authorization;
using CookBook.Framework.Repos;
using CookBook.Models;
using CookBook.ViewModels;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class RecipeController : Controller
    {

        private readonly IAuthorizationService _authorizationService;
        private IRecipeRepository _recipeRepository;
        public RecipeController(IRecipeRepository recipeRepository, IAuthorizationService authorizationService)
        {
            _recipeRepository = recipeRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            List<Recipe> recipes = _recipeRepository
                     .GetAll()
                     .OrderBy(r => r.CreatedOn)
                     .ToList();

            return new ObjectResult(recipes);
        }
    }
}
