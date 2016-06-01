using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CookBook.ViewModels;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        [HttpPost]
        public IActionResult Post([FromBody]RegistrationViewModel model)
        {
            if(ModelState.IsValid)
            {
                return Ok();
            }
            return HttpBadRequest();
        }
    }
}
