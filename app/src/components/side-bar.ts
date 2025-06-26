import { fetchProducts, fetchProductsByCategory} from "../api/products";
import { renderProducts, sideBar } from "../pages/shop";

const token = localStorage.getItem("acessToken");

interface Product {
    masterData: {
      current: {
        name: { 'en-GB': string };
        masterVariant: {
          prices?: Array<{
            value: { centAmount: number };
            discounted?: { value: { centAmount: number } };
          }>;
        };
      };
    };
  }

export const renderPriceControls = async () => {
        
    const allProducts = await fetchProducts();
    const prices: number[] = [];

    for (const product of allProducts) {
        const centAmount = product.masterData?.current?.masterVariant?.prices?.[0]?.value?.centAmount;
        if (typeof centAmount === "number") prices.push(centAmount / 100);
    }

    if (prices.length === 0) return;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    sideBar.textContent = "";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Пошук товарів за назвою";
    searchInput.className = "search-input";
    
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

    const minLabel = document.createElement("label");
    minLabel.textContent = `Мінімальна ціна: ${minPrice.toFixed(2)} €`;

    const minInput = document.createElement("input");
    minInput.type = "range";
    minInput.min = minPrice.toString();
    minInput.max = maxPrice.toString();
    minInput.step = "1";
    minInput.value = minPrice.toString();

    const maxLabel = document.createElement("label");
    maxLabel.textContent = `Максимальна ціна: ${maxPrice.toFixed(2)} €`;

    const maxInput = document.createElement("input");
    maxInput.type = "range";
    maxInput.min = minPrice.toString();
    maxInput.max = maxPrice.toString();
    maxInput.step = "1";
    maxInput.value = maxPrice.toString();

    const discountCheckbox = document.createElement("input");
    discountCheckbox.type = "checkbox";
    discountCheckbox.id = "discount-checkbox";

    const discountLabel = document.createElement("label");
    discountLabel.textContent = "Тільки акційні товари";
    discountLabel.htmlFor = "discount-checkbox";

    const updateLabels = () => {
        minLabel.textContent = `Мінімальна ціна: ${minInput.value} €`;
        maxLabel.textContent = `Максимальна ціна: ${maxInput.value} €`; 
    };

    const updateProducts = async () => {
        const selectedOrder = select.value;
        const priceFrom = parseFloat(minInput.value);
        const priceTo = parseFloat(maxInput.value);
        const searchQuery = searchInput.value.trim().toLowerCase();
        const onlyDiscounted = discountCheckbox.checked;

        const filteredProducts = await fetchFilteredProducts({
            sortOrder: selectedOrder,
            minPrice: priceFrom,
            maxPrice: priceTo,
        });
                
            const matchedByName = filteredProducts.filter((product: Product) => {
            const name = product?.masterData?.current?.name?.["en-GB"]?.toLowerCase();
            return name?.includes(searchQuery)
    });
    
    const matchedByDiscount = onlyDiscounted
  ? matchedByName.filter((product: Product) => 
      product.masterData.current.masterVariant.prices?.some(
        price => price.discounted !== undefined
      )
    )
  : matchedByName;
        renderProducts(matchedByDiscount);
        
    };

    select.addEventListener("change", updateProducts);
    searchInput.addEventListener("input", updateProducts);
    minInput.addEventListener("input", () => {
        updateLabels();
        updateProducts();
    });

    maxInput.addEventListener("input", () => {
        updateLabels();
        updateProducts();
    });
    discountCheckbox.addEventListener("change", updateProducts);
    updateLabels();

    sideBar.append(
        searchInput,
        sortLabel,
        select,
        minLabel,
        minInput,
        maxLabel,
        maxInput,
        discountCheckbox,
        discountLabel
    );
};

const fetchFilteredProducts = async (options: {
    sortOrder?: string;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
} = {}) => {
    const searchParams = new URLSearchParams();


    if (options.sortOrder === "desc") {
        searchParams.append("sort", "price desc");
    } else if (options.sortOrder === "asc") {
        searchParams.append("sort", "price asc");
    }

    if (typeof options.minPrice === "number" && typeof options.maxPrice === "number") {
        const from = Math.round(options.minPrice * 100);
        const to = Math.round(options.maxPrice * 100);
        searchParams.append("filter", `variants.price.centAmount:range(${from} to ${to})`);
    }

        searchParams.append("filter", "variants.price.centAmount:exists");

        if (options.searchQuery && options.searchQuery.length >= 2) {
            searchParams.append("text.en-GB", options.searchQuery);
            searchParams.append("fuzzy", "true");
        }

    const queryString = searchParams.toString();
    console.log("🔗 Запит до API:", queryString);

    const response = await fetch(
        `https://api.europe-west1.gcp.commercetools.com/microworld/product-projections/search?${queryString}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API помилка:", errorText);
        return [];
    }

    const data = await response.json();
    return data.results;
};
