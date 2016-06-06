using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Repos
{
    public class UserRepository : EntityBaseRepository<User>, IUserRepository
    {
        public UserRepository(CookBookContext context)
            : base(context)
        { }

        public User GetSingleByEmail(string email)
        {
            return this.GetSingle(x => x.Email == email);
        }
    }
}
