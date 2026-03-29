import Appbar from "./Appbar";
import WashingMachine from "../Contents/WashingMachine";

function AllWashingMachines() {
    return (
        <div className = "bg-gray-900 min-h-screen p-4 md:p-8">
            <Appbar />
            <WashingMachine />
        </div>
    )
}

export default AllWashingMachines;