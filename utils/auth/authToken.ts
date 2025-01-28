import { APIRequest, expect } from '@playwright/test';

export const generateAuthToken  = async (request: APIRequest) => {
    console.debug('- Retrieving Auth token')
  
    const requestContext = await request.newContext();
    const response = await requestContext.post(`${process.env.DELIUS_OAUTHURL}`, {
      headers:{
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": `${process.env.DELIUS_AUTHORIZATION}`,},
      form:{
        "grant_type": "client_credentials"},
      });
        
      expect(response.status()).toBe(200);
      const body = await response.json();
      
      console.debug('- Auth token successfully retrieved')
  
      return body.access_token;
  }

  export default generateAuthToken