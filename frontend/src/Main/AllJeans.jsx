import Appbar from "./Appbar";
import Jeans from "../Contents/Jeans";

function AllJeans() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Jeans />
        </div>
    )
}

export default AllJeans;