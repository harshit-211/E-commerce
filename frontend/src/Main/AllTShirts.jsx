import Appbar from "./Appbar";
import TShirts from "../Contents/TShirts";

function AllTShirts() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <TShirts />
        </div>
    )
}

export default AllTShirts;