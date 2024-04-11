const mongoose = require ('mongoose');


const test = ()=>{
    try {
    mongoose.connect(
        // "mongodb+srv://SheikhFahad:fahad1234@cluster0.rdgnsyq.mongodb.net/?retryWrites=true&w=majority"
        `${process.env.MONGODB_URI}`
 
    )
    console.log("start server");
    } catch (error) {
        console.log(error)
    }
}

module.exports=test;