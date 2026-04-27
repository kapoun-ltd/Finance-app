import axios from "axios";
import config from "../../configs/serverConfig.js";

const getAccessToken = async () => {
    try {
        const { consumerKey, consumerSecret, mpesaEnv } = config.safaricom;

        const auth = Buffer.from(
            `${consumerKey}:${consumerSecret}`
        ).toString("base64");

        const baseURL =
            mpesaEnv === "production"
                ? "https://api.safaricom.co.ke"
                : "https://sandbox.safaricom.co.ke";

        const response = await axios.get(
            `${baseURL}/oauth/v1/generate?grant_type=client_credentials`,
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        return response.data.access_token;

    } catch (error) {
        console.error("TOKEN ERROR:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        throw error;
    }
};

export default getAccessToken;