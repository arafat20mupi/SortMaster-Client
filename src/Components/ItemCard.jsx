/* eslint-disable react/prop-types */

const ItemCard = ({ item }) => {
    const { product_image, product_name, brand_name, date_posted, description, ratings, price } = item;
    return (
        <div data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="w-full  rounded-md shadow-md bg-gray-50 text-gray-800">
            <div className="p-4  ">
                <img src={product_image} alt="" className="object-cover hover:scale-105 hover:duration-200 object-center w-full rounded-xl h-72 hover:delay-50" />
            </div>
            <div className="flex  flex-col justify-between p-3 ">
                <div className="space-y-1">
                    <h2 className="text-xl tracking-wide"><span className="font-bold">Product Name: </span> {product_name}</h2>
                    <h2 className="flex gap-1  w-full"><span className="font-bold">Brand Name: </span> {brand_name}</h2>
                    <p className="flex gap-1 w-full"><span className="font-bold">Price: </span> {price} </p>
                    <h2 className="flex gap-1 w-full"><span className="font-bold">Ratings: </span> {ratings}</h2>
                    <p className="flex gap-1 w-full"><span className="font-bold">Date Posted :</span> {new Date(date_posted).toLocaleDateString()} </p>
                    <h2 className="text-lg  text-black"><span className="font-bold">Description:</span> {description}</h2>
                </div>
            </div>
        </div>
    );
};

export default ItemCard;