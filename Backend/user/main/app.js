const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3001;

dotenv.config({
    path : "../../.env"
});

const userSignupRoute = require("../routes/signup");
const userSigninRoute = require("../routes/signin");
const userAcRoute = require("../routes/getAcs");
const userEarphoneRoute = require("../routes/getEarphones");
const userHeadphoneRoute = require("../routes/getHeadphones");
const userJacketRoute = require("../routes/getJackets");
const userJeanRoute = require("../routes/getJeans");
const userLaptopRoute = require("../routes/getLaptops");
const userTvRoute = require("../routes/getTvs");
const userPhonesRoute = require("../routes/getPhones");
const userRefrigeratorRoute = require("../routes/getRefrigerator");
const userShirtsRoute = require("../routes/getShirts");
const userShoesRoute = require("../routes/getShoes");
const userSpeakerRoute = require("../routes/getSpeakers");
const userTabletRoute = require("../routes/getTablets");
const userTShirtRoute = require("../routes/getTShirts");
const userWashingMachineRoute = require("../routes/getWashingMachine");
const userWatchesRoute = require("../routes/getWatches");
const userCartRoute = require("../routes/getCart");
const userIncreaseRoute = require("../routes/increaseQuantity");
const userDecreaseRoute = require("../routes/decreaseQuantity");
const userDeleteItemRoute = require("../routes/deleteItem");
const userPaymentRoute = require("../routes/payment");

app.use(cors({
    origin : "*"
}));
app.use(express.json());
app.use("/", userSignupRoute);
app.use("/", userSigninRoute);
app.use("/", userAcRoute);
app.use("/", userEarphoneRoute);
app.use("/", userHeadphoneRoute);
app.use("/", userJacketRoute);
app.use("/", userJeanRoute);
app.use("/", userLaptopRoute);
app.use("/", userTvRoute);
app.use("/", userPhonesRoute);
app.use("/", userRefrigeratorRoute);
app.use("/", userShirtsRoute);
app.use("/", userShoesRoute);
app.use("/", userSpeakerRoute);
app.use("/", userTabletRoute);
app.use("/", userTShirtRoute);
app.use("/", userWashingMachineRoute);
app.use("/", userWatchesRoute);
app.use("/", userCartRoute);
app.use("/", userIncreaseRoute);
app.use("/", userDecreaseRoute);
app.use("/", userDeleteItemRoute);
app.use("/", userPaymentRoute);

mongoose.connect(process.env.MONGODB_URL, { dbName : "E-commerce" });

app.listen(port, () => {
    console.log(`Server is working on ${port}`);
});