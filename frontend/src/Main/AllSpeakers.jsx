import Appbar from "./Appbar";
import Speakers from "../Contents/Speakers";

function AllSpeakers() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <Speakers />
        </div>
    )
}

export default AllSpeakers;