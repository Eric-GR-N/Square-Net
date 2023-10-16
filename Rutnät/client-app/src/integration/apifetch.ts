import userManager from "../auth/authService";
import { HttpMethod } from "../enums";


export const apiFetch = async<T>(
  url: string,
  payload?: any,
  httpMethod: HttpMethod = HttpMethod.GET,
  stringifyBody: boolean = true,
  contentType?: string,
  requireAuth: boolean = true,
): Promise<T> => {

  let reqInit: RequestInit = {};
  
  var user = await userManager.getUser();

  if(requireAuth && !user) {
    throw new Error('User is not logged in');
  }

  if(contentType) {
    reqInit = {
      method: httpMethod,
      headers: {
        'Content-Type': contentType,
        'Authorization': `Bearer ${user?.access_token}`,
      }
    };
  }else{
    reqInit = {
      method: httpMethod,
      headers: {
        'Authorization': `Bearer ${user?.access_token}`,
      }
    };
  }

  if ([HttpMethod.POST, HttpMethod.PUT].includes(httpMethod) && payload) {
    reqInit.body = stringifyBody ? JSON.stringify(payload) : payload;
  }

  try {
    const result = await fetch(url, reqInit);
    
    if (!result.ok) {
      const errorMessage = await result.text();
      throw new Error(`API call failed with status ${result.status}: ${errorMessage}`);
    }
    
    if (typeof result.json === 'function') {
      return await result.json() as T;
    } else {
      throw new Error('Response is not a valid JSON');
    }

  } catch (err) {
    throw err;
  }
};
