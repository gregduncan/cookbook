using CookBook.Models;
using CookBook.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Services
{
    public interface IEncryptionService
    {
        /// <summary>
        /// Creates a random salt
        /// </summary>
        /// <returns></returns>
        string CreateSalt();
        /// <summary>
        /// Generates a Hashed password
        /// </summary>
        /// <param name="password"></param>
        /// <param name="salt"></param>
        /// <returns></returns>
        string EncryptPassword(string password, string salt);
    }

    public interface IMembershipService
    {
        bool ValidateUser(string email, string password);
        User CreateUser(string username, string email, string password);
        User GetUser(int userId);
    }

    public interface IRecipeService
    {
        int Insert(RecipeViewModel model);
        Task<RecipeViewModel> GetById(int id);
    }

}
