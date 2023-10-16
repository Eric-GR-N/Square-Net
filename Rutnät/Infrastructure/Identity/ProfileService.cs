using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

public class ProfileService : IProfileService
{
    protected readonly IUserClaimsPrincipalFactory<ApplicationUser> ClaimsFactory;
    protected readonly UserManager<ApplicationUser> UserManager;

    public ProfileService(UserManager<ApplicationUser> userManager, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory)
    {
        UserManager = userManager;
        ClaimsFactory = claimsFactory;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await UserManager.FindByIdAsync(sub);

        if (user == null)
        {
            // You might also consider logging this scenario as it's unusual.
            return;
        }

        var principal = await ClaimsFactory.CreateAsync(user);
        var claims = principal.Claims.ToList();
        context.IssuedClaims = claims;

        // Add roles to the issued claims
        var roles = await UserManager.GetRolesAsync(user);
        context.IssuedClaims.AddRange(roles.Select(role => new Claim(JwtClaimTypes.Role, role)));
    }


    public async Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();
        var user = await UserManager.FindByIdAsync(sub);
        context.IsActive = user != null;
    }
}
