import { useState } from "react";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

function Headphones({ limit, extraCard, maxPrice, isFilterActive }) {
    const navigate = useNavigate();
    const [allHeadphones, setAllHeadphones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://e-commerce-3-zvas.onrender.com/user/get/headphones", {
            method : "GET",
            headers : { "Content-type" : "application/json" }
        })
          .then((res) => res.json())
          .then((data) => {
            setAllHeadphones(data.allHeadphones);
            setTimeout(() => setLoading(false), 1000);
          });
    }, []);

    const displayedHeadphones = (() => {
      if(!isFilterActive) {
        return limit ? allHeadphones.slice(0, limit) : allHeadphones;
      }
      return allHeadphones 
        .filter(item => {
          const numericPrice = Number(item.price.replace(/[^\d]/g, ""));
          return numericPrice <= maxPrice
        })
        .slice(0, limit);
    })();

    return (
        <div className="text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mx-auto px-4">
          <div className="py-6">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeletons"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {Array(4)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        className="bg-gray-800 rounded-lg shadow p-4 text-white text-xl"
                        key={index}
                      >
                        <Skeleton className="w-full h-56 sm:h-64 rounded-md" />
                        <Skeleton className="mt-4 h-6 w-3/4" />
                        <Skeleton className="mt-2 h-5 w-1/2" />
                        <Skeleton className="mt-3 h-4 w-16" />
                        <Skeleton className="mt-4 h-10 w-full rounded-sm" />
                      </div>
                    ))}
                </motion.div>
              ) : (
                <>
                  <motion.div
                    key="headphones"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  >
                    {extraCard}
                    {displayedHeadphones.map((headphones, index) => (
                      <div
                        onClick = {() => navigate(`/headphone/details/${headphones._id}`)}
                        className="bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-white hover:cursor-pointer hover:scale-105 transition-transform duration-200"
                        key={index}
                      >
                        <img
                          src={headphones.image}
                          alt={headphones.name}
                          className="w-full h-56 sm:h-64 object-cover rounded-md"
                        />
                        <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base">
                          {headphones.companyName} {headphones.name} {headphones.colour}
                        </p>
                        <p className="mt-2 text-gray-400 text-sm">{headphones.price}</p>
                        <div className="flex items-center gap-1 sm:gap-2 mt-3">
                          <Star className="h-4 w-4 text-yellow-300" />
                          <span className="text-xs text-gray-400">4.5</span>
                        </div>
                        <button 
                          onClick = {(e) => {
                            e.stopPropagation();
                            fetch("https://e-commerce-3-zvas.onrender.com/add/to/cart", {
                              method : "POST",
                              headers : {
                                "Content-type" : "application/json",
                                Authorization : `Bearer ${localStorage.getItem("Token")}`
                              },
                              body : JSON.stringify({
                                productId : headphones._id,
                                productType : "Headphones"
                              })
                            })
                              .then((res) => res.json())
                              .then((data) => {
                                toast.success(data.message, {
                                  position : "bottom-right",
                                  duration : 2000,
                                  classNames : {
                                    toast : "!bg-gray-800 !text-cyan-400 !w-70 !h-20 !rounded-sm !border-0"
                                  }
                                });
                              })
                          }}
                          className="bg-cyan-400 w-full rounded-md shadow mt-4 h-10 flex items-center justify-center gap-2 text-gray-900 font-semibold text-sm transition-all duration-200 transform hover:scale-105 hover:bg-cyan-300 hover:shadow-cyan-400/50 hover:shadow-lg hover:cursor-pointer"
                        >
                          <ShoppingCart className="text-gray-900 w-5 h-5" />
                          <span className="text-gray-900 font-semibold text-sm">
                            Add to Cart
                          </span>
                        </button>
                        <button 
                          onClick = {(e) => {
                            e.stopPropagation();
                          }}
                          className="bg-cyan-400 w-full rounded-md shadow mt-4 h-10 flex items-center justify-center gap-2 text-gray-900 font-semibold text-sm transition-all duration-200 transform hover:scale-105 hover:bg-cyan-300 hover:shadow-cyan-400/50 hover:shadow-lg"
                          >
                          <ShoppingBag className="text-gray-900 w-5 h-5" />
                          <span className="text-gray-900 font-semibold text-sm">
                            Buy Now
                          </span>
                        </button>
                      </div>
                    ))}
                  </motion.div>
    
                  {limit && allHeadphones.length > limit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={() => navigate("/all/headphones")}
                          className="bg-cyan-300 text-gray-900 rounded-lg px-4 py-2 font-semibold hover:bg-cyan-400 hover:cursor-pointer text-base sm:text-lg transition"
                        >
                          View All →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
    );
}

export default Headphones;