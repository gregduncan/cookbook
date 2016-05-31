using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Repos
{
    public class IngredientRepository : EntityBaseRepository<Ingredient>, IIngredientRepository
    {
        public IngredientRepository(CookBookContext context)
            : base(context)
        { }
    }
}
