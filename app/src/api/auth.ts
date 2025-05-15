const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com/oauth/token';
const CLIENT_ID = 'N9Kevvzmc1Igf0kRCJJ2tBPO';
const CLIENT_SECRET = 'NWn08A9UZmhDBBCRpi50OO2qFITX2tZ-';
const SCOPE = 'manage_project:microworld';

export async function getAccessToken(): Promise<string> {
    console.log("GetAccessToken запускається")
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

    const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&scope=${SCOPE}`,
    });
    if (!response.ok) {
        throw new Error('Failed to get response');
    }
    const data = await response.json();
    return data.access_token;

    
}