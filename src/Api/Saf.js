import axios from "axios";

const consumerKey = process.env.SAFARICOM_CONSUMER_KEY;
const consumerSecret = process.env.SAFARICOM_CONSUMER_SECRET;

const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

const getAccessToken = async () => {
    const res = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        }
    );

    return res.data.access_token;
};