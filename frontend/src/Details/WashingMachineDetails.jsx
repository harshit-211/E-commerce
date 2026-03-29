import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { motion } from "framer-motion";
import Appbar from "../Main/Appbar";
import { ShoppingBag } from "lucide-react";

function WashingMachineDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/user/get/washingMachine/${id}`,{
            method : "GET",
            headers : { 'Content-type' : 'application/json' }
        })
          .then((res) => res.json())
          .then((data) => {
            setItem(data.findItem);
            setTimeout(() => setLoading(false), 1000);
          });
    }, [id]);

    if(loading) {
        return (
          <motion.div
            className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="max-w-4xl w-full space-y-4"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              <Skeleton className="h-72 w-full rounded-md bg-gray-800" />
              <Skeleton className="h-8 w-3/4 rounded-md bg-gray-800" />
              <Skeleton className="h-6 w-1/2 rounded-md bg-gray-800" />
            </motion.div>
          </motion.div>
        );
    }

    if(!item) {
        return (
            <div className = "bg-gray-900 min-h-screen">
                <div className = "text-cyan-300 text-center p-6 text-2xl font-bold">
                    Item not found
                </div>
            </div>
        )
    }

    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
          <Appbar />
          <div className = "flex flex-col md:flex-row items-center justify-center gap-16 mt-16">
            <motion.img
              src = {item.image}
              alt = {item.name}
              className = "w-130 h-150 object-cover rounded-2xl shadow-lg md:-ml-8"
              whileHover = {{ scale: 1.05 }}
              transition = {{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <div className = "max-w-lg text-center md:text-left">
              <h1 className = "text-3xl md:text-4xl font-bold text-cyan-300">
                {item.companyName}, {item.name}
              </h1>

              <div className = "flex items-center justify-center md:justify-start mt-4">
                <Star className = "h-4 w-4 text-yellow-300 fill-yellow-300" />
                <Star className =  "h-4 w-4 text-yellow-300 fill-yellow-300" />
                <Star className = "h-4 w-4 text-yellow-300 fill-yellow-300" />
                <Star className = "h-4 w-4 text-yellow-300 fill-yellow-300" />
                <Star className = "h-4 w-4 text-gray-300" />
                <span className = "text-gray-400 text-sm ml-2">(4.5 stars)</span>
              </div>

              <p className = "mt-4 text-white font-semibold text-2xl">
                {item.price}
              </p>

              <p className = "mt-4 text-gray-300 text-base md:text-lg leading-relaxed">
                {item.ton} | {item.star} | {item.colour} colour | {item.quantity} left only
              </p>
    
              <button className = "bg-cyan-400 w-full md:w-60 rounded-md shadow mt-6 h-12 flex items-center justify-center gap-2 hover:bg-cyan-300 hover:scale-105 hover:cursor-pointer transition-transform">
                <ShoppingCart className = "text-gray-900 w-6 h-6" />
                <span className = "text-gray-900 font-semibold text-base">
                  Add to Cart
                </span>
              </button>

              <button className = "bg-cyan-400 w-full md:w-60 rounded-md shadow mt-6 h-12 flex items-center justify-center gap-2 hover:bg-cyan-300 hover:scale-105 hover:cursor-pointer transition-transform">
                <ShoppingBag className = "text-gray-900 w-6 h-6" />
                <span className = "text-gray-900 font-semibold text-base">
                  Buy Now
                </span>
              </button>

            </div>
          </div>
        </div>
    );
}

export default WashingMachineDetails;