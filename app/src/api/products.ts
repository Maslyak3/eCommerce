import { mainDiv } from "../pages/login";
import { getAccessToken } from "./auth";

const API_URL = 'https://api.europe-west1.gcp.commercetools.com';
const PROJECT_KEY = 'microworld';

interface AttributeValue {
  label?: string;
  "en-GB"?: string;
  [key: string]: unknown;
}

interface ProductAttribute {
  name: string;
  value: string | number | boolean | AttributeValue;
}

export interface Product {
    id: string;
  masterData: {
    current: {
      name: { [locale: string]: string };
      description?: { [locale: string]: string };
      masterVariant: {
        prices?: {
          value: {
            centAmount: number;
            currencyCode: string;
          };
          discounted?: unknown;
        }[];
        images?: { url: string }[];
        attributes?: ProductAttribute[];
      };
    };
  };
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
    const token = localStorage.getItem("acessToken");
    let products: Product[] = [];
    if (!token) {
        throw new Error('No access token found');
    }
    try {
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/products?where=masterData(current(categories(id="${categoryId}")))`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
   
    const data = await response.json();
    
    products = data.results;
  } catch (error) {
      console.error('Error fetching products:', error);
      mainDiv.textContent = "Ви не зареєстровані";
  }
   return products;
}

export async function fetchProducts(): Promise<Product[]> {
    const token = localStorage.getItem("acessToken");
    let products: Product[] = [];

    try{
    const response = await fetch(`${API_URL}/${PROJECT_KEY}/products`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    
    const data = await response.json();
    products = data.results;
  } catch (error) {
      console.error('Error fetching products:', error);
      mainDiv.textContent = "Ви не зареєстровані";
  }
  return products;
}
