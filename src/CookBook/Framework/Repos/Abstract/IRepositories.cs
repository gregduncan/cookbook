using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Repos
{
    public interface IRecipeRepository : IEntityBaseRepository<Recipe> { }
    public interface IIngredientRepository : IEntityBaseRepository<Ingredient> { }
    public interface IStepRepository : IEntityBaseRepository<Step> { }
    public interface IUserRepository : IEntityBaseRepository<User> { }
}
