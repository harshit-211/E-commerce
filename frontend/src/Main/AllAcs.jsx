import Appbar from "./Appbar";
import Acs from "../Contents/Ac";

function AllAcs() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Acs />
        </div>
    )
}

export default AllAcs;