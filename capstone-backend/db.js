const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/capstone";


const connectToMongo = () => {
    console.log("connecting to mongo...")
    mongoose.connect(mongoURI).then(()=>{console.log("connected to mongo successfully")});
}

module.exports = connectToMongo;