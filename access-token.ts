import { expect, request } from '@playwright/test';

export const getToken = async ()=> {

    const requestContext = await request.newContext();
    const response = await requestContext.post(`${process.env.DELIUS_DEV_OAUTHURL}`, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `${process.env.DELIUS_DEV_AUTHORIZATION}`,},
            form:{
              "grant_type": "client_credentials"},
            });
        
        expect(response.status()).toBe(200);
        const body = await response.json();
        process.env.TOKEN = body.access_token;
        return body.access_token;
}

export default getToken;