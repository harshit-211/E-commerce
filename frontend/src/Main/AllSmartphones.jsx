import Appbar from "./Appbar";
import Smartphones from "../Contents/Smartphones";

function AllSmartphones() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar/>
            <Smartphones/>
        </div>
    )
}

export default AllSmartphones;