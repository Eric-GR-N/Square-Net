using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services
{
    public static class DbInitializer
    {
        public static async Task Inititialize(ApplicationDbContext dbContext, IUserService userService)
        {
            dbContext.Database.Migrate();
            await userService.CreateInitialUserRolesAsync();
        }
    }
}
