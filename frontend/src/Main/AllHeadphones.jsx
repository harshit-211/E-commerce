import Appbar from "./Appbar";
import Headphones from "../Contents/Headphones";

function AllHeadphones() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Headphones />
        </div>
    )
}

export default AllHeadphones;