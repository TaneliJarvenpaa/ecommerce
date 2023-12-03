import mongoose from "mongoose";


const connectToDb = async () => {
  
    const connectionUrl = process.env.NEXT_PUBLIC_MONGODB_URL;
    mongoose
      .connect(connectionUrl)
      .then(() => console.log("connection succesfull to database"))
      .catch((err) => console.error(`Failed to connect ${err}`));
    
};
  


export default connectToDb;
