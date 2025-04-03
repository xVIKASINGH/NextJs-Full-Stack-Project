import mongoose from "mongoose";

type ConnectionObject={
    isConnected?:number
}

const connection:ConnectionObject={}


async function ConnecttoDb(): Promise<void>{
    if(connection.isConnected){

    }
    try {
      const DB=  await mongoose.connect(process.env.MONGO_URI || " ",{});
     connection.isConnected=DB.connections[0].readyState

        console.log("Db connected Successfully")
    } catch (error) {

        console.log("Db connection failed")
        process.exit(1)

    }
}

export default ConnecttoDb;