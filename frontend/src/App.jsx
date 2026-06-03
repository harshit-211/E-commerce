import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Main/Signup";
import Signin from "./Main/Signin";
import Home from "./Main/Home";
import { Toaster } from "./components/ui/sonner";
import AllSmartphones from "./Main/AllSmartphones";
import AllLaptops from "./Main/AllLaptops";
import AllAcs from "./Main/AllAcs";
import AllEarphones from "./Main/AllEarphones";
import AllHeadphones from "./Main/AllHeadphones";
import AllJackets from "./Main/AllJackets";
import AllJeans from "./Main/AllJeans";
import AllRefrigerators from "./Main/AllRefrigerators";
import AllShirts from "./Main/AllShirts";
import AllShoes from "./Main/AllShoes";
import AllSpeakers from "./Main/AllSpeakers";
import AllTablets from "./Main/AllTablets";
import AllTShirts from "./Main/AllTShirts";
import AllTvs from "./Main/AllTvs";
import AllWashingMachines from "./Main/AllWashingMachines";
import AllWatches from "./Main/AllWatches";
import Cart from "./Main/Cart";
import Orders from "./Main/Orders";
import Profile from "./Main/Profile";
import SmartphonesDetails from "./Details/SmartphonesDetails";
import LaptopDetails from "./Details/LaptopDetails";
import AcDetails from "./Details/AcDetails";
import EarphoneDetails from "./Details/EarphoneDetails";
import HeadphoneDetails from "./Details/HeadphoneDetails";
import JacketDetails from "./Details/JacketDetails";
import JeanDetails from "./Details/JeanDetails";
import RefrigeratorsDetails from "./Details/RefrigeratorsDetails";
import ShirtDetails from "./Details/ShirtDetails";
import ShoesDetails from "./Details/ShoesDetails";
import SpeakerDetails from "./Details/SpeakerDetails";
import TabletDetails from "./Details/TabletDetails";
import TShirtDetails from "./Details/TShirtDetails";
import TvDetails from "./Details/TvDetails";
import WashingMachineDetails from "./Details/WashingMachineDetails";
import WatchesDetails from "./Details/WatchesDetails";

function App() {

  return (
    <>  
      <Toaster/>
        <Router>
          <Routes>
            <Route path = "/home" element = {<Home />} />
            <Route path = "/" element = {<Signup />} />
            <Route path = "/signin" element = {<Signin />} />
            <Route path = "/all/smartphones" element = {<AllSmartphones />} />
            <Route path = "/all/laptops" element = {<AllLaptops />} />
            <Route path = "/all/acs" element = {<AllAcs />} />
            <Route path = "/all/earphones" element = {<AllEarphones />} />
            <Route path = "/all/headphones" element = {<AllHeadphones />} />
            <Route path = "/all/jackets" element = {<AllJackets />} />
            <Route path = "/all/jeans" element = {<AllJeans />} />
            <Route path = "/all/shirts" element = {<AllShirts />} />
            <Route path = "/all/refrigerators" element = {<AllRefrigerators />} />
            <Route path = "/all/shoes" element = {<AllShoes />} />
            <Route path = "/all/speakers" element = {<AllSpeakers />} />
            <Route path = "/all/tablets" element = {<AllTablets />} />
            <Route path = "/all/tshirts" element = {<AllTShirts />} />
            <Route path = "/all/tvs" element = {<AllTvs />} />
            <Route path = "/all/washingMachines" element = {<AllWashingMachines />} />
            <Route path = "/all/watches" element = {<AllWatches />} />
            <Route path = "/cart" element = {<Cart />} />
            <Route path = "/orders" element = {<Orders />} />
            <Route path = "/profile" element = {<Profile />} />
            <Route path = "/phone/details/:id" element = {<SmartphonesDetails />} />
            <Route path = "/laptop/details/:id" element = {<LaptopDetails />} />
            <Route path = "/ac/details/:id" element = {<AcDetails />} />
            <Route path = "/earphone/details/:id" element = {<EarphoneDetails />} />
            <Route path = "/headphone/details/:id" element = {<HeadphoneDetails />} />
            <Route path = "jacket/details/:id" element = {<JacketDetails />} />
            <Route path = "/jean/details/:id" element = {<JeanDetails />} />
            <Route path = "/refrigerator/details/:id" element = {<RefrigeratorsDetails />} />
            <Route path = "/shirt/details/:id" element = {<ShirtDetails />} />
            <Route path = "/shoes/details/:id" element = {<ShoesDetails />} />
            <Route path = "/speaker/details/:id" element = {<SpeakerDetails />} />
            <Route path = "/tablet/details/:id" element = {<TabletDetails />} />
            <Route path = "/tshirt/details/:id" element = {<TShirtDetails />} />
            <Route path = "/tv/details/:id" element = {<TvDetails />} />
            <Route path = "/washingMachine/details/:id" element = {<WashingMachineDetails />} />
            <Route path = "/watches/details/:id" element = {<WatchesDetails />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;