const mongoose = require("mongoose");
const mongo_uri= "mongodb://notaditya:0i7CUIUVIPH4ueLw@cluster0-shard-00-00.8jean.mongodb.net:27017,cluster0-shard-00-01.8jean.mongodb.net:27017,cluster0-shard-00-02.8jean.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-xpmuxt-shard-0&authSource=admin&retryWrites=true&w=majority";

exports.connect = () => {
    mongoose
        .connect(mongo_uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindandModify: false,
        })
        .then(() => {
            console.log("Successfully connected to mongo database");
        })
        .catch((error)=>{
            console.log("Error connecting to mongo database");
            console.error(error);
            process.exit(1);
        })
};