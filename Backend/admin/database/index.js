const mongoose = require("mongoose");
const adminSchemas = new mongoose.Schema({
    username : String,
    password : String
});
const shirtSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const jeanSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const shoesSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const earphoneSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    colour : String,
    type : String,
    batteryLife : Number,
    price : Number,
    quantity : Number,
    image : String
});
const laptopSchemas = new mongoose.Schema({ 
    name : String,
    companyName : String,
    screenSize : String,
    colour : String,
    ram : String,
    storage : String,
    processor : String,
    graphicsCard : String,
    refreshRate : String,
    batteryCapacity : String,
    weight : String,
    operatingSystem : String,
    price : String,
    quantity : Number,
    image : String
});
const tShirtSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const phoneSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : String,
    colour : String,
    ram : String,
    batteryCapacity : String,
    processor : String,
    camera : String,
    storage : String,
    operatingSystem : String,
    price : String,
    quantity : String,
    image : String,
});
const headphoneSchemas = new mongoose.Schema({
    name : String,
    company : String,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const watchSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const tvSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : Number,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const speakerSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const washingMachineSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : String,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const refrigeratorSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : String,
    colour : String,
    star : Number,
    price : Number,
    quantity : Number,
    image : String
});
const jacketSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    size : String,
    colour : String,
    price : Number,
    quantity : Number,
    image : String
});
const acSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    ton : String,
    star : String,
    colour : String,
    price : String,
    quantity : Number,
    image : String
});
const tabletSchemas = new mongoose.Schema({
    name : String,
    companyName : String,
    screenSize : Number,
    colour : String,
    ram : Number,
    storage : Number,
    processor : String,
    display : String,
    camera : String,
    batteryCapacity : Number,
    price : Number,
    quantity : Number,
    image : String
});
const cartSchemas = new mongoose.Schema({
    userId : String,
    items : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                refPath : "items.productType"
            },
            productType : {
                type : String,
                required : true,
                enum : ["Shirts","Jeans","Shoes","Earphones","Laptops","tShirts","Phones","Headphones","Watches","Tv","Speakers","WashingMachine","Refrigerators","Jackets","Ac","Tablets"]
            },
            quantity : Number
        }
    ]
});
const Admin = mongoose.model("Admin", adminSchemas); // the string written in double codes will appear in mongodb compass
const Shirts = mongoose.model("Shirts", shirtSchemas);
const Jeans = mongoose.model("Jeans", jeanSchemas);
const Shoes = mongoose.model("Shoes", shoesSchemas);
const Earphones = mongoose.model("Earphones", earphoneSchemas);
const Laptops = mongoose.model("Laptops", laptopSchemas);
const tShirts = mongoose.model("tShirts", tShirtSchemas);
const Phones = mongoose.model("Phones", phoneSchemas);
const Headphones = mongoose.model("Headphones", headphoneSchemas);
const Watches = mongoose.model("Watches", watchSchemas);
const Tv = mongoose.model("Tv", tvSchemas);
const Speakers = mongoose.model("Speakers", speakerSchemas);
const WashingMachine = mongoose.model("WashingMachine", washingMachineSchemas);
const Refrigerators = mongoose.model("Refrigerators", refrigeratorSchemas);
const Jackets = mongoose.model("Jackets", jacketSchemas);
const Ac = mongoose.model("Ac", acSchemas);
const Tablets = mongoose.model("Tablets", tabletSchemas);
const Cart = mongoose.model("Cart", cartSchemas);
module.exports = {
    Admin,
    Shirts,
    Jeans,
    Shoes,
    Earphones,
    Laptops,
    tShirts,
    Phones,
    Headphones,
    Watches,
    Tv,
    Speakers,
    WashingMachine,
    Refrigerators,
    Jackets,
    Ac,
    Tablets,
    Cart
};