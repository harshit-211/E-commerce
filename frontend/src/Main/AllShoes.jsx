import Appbar from "./Appbar";
import Shoes from "../Contents/Shoes";

function AllShoes() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Shoes />
        </div>
    )
}

export default AllShoes;