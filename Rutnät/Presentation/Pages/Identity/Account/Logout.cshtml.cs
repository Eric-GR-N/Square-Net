using System.Threading.Tasks;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class LogoutModel : PageModel
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IIdentityServerInteractionService _interaction;

    public LogoutModel(
        SignInManager<ApplicationUser> signInManager,
        IIdentityServerInteractionService interaction)
    {
        _signInManager = signInManager;
        _interaction = interaction;
    }

    public async Task<IActionResult> OnGetAsync(string logoutId)
    {
        // Sign out from the IdentityServer-hosted application.
        await _signInManager.SignOutAsync();

        // If the logout request contains a valid logout ID, handle post logout redirect.
        var logout = await _interaction.GetLogoutContextAsync(logoutId);
        if (!string.IsNullOrEmpty(logout?.PostLogoutRedirectUri))
        {
            return Redirect(logout.PostLogoutRedirectUri);
        }

        // Default redirect if something goes wrong or there is no post-logout redirect URI.
        return RedirectToPage("/Index");
    }
}
