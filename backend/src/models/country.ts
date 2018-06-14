import mongoose from "mongoose";

export type CountryModel = mongoose.Document & {
  name: string
};

const CountrySchema = new mongoose.Schema({
  name: String
}, { timestamps: true });



const Country: mongoose.Model<CountryModel> = mongoose.model<CountryModel>("Country", CountrySchema);
export default Country;
