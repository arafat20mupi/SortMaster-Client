import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { imageUpload } from "../Components/imageUpload";

const AddProducts = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = e.target;

    // Extract form data
    const imageUrl = data.image.files[0];
    const product_name = data.productsName.value;
    const description = data.productsDescription.value;
    const price = parseFloat(data.productsPrice.value);
    const category = data.productsCategory.value;
    const ratings = data.ratings.value;
    const date_posted = new Date().toLocaleString();

    // Initialize product image URL
    let product_image;

    // Upload image
    try {
      product_image = await imageUpload(imageUrl);
      console.log("Image uploaded successfully:", product_image);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed");
      return;
    }

    // Prepare new product data
    const newProducts = {
      product_name,
      product_image,
      price,
      ratings,
      description,
      date_posted,
      brand_name: category,
    };

    // Send new product data to the server
    try {
      const response = await fetch("https://server-side-mauve.vercel.app/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProducts),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Product added successfully:", responseData);
      toast.success("Product added successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div className="container mt-6 mx-auto">
      <Helmet>
        <title>SortMaster / Add Products</title>
      </Helmet>
      <div>
        <h1 className="text-center text-4xl font-bold">Add Products</h1>
      </div>
      <section className="p-6 dark:text-gray-800">
        <form onSubmit={handleSubmit} className="container w-full max-w-4xl p-8 mx-auto space-y-6 rounded-md shadow bg-gray-200">
          <div>
            <div className="md:flex justify-between">
              <div className="w-full ">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productsName"
                  placeholder="Your Product Name"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
              <div className="w-full md:ml-2">
                <label>Brand Name</label>
                <input
                  name="productsCategory"
                  type="text"
                  placeholder="Your Brand Name"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="w-full ">
                <label>Description</label>
                <input
                  type="text"
                  name="productsDescription"
                  placeholder="Your Product Description"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
              <div className="w-full md:ml-2">
                <label>Products Price</label>
                <input
                  name="productsPrice"
                  type="number"
                  placeholder="Your Products Price"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
            </div>
            <div className="md:flex justify-between">
              <div className="w-full ">
                <label>Poduct Ratings</label>
                <input
                  type="text"
                  name="ratings"
                  placeholder="Your Product Ratings"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full ">
                <label>Products Image</label>
                <input
                  type="file"
                  name="image"
                  placeholder="Your Queries Image url"
                  required
                  className="p-2 w-full rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:ring-violet-600 "
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white rounded p-2 mt-4 hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-violet-600 dark:text-white"
          >
            Add Products
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddProducts;
