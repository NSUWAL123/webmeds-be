const cloudinary = require("cloudinary").v2

cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: 'droaizhlu',
    api_key: '684727327341454',
    api_secret: 'NF_BGbvOa83QUnqCJUOHveUeNzU',
    secure: true
});

module.exports = cloudinary;

