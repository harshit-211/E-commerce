// essential things to import 
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;

dotenv.config({
    path : "../../.env"
});

//importing the routes
const acRoute = require('../routes/ac');
const earphoneRoute = require('../routes/earphones');
const headphoneRoute = require('../routes/headphones');
const jacketRoute = require('../routes/jackets');
const jeansRoute = require('../routes/jeans');
const laptopRoute = require('../routes/laptops');
const tvRoute = require('../routes/LED tv');
const phoneRoute = require('../routes/phones');
const refrigeratorRoute = require('../routes/refrigerator');
const shirtRoute = require('../routes/shirts');
const shoesRoute = require('../routes/shoes');
const speakerRoute = require('../routes/speakers');
const tabletRoute = require('../routes/tablets');
const tshirtRoute = require('../routes/tShirts');
const washingMachineRoute = require('../routes/washingMachine');
const watchesRoute = require('../routes/watches');

//using the routes
app.use(cors());
app.use(express.json());
app.use('/',acRoute);
app.use('/',earphoneRoute);
app.use('/',headphoneRoute);
app.use('/',jacketRoute);
app.use('/',jeansRoute);
app.use('/',laptopRoute);
app.use('/',tvRoute);
app.use('/',phoneRoute);
app.use('/',refrigeratorRoute);
app.use('/',shirtRoute);
app.use('/',shoesRoute);
app.use('/',speakerRoute);
app.use('/',tabletRoute);
app.use('/',tshirtRoute);
app.use('/',washingMachineRoute);
app.use('/',watchesRoute);

// connecting to database 
mongoose.connect(process.env.MONGODB_URL, { dbName : "E-commerce" });

// starting the server
app.listen(port, () => {
    console.log(`server working on port ${port}`);
});