import Appbar from "./Appbar";
import Shirts from "../Contents/Shirts";

function AllShirts() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Shirts />
        </div>
    )
}

export default AllShirts;