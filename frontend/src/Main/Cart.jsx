import Appbar from "./Appbar";
import { useEffect } from "react";
import { useState } from "react";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { CreditCard } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Skeleton } from "../components/ui/skeleton";

function Cart() {
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        const res = await fetch("http://localhost:3001/user/get/cart", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            }
        });

        const data = await res.json();

        setTimeout(() => {
            setAllItems(data.allItems);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const increaseQuantity = async (productId) => {
        await fetch("http://localhost:3001/cart/increase/quantity", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify({ productId })
        });

        setAllItems(prev =>
            prev.map(cart => ({
                ...cart,
                items: cart.items.map(item =>
                    item.productId._id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }))
        );
    };

    const decreaseQuantity = async (productId) => {
        await fetch("http://localhost:3001/cart/decrease/quantity", {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify({ productId })
        });

        setAllItems(prev =>
            prev.map(cart => ({
                ...cart,
                items: cart.items.map(item =>
                    item.productId._id === productId && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            }))
        );
    };

    const deleteItem = async (productId) => {
        await fetch("http://localhost:3001/cart/delete/item", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Token")}`
            },
            body: JSON.stringify({ productId })
        });

        setAllItems(prev =>
            prev.map(cart => ({
                ...cart,
                items: cart.items.filter(
                    item => item.productId._id !== productId
                )
            }))
        );
    };

    const priceWithoutTax = allItems[0]?.items.reduce((acc, product) => {
        const price = parseFloat(product.productId.price.replace(/[^0-9.]/g, ""));
        return acc + product.quantity * price;
    }, 0) || 0;

    const gstTax = 0.18 * priceWithoutTax;
    const totalPrice = priceWithoutTax + gstTax;

    return (
        <div className="bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />

            <div className="text-center mt-20">
                <div className="text-cyan-300 font-bold text-4xl">
                    Your Cart
                </div>

                <div className="mt-10 flex flex-col items-center gap-4">
                    {loading ? (
                        [1, 2, 3].map((_, i) => (
                            <div key={i} className="w-full max-w-3xl bg-gray-800 rounded-md flex gap-4 p-4">
                                <Skeleton className="w-20 h-20 rounded-md bg-gray-700" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-4 w-1/2 bg-gray-700" />
                                    <Skeleton className="h-4 w-1/3 bg-gray-700" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <AnimatePresence>
                            {allItems.map((item) =>
                                item.items.map((product) => (
                                    <motion.div
                                        key={product.productId._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: 100, scale: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                        className="w-full max-w-3xl bg-gray-800 rounded-md flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 shadow-md"
                                    >
                                        <img
                                            src={product.productId.image}
                                            alt={product.productId.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />

                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="text-cyan-300 font-bold text-lg">
                                                {product.productId.name}
                                            </div>
                                            <div className="text-gray-400 mt-1">
                                                {product.productId.price}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-gray-900 text-cyan-300 flex items-center justify-center rounded cursor-pointer">
                                                <Minus
                                                    size={16}
                                                    onClick={() => decreaseQuantity(product.productId._id)}
                                                />
                                            </div>

                                            <div className="text-cyan-300 font-bold w-10 h-8 flex items-center justify-center bg-gray-700 rounded">
                                                {product.quantity}
                                            </div>

                                            <div className="w-8 h-8 bg-gray-900 text-cyan-300 flex items-center justify-center rounded cursor-pointer">
                                                <Plus
                                                    size={16}
                                                    onClick={() => increaseQuantity(product.productId._id)}
                                                />
                                            </div>

                                            <div className="ml-2 text-red-500 cursor-pointer">
                                                <Trash2
                                                    size={20}
                                                    onClick={() => deleteItem(product.productId._id)}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    )}

                    {!loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="w-full max-w-3xl h-65 rounded-sm bg-gray-800 mt-6"
                        >
                            <div className="flex justify-between items-center px-5 mt-6">
                                <div className="text-cyan-300 font-bold text-2xl">
                                    Order Summary
                                </div>
                            </div>

                            <div className="px-5 mt-4">
                                <div className="flex justify-between text-white">
                                    <span>Subtotal</span>
                                    <span>${priceWithoutTax}</span>
                                </div>

                                <div className="flex justify-between text-white mt-2">
                                    <span>Tax</span>
                                    <span>${gstTax}</span>
                                </div>

                                <div className="border-t border-gray-600 my-4"></div>

                                <div className="flex justify-between text-cyan-300 font-bold text-lg">
                                    <span>Total</span>
                                    <span>${totalPrice}</span>
                                </div>

                                <button className="bg-cyan-400 text-sm mt-4 h-10 w-full rounded-sm flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 hover:bg-cyan-300 hover:shadow-cyan-400/50 hover:shadow-lg hover:cursor-pointer">
                                    <CreditCard size={16} />
                                    Proceed to Checkout
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;