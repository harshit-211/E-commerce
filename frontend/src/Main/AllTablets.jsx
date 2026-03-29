import Appbar from "./Appbar";
import Tablets from "../Contents/Tablets";

function AllTablets() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Tablets />
        </div>
    )
}

export default AllTablets;