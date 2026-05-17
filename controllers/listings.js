const Listing = require("../models/listing");
const axios = require("axios");


module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.image = {
      filename,
      url,
    };

    // DEFAULT COORDINATES
    let coordinates = [77.2090, 28.6139];

    // GET LOCATION FROM OPENSTREETMAP
    const location = `${req.body.listing.location}, ${req.body.listing.country}`;

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search`,
      {
        params: {
          q: location,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "WanderLust",
        },
      }
    );

    // CHECK IF LOCATION FOUND
    if (response.data.length > 0) {
      coordinates = [
        parseFloat(response.data[0].lon),
        parseFloat(response.data[0].lat),
      ];
    }

    newListing.geometry = {
      type: "Point",
      coordinates: coordinates,
    };

    await newListing.save();

    req.flash("success", "New Listing Created!");

    res.redirect("/listings");

  } catch (err) {
    console.log(err);

    req.flash("error", "Something went wrong while creating listing!");

    res.redirect("/listings");
  }
};
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you trying to edit does not exist!");
    return res.redirect("/listings");
  }

  let imageUrl = listing.image.url;

  imageUrl = imageUrl.replace("/upload", "/upload/w_250,h_160");

  res.render("listings/edit.ejs", { listing, imageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const location = req.body.listing.location;

  let geometry = {
    type: "Point",
    coordinates: [0, 0],
  };

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`,
      {
        headers: {
          "User-Agent": "wanderlust-app",
        },
      }
    );

    const data = response.data[0];

    if (data) {
      geometry = {
        type: "Point",
        coordinates: [
          parseFloat(data.lon),
          parseFloat(data.lat),
        ],
      };
    }
  } catch (err) {
    console.log("Geocoding error:", err.message);
  }

  let updatedListing = await Listing.findByIdAndUpdate(
    id,
    {
      ...req.body.listing,
      geometry,
    },
    { new: true }
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    updatedListing.image = {
      url,
      filename,
    };

    await updatedListing.save();
  }

  req.flash("success", "Listing Updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.filter = async (req, res) => {
  let { id } = req.params;

  let allListings = await Listing.find({
    category: { $all: [id] },
  });

  if (allListings.length != 0) {
    res.locals.success = `Listings Filtered by ${id}!`;

    return res.render("listings/index.ejs", { allListings });
  }

  req.flash("error", `There is no Listing for ${id}!`);

  res.redirect("/listings");
};

module.exports.search = async (req, res) => {
  let input = req.query.q;

  if (!input || input.trim() === "") {
    req.flash("error", "Please enter search query!");
    return res.redirect("/listings");
  }

  input = input.trim();

  let allListings = await Listing.find({
    $or: [
      { title: { $regex: input, $options: "i" } },
      { category: { $regex: input, $options: "i" } },
      { country: { $regex: input, $options: "i" } },
      { location: { $regex: input, $options: "i" } },
    ],
  });

  if (allListings.length > 0) {
    return res.render("listings/index.ejs", { allListings });
  }

  let intValue = parseInt(input);

  if (!isNaN(intValue)) {
    allListings = await Listing.find({
      price: { $lte: intValue },
    });

    if (allListings.length > 0) {
      return res.render("listings/index.ejs", { allListings });
    }
  }

  req.flash("error", "No listings found!");

  res.redirect("/listings");
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
};

module.exports.reserveListing = async (req, res) => {
  let { id } = req.params;

  req.flash("success", "Reservation Details sent to your Email!");

  res.redirect(`/listings/${id}`);
};