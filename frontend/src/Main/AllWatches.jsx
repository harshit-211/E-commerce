import Appbar from "./Appbar";
import Watches from "../Contents/Watches";

function AllWatches() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Watches />
        </div>
    )
}

export default AllWatches;