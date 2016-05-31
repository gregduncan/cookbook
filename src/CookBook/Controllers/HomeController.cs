using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CookBook.Framework.Repos;

namespace CookBook.Controllers
{
    public class HomeController : Controller
    {
        IUserRepository _userRepo;

        public HomeController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public IActionResult Index()
        {
            var user = _userRepo.GetSingle(1);
            return View(user);
        }
    }
}
