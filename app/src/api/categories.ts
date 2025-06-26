import { getAccessToken } from "./auth";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'microworld';

interface Category {
    id: string;
    name: {[key: string]: string};
    version: number;
    slug: {
        [key: string]: string};
    }



export async function fetchCategories(): Promise<Category[]> {
    console.log('fetch');
    
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}/${PROJECT_KEY}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response);
    if (!response.ok) {
        throw new Error("Unable to fetch categories");
    }
 
    
    const data = await response.json();
    return data.results;
}