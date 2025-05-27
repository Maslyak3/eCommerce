import { getAccessToken } from "./auth";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'microworld';

export async function fetchProductsByCategory(categoryId: string): Promise<any[]> {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/products?where=masterData(current(categories(id="${categoryId}")))`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failde to fetch products');
    }
    const data = await response.json();
    return data.results;
}

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
    return data.results;
}
