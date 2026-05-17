require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongoUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(mongoUrl);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});

    let updatedData = [];

    for (let obj of initData.data) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${obj.location},${obj.country}`,
          {
            headers: {
              "User-Agent": "wanderlust-app",
            },
          }
        );

        const data = response.data[0];

        const { _id, reviews, ...listingData } = obj;

        updatedData.push({
          ...listingData,
          owner: "6a084703368b187fffedeb6e",
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(data.lon),
              parseFloat(data.lat),
            ],
          },
        });

        console.log(`Added: ${obj.location}`);

        // Delay to avoid API rate limit
        await new Promise((resolve) => setTimeout(resolve, 1000));

      } catch (error) {

        console.log(`Failed: ${obj.location}`);

        const { _id, reviews, ...listingData } = obj;

        updatedData.push({
          ...listingData,
          owner: "6a084703368b187fffedeb6e",
                
          geometry: {
            type: "Point",
            coordinates: [0, 0],
          },
        });
      }
    }

    await Listing.insertMany(updatedData);

    console.log("DB is initialized");

  } catch (error) {
    console.error("Error initializing DB:", error);
  }
};

initDB();