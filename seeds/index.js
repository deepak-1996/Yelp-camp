
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedhelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 10) + 10;
        const camp = new Campground({
            author: '61ab2bc783251774021acd89',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dflelownp/image/upload/v1639292465/YelpCamp/xs65yhvqgdy5u8qixxbr.jpg',
                    filename: 'YelpCamp/xs65yhvqgdy5u8qixxbr'

                },
                {
                    url: 'https://res.cloudinary.com/dflelownp/image/upload/v1638858873/YelpCamp/u8lemxa4vtate9brrrgn.jpg',
                    filename: 'YelpCamp/u8lemxa4vtate9brrrgn'
                }
            ]
        })
        await camp.save();


    }
}

seedDB().then(() => {
    mongoose.connection.close();
})