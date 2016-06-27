using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class LogoutController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            await HttpContext.Authentication.SignOutAsync("Cookies");
            return Ok();
        }
    }
}
