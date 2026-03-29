import Appbar from "./Appbar";
import Refrigerators from "../Contents/Refrigerators";

function AllRefrigerators() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Refrigerators />
        </div>
    )
}

export default AllRefrigerators;