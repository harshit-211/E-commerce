import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../components/ui/input";

function Appbar({ searchQuery, setSearchQuery }) {
    const { userId } = localStorage.getItem("Token");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <motion.div
                initial = {{ opacity : 0, y : -5 }}
                animate = {{ opacity : 1, y : 0 }}
                transition = {{ duration : 0.5 }}
                className = "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
            >
                <button 
                    onClick = {() => { navigate("/home") }}
                    className = "text-cyan-300 text-2xl md:text-3xl font-bold hover: cursor-pointer"
                >
                    Shopify
                </button>
                <div className = "flex items-center gap-4 sm:gap-6">
                    <div>
                        {isOpen ? (
                            <Search 
                                className = "text-gray-300 w-5 h-5 sm:w-6 sm:h-6 hover:cursor-pointer" 
                                onClick = {() => setIsOpen(false)}
                            />
                        ) : (
                                <motion.div
                                    initial = {{ opacity : 0, x : 5 }}
                                    animate = {{ opacity : 1, x : 0 }}
                                    transition = {{ duration : 0.25 }}
                                >
                                    <Input 
                                        autoFocus
                                        placeholder = "Search" 
                                        className = "text-white"
                                        value = {searchQuery}
                                        onChange = {(e) => setSearchQuery(e.target.value)}
                                        onBlur = {() => setIsOpen(true)}
                                    />
                                </motion.div>
                            )
                        }
                    </div>
                    <Heart className = "text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
                    <ShoppingCart 
                        className = "text-gray-300 w-5 h-5 sm:w-6 sm:h-6 hover: cursor-pointer"
                        onClick = {() => { navigate("/cart") }}
                    />
                    <CircleUserRound className = "text-gray-300 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </motion.div>
        </div>
    )
}

export default Appbar;