using Microsoft.Data.Entity.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.DependencyInjection;
using System.IO;
using CookBook.Models;

namespace CookBook.Framework
{
    public static class DbInitializer
    {
        private static CookBookContext context;
        public static void Initialize(IServiceProvider serviceProvider)
        {
            context = (CookBookContext)serviceProvider.GetService<CookBookContext>();
            InitializeUser();
        }

        public static void InitializeUser()
        {
            if (!context.Users.Any())
            {
                context.Users.Add(new User()
                {
                    Email = "mail@gregduncan.co.uk",
                    Username = "greg",
                    HashedPassword = "9wsmLgYM5Gu4zA/BSpxK2GIBEWzqMPKs8wl2WDBzH/4=",
                    Salt = "GTtKxJA6xJuj3ifJtTXn9Q==",
                    IsLocked = false,
                    CreatedOn = DateTime.Now
                });

                context.SaveChanges();
            }

            if (!context.Recipes.Any())
            {
                context.Recipes.Add(new Recipe()
                {
                    CreatedOn = DateTime.Now,
                    Description = "",
                    Title = "Endurance Chilli"
                });

                context.SaveChanges();
            }
        }
    }
}
