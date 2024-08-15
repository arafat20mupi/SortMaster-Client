// src/api.js
export const fetchItems = async (params) => {
    const { page, limit, sort, searchQuery, brand, category, minPrice, maxPrice } = params;
    try {
        const response = await fetch(`http://localhost:5000/users?page=${page}&limit=${limit}&sort=${sort}&searchQuery=${searchQuery}&brand=${brand}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};
