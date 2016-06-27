using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CookBook.ViewModels;
using CookBook.Framework.Repos;
using CookBook.Framework.Services;
using CookBook.Models;
using Microsoft.AspNet.Authentication.Cookies;
using System.Security.Claims;

namespace CookBook.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMembershipService _membershipService;

        public LoginController(IUserRepository userRepository, 
            IMembershipService membershipService)
        {
            _userRepository = userRepository;
            _membershipService = membershipService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginViewModel model)
        {
            GenericResult result = null;

            if (ModelState.IsValid)
            {
                if (_membershipService.ValidateUser(model.Email, model.Password))
                {
                    List<Claim> claims = new List<Claim>();
                    Claim claim = new Claim(ClaimTypes.Role, "User", ClaimValueTypes.String, model.Email);
                    claims.Add(claim);

                    await HttpContext.Authentication.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)),
                        new Microsoft.AspNet.Http.Authentication.AuthenticationProperties { IsPersistent = true });

                    result = new GenericResult() { Succeeded = true, Message = "Authentication succeeded." };
                }
                else
                {
                    result = new GenericResult() { Succeeded = false, Message = "Authentication failed." };
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
