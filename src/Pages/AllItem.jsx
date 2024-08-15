import { useEffect, useState } from "react";
import { LuLayoutGrid } from "react-icons/lu";
import { HiOutlineBars3 } from "react-icons/hi2";
import ItemCard from "../Components/ItemCard";

const AllItem = () => {
    const [Items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [sortOrder, setSortOrder] = useState("asc");
    const [viewMode, setViewMode] = useState("card");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const fetchItems = async (page = 1, limit = 9) => {
        try {
            const response = await fetch(`http://localhost:5000/users?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching items:', error);
            // You can add additional error handling logic here
            return { result: [], pages: 1 }; // Fallback to empty result
        }
    };
    console.log(Items);

    useEffect(() => {
        const loadItems = async () => {
            const data = await fetchItems(currentPage, itemsPerPage);
            setItems(data.result);
            setTotalPages(data.pages);
        };

        loadItems();
    }, [currentPage, itemsPerPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const brands = [...new Set(Items.map(item => item.brand_name))];
    const categories = [...new Set(Items.map(item => item.product_name))];

    const handleMinPriceChange = (event) => {
        setMinPrice(Number(event.target.value));
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(Number(event.target.value));
    };

    const sortItems = (items, order) => {
        return items.slice().sort((a, b) => {
            if (order === "ascPrice") {
                return a.price - b.price;
            } else if (order === "descPrice") {
                return b.price - a.price;
            } else if (order === "ascDate") {
                return new Date(a.date_posted) - new Date(b.date_posted);
            } else if (order === "descDate") {
                return new Date(b.date_posted) - new Date(a.date_posted);
            }
            return 0;
        });
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const toggleViewMode = () => {
        setViewMode(viewMode === "card" ? "table" : "card");
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredItems = Items.filter((item) => {
        const matchesSearch = searchQuery === "" || item.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesBrand = selectedBrand === "" || item.brand_name === selectedBrand;
        const matchesCategory = selectedCategory === "" || item.product_name === selectedCategory;
        const matchesPriceRange = item.price >= minPrice && item.price <= maxPrice;
        return matchesSearch && matchesBrand && matchesCategory && matchesPriceRange;
    });

    const sortedItems = sortItems(filteredItems, sortOrder);

    return (
        <div>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <label htmlFor="sort">Sort by:</label>
                    <select
                        id="sort"
                        className="ml-2 p-2 border"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <option value="ascPrice">Price: Low to High</option>
                        <option value="descPrice">Price: High to Low</option>
                        <option value="ascDate">Date Added: Oldest First</option>
                        <option value="descDate">Date Added: Newest First</option>
                    </select>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search by Product Name"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="ml-4 p-2 border"
                    />
                    <button onClick={toggleViewMode} className="ml-4 btn bg-blue-500 text-white flex items-center">
                        {viewMode === "card" ? (
                            <>
                                <LuLayoutGrid className="mr-1" />
                                Card View
                            </>
                        ) : (
                            <>
                                <HiOutlineBars3 className="mr-1" />
                                Table View
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                    <label htmlFor="brand">Brand:</label>
                    <select id="brand" className="ml-2 p-2 border" onChange={handleBrandChange}>
                        <option value="">All Brands</option>
                        {brands.map(brand => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="category">Category:</label>
                    <select id="category" className="ml-2 p-2 border" onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="range"
                        id="minPrice"
                        min="0"
                        max="1000"
                        step="10"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        className="ml-2"
                    />
                    <span className="ml-2">${minPrice}</span>
                </div>
                <div className="flex items-center">
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="range"
                        id="maxPrice"
                        min="0"
                        max="1000"
                        step="10"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        className="ml-2"
                    />
                    <span className="ml-2">${maxPrice}</span>
                </div>
            </div>
            {sortedItems.length === 0 ? (
                <p>No items found.</p>
            ) : viewMode === "card" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedItems.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Brand Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Date Posted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.map((item) => (
                            <tr key={item._id}>
                                <td className="py-2 px-4 border-b">{item.product_name}</td>
                                <td className="py-2 px-4 border-b">{item.brand_name}</td>
                                <td className="py-2 px-4 border-b">${item.price}</td>
                                <td className="py-2 px-4 border-b">{item.date_posted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="mt-4 flex justify-center items-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 mx-1 ${currentPage === page ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllItem;
