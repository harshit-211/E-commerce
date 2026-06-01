import Appbar from "./Appbar";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Skeleton } from "../components/ui/skeleton";

function Orders() {
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetch("https://e-commerce-3-zvas.onrender.com/get/orders", {
                method : "GET",
                headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${localStorage.getItem("Token")}`
                }
            })
              .then((res) => res.json())
              .then((data) => {
                setProducts(data.allProducts);
                setIsLoading(false);
              })
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    let counter = 1;

    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <div className = "text-center mt-20">
                <div className = "text-cyan-300 font-bold text-4xl">
                    My Orders
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-3xl mx-auto mt-10 space-y-6"
                    >
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="w-full bg-gray-800 rounded-md flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 shadow-md"
                            >
                                <div className="w-full space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Skeleton className="h-8 w-32 bg-gray-700" />
                                        <Skeleton className="h-7 w-24 bg-gray-700" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-5 w-40 bg-gray-700" />
                                        <Skeleton className="h-5 w-24 bg-gray-700" />
                                    </div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-5 w-44 bg-gray-700" />
                                        <Skeleton className="h-5 w-5 bg-gray-700 rounded-full" />
                                    </div>
                                    <div className="space-y-3 pt-2">
                                        <Skeleton className="h-4 w-full bg-gray-700" />
                                        <Skeleton className="h-4 w-5/6 bg-gray-700" />
                                    </div>
                                    <div className="border-t border-gray-500 my-2"></div>
                                    <div className="flex justify-between">
                                        <Skeleton className="h-10 w-24 bg-gray-700" />
                                        <Skeleton className="h-10 w-24 bg-gray-700" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="orders"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {products.map((product,index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: index * 0.08 }}
                                className = {"w-full max-w-3xl mx-auto bg-gray-800 rounded-md flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 shadow-md mt-10"}
                            >
                                <div className = "w-full">
                                    <div className = "flex justify-between items-center">
                                        <span className = "text-cyan-300 font-bold text-2xl">Order #{counter++}</span>
                                        <div className = "inline-flex items-center gap-2 bg-gray-900 rounded-lg text-white text-sm font-bold px-3 py-1">
                                            <Box size = {16} className = "text-yellow-300" />
                                            Processing
                                        </div>
                                    </div>
                                    <div className = "flex justify-between">
                                        <span className = "mt-4 text-gray-400 font-bold">Order Date: {product.createdAt} </span>
                                        <span className = "mt-4 text-gray-400 font-bold">Total: ₹{product.totalAmount} </span>
                                    </div>
                                    <div className = "flex justify-between">
                                        <span 
                                            className = "mt-8 text-cyan-400 font-bold hover:cursor-pointer hover:underline"
                                            onClick = {() => setIsOpen(isOpen === index ? null : index)}
                                        >
                                            View Order Details
                                        </span>
                                        {isOpen === index ? (
                                                <span 
                                                    className = "mt-8 hover:cursor-pointer"
                                                    onClick = {() => setIsOpen(isOpen === index ? null : index)}
                                                >
                                                    <ChevronUp size = {16} className = "text-cyan-400" />
                                                </span>
                                            ) : (
                                                <span 
                                                    className = "mt-8 hover:cursor-pointer"
                                                    onClick = {() => setIsOpen(isOpen === index ? null : index)}
                                                >
                                                    <ChevronDown size = {16} className = "text-cyan-400" />
                                                </span>
                                            )
                                        }
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isOpen === index && (
                                            <motion.div
                                                key="details"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <div>
                                                    {product.items.map((item,i) => (
                                                        <motion.div
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ duration: 0.2, delay: i * 0.04 }}
                                                        >
                                                            <div className = "flex justify-between">
                                                                <span className = "text-cyan-400 text-xs font-bold mt-8">
                                                                    {item.productId.name} ({item.productId.colour}, {item.productId.storage})
                                                                </span>
                                                                <span className = "text-cyan-400 text-xs font-bold mt-8">
                                                                    ₹{item.price}
                                                                </span>
                                                            </div>
                                                            <div className = "text-gray-400 text-xs font-bold">
                                                                Quantity: {item.quantity}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className = "border-t border-gray-500 my-2"></div>
                                    <div className = "flex justify-between">
                                        <span className = "mt-4">
                                            <button className = "w-25 h-10 bg-gray-900 rounded-md text-cyan-400 font-bold text-xs">Track Order</button>
                                        </span>
                                        <span className = "mt-4">
                                            <button className = "w-25 h-10 bg-gray-900 rounded-md text-cyan-400 font-bold text-xs">
                                                Need help?
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Orders;