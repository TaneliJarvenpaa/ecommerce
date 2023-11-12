import mongoose from "mongoose";


const connectToDb = async () => {
  
    const connectionUrl =
      "mongodb+srv://jarvta:Taneliowns94!@cluster0.nq5spsu.mongodb.net/";
    mongoose
      .connect(connectionUrl)
      .then(() => console.log("connection succesfull to database"))
      .catch((err) => console.error(`Failed to connect ${err}`));
    
};
  


export default connectToDb;
