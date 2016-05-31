using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CookBook.Models;

namespace CookBook.Framework
{
    public class CookBookContext : DbContext
    {
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<User> Users { get; set; }

        public CookBookContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Recipe
            modelBuilder.Entity<Recipe>().Property(r => r.Title).HasMaxLength(100);
            modelBuilder.Entity<Recipe>().HasMany(r => r.Steps).WithOne(r => r.Recipe);
            modelBuilder.Entity<Recipe>().HasMany(r => r.Ingredients).WithOne(r => r.Recipe);

            // Steps
            modelBuilder.Entity<Step>().Property(s => s.Title).HasMaxLength(225);
            modelBuilder.Entity<Step>().Property(s => s.Description).HasMaxLength(1000);
            modelBuilder.Entity<Step>().Property(s => s.RecipeId).IsRequired();

            // Ingredients
            modelBuilder.Entity<Ingredient>().Property(i => i.Title).HasMaxLength(225);
            modelBuilder.Entity<Ingredient>().Property(i => i.RecipeId).IsRequired();

            // User
            modelBuilder.Entity<User>().Property(u => u.Username).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.HashedPassword).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(u => u.Salt).IsRequired().HasMaxLength(200);
        }
    }
}
