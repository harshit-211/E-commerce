import Appbar from "./Appbar";
import Earphones from "../Contents/Earphones";

function AllEarphones() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Earphones />
        </div>
    )
}

export default AllEarphones;