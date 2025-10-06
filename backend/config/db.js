import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://kenny:Sekhoela111@cluster0.vagr5jt.mongodb.net/food-delivery').then(()=>console.log('DB Connected'));
}