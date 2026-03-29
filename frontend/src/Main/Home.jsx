import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Funnel } from "lucide-react";
import { Slider } from "../components/ui/slider";
import iphoneImage from "../assets/images/iphone-image.jpeg";
import Appbar from "./Appbar";
import Smartphones from "../Contents/Smartphones";
import Laptops from "../Contents/Laptops";
import Ac from "../Contents/Ac";
import Earphones from "../Contents/Earphones";
import Headphones from "../Contents/Headphones";
import Jackets from "../Contents/Jackets";
import Jeans from "../Contents/Jeans";
import Refrigerators from "../Contents/Refrigerators";
import Shirts from "../Contents/Shirts";
import Shoes from "../Contents/Shoes";
import Speakers from "../Contents/Speakers";
import Tablets from "../Contents/Tablets";
import TShirts from "../Contents/TShirts";
import Tvs from "../Contents/Tvs";
import WashingMachine from "../Contents/WashingMachine";
import Watches from "../Contents/Watches";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilter, setShowFilter] = useState(false);
    const [maxPrice, setMaxPrice] = useState(0);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const query = searchQuery.toLowerCase();

    const filterCard = (
        <AnimatePresence>
          {showFilter && (
            <motion.div
              key="filter-card"
              initial={{ opacity: 0, x: -100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="bg-gray-800 rounded-lg shadow p-4 sm:p-6 text-white min-h-[420px]"
            >
              <h3 className="text-cyan-300 font-bold text-2xl mb-4">
                Filters
              </h3>
              <div className="space-y-4">
                <div className = "text-gray-300 text-sm">
                    Search
                </div>
                <Input 
                    placeholder = "Search products..."
                    className = "mt-2 bg-gray-700 border-gray-700 rounded-sm"
                >
                </Input>    

                <div className = "text-gray-300 text-sm">
                    Price Range
                </div>
                
                <div className = "space-y-2">
                    <Slider 
                        value = {[maxPrice]}
                        onValueChange = {(value) => {
                            setMaxPrice(value[0]);
                            setIsFilterActive(true);
                        }}
                        min = {0}
                        max = {7000}
                        step = {1}
                    />

                    <div className = "flex justify-between text-sm text-gray-400">
                        <span>$0</span>
                        <span>$7000</span>
                    </div>

                    <div className = "text-sm text-cyan-300 font-semibold">
                        Up to ${maxPrice}
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    );      

    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar searchQuery = {searchQuery} setSearchQuery = {setSearchQuery} />
            {query === "" && (
                <motion.div
                    initial = {{ opacity : 0,y : -20 }}
                    animate = {{ opacity : 1,y : 0 }}
                    transition = {{ delay : 0.3,duration : 0.75 }}
                >
                    <div className = "relative w-full max-w-6xl mx-auto">
                        <img 
                            src = {iphoneImage} 
                            alt = "iPhone" 
                            className = "w-full h-100 object-cover rounded-xl shadow-lg"
                        />
                        <div className = "absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                            <p className = "text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                                Summer Sale
                            </p>
                            <p className = "text-gray-300 mt-2 text-base sm:text-lg md:text-xl">
                                Up to 50% discount on all items
                            </p>
                            <button className = "mt-4 bg-cyan-300 text-gray-900 px-4 py-2 rounded-lg text-sm sm:text-base md:text-lg font-semibold hover:bg-cyan-400 transition hover: cursor-pointer">
                                Shop Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {query === "" && (
                <>  
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Smartphones</div> <Smartphones limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Laptops</div> <Laptops limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Ac</div> <Ac limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Earphones</div> <Earphones limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Headphones</div> <Headphones limit = { 4 } /> 
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Jackets</div> <Jackets limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Jeans</div> <Jeans limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Refrigerators</div> <Refrigerators limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Shirts</div> <Shirts limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Shoes</div> <Shoes limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Speakers</div> <Speakers limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Tablets</div> <Tablets limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">T-Shirts</div> <TShirts limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Tv</div> <Tvs limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Washing Machine</div> <WashingMachine limit = { 4 } />
                    <div className = "text-cyan-300 font-bold text-2xl sm:text-3xl max-w-7xl mt-8 mx-auto px-4">Watches</div> <Watches limit = { 4 } />
                </>
            )}

            {query !== "" && (
                <Button 
                    onClick = {() => setShowFilter(prev => !prev)}
                    className = "bg-gray-800 rounded-sm text-cyan-300 font-bold md:ml-75 sm:ml-30 hover:cursor-pointer hover:bg-gray-800"
                >
                    <Funnel /> Filters
                </Button>
            )}

            { query.includes("phone") && <Smartphones limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("laptop") && <Laptops limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("ac") && <Ac limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } />}
            { query.includes("earphones") && <Earphones limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("headphone") && <Headphones limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> } 
            { query.includes("jacket") && <Jackets limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("jean") && <Jeans limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("refrigerator") && <Refrigerators limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("shirt") && <Shirts limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("shoes") && <Shoes limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("speakers") && <Speakers limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("tablet") && <Tablets limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("tshirt") && <TShirts limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("tv") && <Tvs limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("washing machine") && <WashingMachine limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
            { query.includes("watch") && <Watches limit = { showFilter ? 3 : 4 } extraCard = { filterCard } maxPrice = { maxPrice } isFilterActive = { isFilterActive } /> }
        </div>
    );
}

export default Home;