import Appbar from "../Main/Appbar";
import Jackets from "../Contents/Jackets";

function AllJackets() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Jackets />
        </div>
    )
}

export default AllJackets;