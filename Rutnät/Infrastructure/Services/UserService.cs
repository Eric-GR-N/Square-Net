using Domain.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Infrastructure.Services
{
    public interface IUserService
    {
        Task CreateUserRoleAsync(string roleName);
        Task CreateInitialUserRolesAsync();
    }
    public class UserService : IUserService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext dbContext)
        {
            _roleManager = roleManager;
        }

        public async Task CreateUserRoleAsync(string roleName)
        {
            var role = new IdentityRole();
            role.Name = roleName;

            var roleResult = await _roleManager.CreateAsync(role);

            if (!roleResult.Succeeded)
            {
                var errorMessages = roleResult.Errors.Select(e => e.Description);
                throw new Exception($"Could not create role. Errors: {string.Join(", ", errorMessages)}");
            }
        }

        public async Task CreateInitialUserRolesAsync()
        {
            if (!(await _roleManager.RoleExistsAsync(UserRoles.User)))
            {
                await CreateUserRoleAsync(UserRoles.User);
            }

            if (!(await _roleManager.RoleExistsAsync(UserRoles.Admin)))
            {
                await CreateUserRoleAsync(UserRoles.Admin);
            }
        }
    }
}
