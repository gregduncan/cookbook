using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CookBook.ViewModels;
using CookBook.Framework.Repos;
using CookBook.Framework.Services;
using CookBook.Models;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class RegisterController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMembershipService _membershipService;

        public RegisterController(IUserRepository userRepository, 
            IMembershipService membershipService)
        {
            _userRepository = userRepository;
            _membershipService = membershipService;
        }

        [HttpPost]
        public IActionResult Post([FromBody]RegistrationViewModel model)
        {
            GenericResult result = null;

            if (ModelState.IsValid)
            {
                if(_userRepository.GetSingleByEmail(model.Email) == null)
                {
                    User user = _membershipService.CreateUser(model.Username, model.Email, model.Password);

                    if(user != null)
                    {
                        result = new GenericResult() { Succeeded = true, Message = "Registration succeeded." };
                    }
                    else
                    {  
                        result = new GenericResult() { Succeeded = false, Message = "Registration failed please try again." };
                    }
                }
                else
                {
                    result = new GenericResult() { Succeeded = false, Message = "User already exists." };
                }
            }
            else
            {
                result = new GenericResult() { Succeeded = false, Message = "Invalid fields." };
            }

            return new ObjectResult(result);
        }
    }
}
