import Appbar from "./Appbar";
import Laptops from "../Contents/Laptops";

function AllLaptops() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Laptops />
        </div>
    )
}

export default AllLaptops;