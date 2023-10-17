import { UserManager, WebStorageStateStore, Log  } from "oidc-client";
import authConfig from "./authConfig";

//Log.logger = console;

const userManager = new UserManager({
  ...authConfig,
  userStore: new WebStorageStateStore({ store: window.localStorage })
});

export async function loginUser() {
  return await userManager.signinRedirect();
}

export async function logoutUser() {
  return await userManager.signoutRedirect();
}

export async function getUser() {
  return await userManager.getUser();
}

export async function handleRedirectCallback() {
  return await userManager.signinRedirectCallback();
}

export default userManager;