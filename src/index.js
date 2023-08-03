import mongoose from "mongoose";
//Mongoose is a popular Node.js library used for interacting with MongoDB, a NoSQL database. It provides a convenient and easy-to-use Object Data Modeling (ODM) layer on top of MongoDB, allowing developers to define data models and schemas for their application data.
//Overall, Mongoose provides a higher-level abstraction over MongoDB, making it easier for developers to work with MongoDB in a Node.js environment. It is widely used in building web applications, RESTful APIs, and other projects where MongoDB serves as the underlying database.
import app from "./App.js";
import config from "./Config/index.js";
(  async() => {
    try{
    await mongoose.connect(config.MONGODB_URL);
    //making a database connection and handling the errors of connection
    console.log("DB CONNECTED!");
    // incase if the error is from database refusal error or from express app
    app.on('error',(err) => {
        console.log(err);
        throw err;
    })
    const onlistening = () => {
        console.log(`listening on port ${config.PORT}`);
    }
    app.listen(config.PORT,onlistening);
    }catch(error){
        console.log("error is :",error.message);
        throw error;
    }
} )()