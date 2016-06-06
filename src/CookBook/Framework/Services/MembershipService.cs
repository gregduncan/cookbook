using CookBook.Framework.Repos;
using CookBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookBook.Framework.Services
{
    public class MembershipService : IMembershipService
    {
        #region Variables
        private readonly IUserRepository _userRepository;
        private readonly IEncryptionService _encryptionService;
        #endregion

        public MembershipService(IUserRepository userRepository, IEncryptionService encryptionService)
        {
            _userRepository = userRepository;
            _encryptionService = encryptionService;
        }

        public bool ValidateUser(string email, string password)
        {
            var user = _userRepository.GetSingleByEmail(email);

            return user != null && isUserValid(user, password);
        }

        /// <summary>
        /// Returns a collection of App Users specified by AspNetUser.Id.
        /// </summary>
        public User CreateUser(string username, string email, string password)
        {
            // Create salt for password
            var passwordSalt = _encryptionService.CreateSalt();

            var user = new User()
            {
                Username = username,
                Salt = passwordSalt,
                Email = email,
                IsLocked = false,
                HashedPassword = _encryptionService.EncryptPassword(password, passwordSalt),
                CreatedOn = DateTime.Now
            };

            _userRepository.Add(user);

            _userRepository.Commit();

            return user;
        }

        public User GetUser(int userId)
        {
            return _userRepository.GetSingle(userId);
        }

        #region Helper methods
        private bool isPasswordValid(User user, string password)
        {
            return string.Equals(_encryptionService.EncryptPassword(password, user.Salt), user.HashedPassword);
        }

        private bool isUserValid(User user, string password)
        {
            if (isPasswordValid(user, password))
            {
                return !user.IsLocked;
            }

            return false;
        }
        #endregion
    }
}
