import { FullConfig, expect, request } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {

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
        console.log("token: ", process.env.TOKEN, "\n");
        console.log("auth: ",process.env.DELIUS_DEV_AUTHORIZATION, "\n");
        console.log("oauthurl: ",process.env.DELIUS_DEV_OAUTHURL);
}