const mongoose = require('mongoose');
module.exports= async function conexionMongo( uri, clientOptions) {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
      // Ensures that the client will close when you finish/error
      await mongoose.disconnect();
      console.log(err);
    }
  }