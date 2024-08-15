import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ItemCard from "../ItemCard";

const Banner = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        fetch('https://server-side-mauve.vercel.app/user/last')
            .then((res) => res.json())
            .then((data) => setDatas(data))
    }, [])

    return (
        <div >

            <h1 className="text-3xl font-bold w-full text-center mt-10 mb-5">Latest Product</h1>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
                {datas.map((data, index) => <ItemCard key={index} item={data}></ItemCard>)}
            </div>
            <section className="py-6 mt-5 shadow-2xl rounded-lg dark:bg-gray-100 dark:text-gray-900">
                <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:flex-row lg:justify-between">
                    <h1 className="text-3xl font-semibold leading-tight text-center lg:text-left">See The All Products</h1>
                    <NavLink to={'/allItem'} className="inline-flex flex-nowrap items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white">
                        Click Hare Now
                    </NavLink>
                </div>
            </section>
        </div>



    );
};

export default Banner;