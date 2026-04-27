import dotenv from "dotenv";
dotenv.config();

const serverConfig = {
    port: process.env.PORT || 5000,

    safaricom: {
        mpesaEnv: process.env.MPESA_ENV,
        mpesaShortCode: process.env.MPESA_SHORTCODE,
        mpesaPasskey: process.env.MPESA_PASSKEY,
        mpesaCallbackURL: process.env.MPESA_CALLBACK_URL,
        consumerKey: process.env.SAFARICOM_CONSUMER_KEY,
        consumerSecret: process.env.SAFARICOM_CONSUMER_SECRET,
    },
};

export default serverConfig;