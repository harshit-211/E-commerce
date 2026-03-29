import Appbar from "./Appbar";
import Tvs from "../Contents/Tvs";

function AllTvs() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Tvs />
        </div>
    )
}

export default AllTvs;