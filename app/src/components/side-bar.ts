import { fetchProducts, fetchProductsByCategory } from "../api/products";
import { renderProducts, sideBar } from "../pages/shop";

const token = localStorage.getItem("accessToken");

export const renderPriceControls = async () => {
    // const sideBar = document.querySelector(".sidebar") as HTMLElement;
    
    const products = await fetchProducts()
    const prices: number[] = [];

    for (const product of products) {
        const p = product.masterData && product.masterData.current && product.masterData.current.masterVariant?.prices?.[0]?.value?.centAmount;
        if (typeof p === "number") {
            prices.push(p / 100);
        }
    }
    if (prices.length === 0) return;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    sideBar.textContent = "";

    const sortLabel = document.createElement('label');
    sortLabel.textContent = "Сортування за ціною";
    const select = document.createElement("select");

    const optionBlanc = document.createElement("option");
    optionBlanc.textContent = "Сортувати"

    const optionAsc = document.createElement("option");
    optionAsc.value = "asc";
    optionAsc.textContent = "Зростання ціни";
    
    const optionDesc = document.createElement("option");
    optionDesc.value = "desc";
    optionDesc.textContent = "Спадання ціни";

    select.appendChild(optionBlanc)
    select.appendChild(optionAsc);
    select.appendChild(optionDesc);

    const rangeLabel = document.createElement("label");
    rangeLabel.textContent = `Максимальна ціна: ${maxPrice.toFixed(2)} €`;

    const rangeInput = document.createElement("input");
    rangeInput.type = "range";
    rangeInput.min = minPrice.toString();
    rangeInput.max = maxPrice.toString();
    rangeInput.step = "1";
    rangeInput.value = maxPrice.toString();

    const updateProducts = async () => {
        const selectedOrder = select.value;
        const maxPriceFilter = parseFloat(rangeInput.value);

        const filteredProducts = await fetchFilteredProducts({
            sortOrder: selectedOrder,
            maxPrice: maxPriceFilter,
        });
        renderProducts(filteredProducts);
    }
    select.addEventListener("change", updateProducts);
    rangeInput.addEventListener("input", () => {
        rangeLabel.textContent = `Максимальна ціна: ${rangeInput.value} €`;
        updateProducts();
    });

    sideBar.appendChild(sortLabel);
    sideBar.appendChild(select);
    sideBar.appendChild(rangeLabel);
    sideBar.appendChild(rangeInput);
}

const fetchFilteredProducts = async (options: any = {}) => {
    const params: string[] = [];

    if (options.sortOrder === "desc") {
        params.push("sort=price desc")
    } else {
        params.push("sort=price asc")
    }

    if (options.maxPrice) {
        const maxCentAmount = Math.round(options.maxPrice * 100);
        params.push(`filter=variants.price.centAmount:range(0 to ${maxCentAmount})`);
    }

    const queryString = params.join("&");
    const response = await fetch(`https://api.europe-west1.gcp.commercetools.com/microworld/product-projections/search?${queryString}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Помилка fetchFilteredProducts:", response.status, errorText);
        return [];
    }

    const data = await response.json();
    return data.results;
};
