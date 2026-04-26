import dotenv from "dotenv";
dotenv.config();

const consumerKey = process.env.SAFARICOM_CONSUMER_KEY;
const consumerSecret = process.env.SAFARICOM_CONSUMER_SECRET;

console.log(consumerKey, consumerSecret);