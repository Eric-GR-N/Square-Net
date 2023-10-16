const authConfig = {
    authority: "https://localhost:7162", // URL of the IdentityServer
    client_id: "react_app", // This should match the ClientId defined in IdentityServer Config.cs
    redirect_uri: "http://localhost:3000/callback", // Where to redirect after successful login
    response_type: "code",
    scope: "openid profile api.read api.write", // The scopes we want access to
    post_logout_redirect_uri: "http://localhost:3000/", // Where to redirect after logout
    automaticSilentRenew: true, // Refresh the token in the background
    silent_redirect_uri: "http://localhost:3000/silent-refresh" // The URL for silent refreshes (if used)
  };
  
  export default authConfig;