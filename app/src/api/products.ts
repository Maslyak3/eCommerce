import { getAccessToken } from "./auth";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'microworld';

export async function fetchProducts(): Promise<any[]> {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/products`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failde to fetch products');
    }
    const data = await response.json();
    console.log("Products response:", data);
    return data.results;
}
