using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Repos
{
    public class StepRepository : EntityBaseRepository<Step>, IStepRepository
    {
        public StepRepository(CookBookContext context)
            : base(context)
        { }
    }
}
