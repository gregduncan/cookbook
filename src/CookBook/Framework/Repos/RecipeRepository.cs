using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Repos
{
    public class RecipeRepository : EntityBaseRepository<Recipe>, IRecipeRepository
    {
        public RecipeRepository(CookBookContext context)
            : base(context)
        { }
    }
}
