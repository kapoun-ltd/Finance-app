import axios from "axios";
import config from "../../configs/serverConfig.js";
import getAccessToken from "../utils/getAccessToken.js";

const stkPush = async (phone, amount) => {
    try {
        const token = await getAccessToken();

        const timestamp = new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14);

        const password = Buffer.from(
            `${config.safaricom.mpesaShortCode}${config.safaricom.mpesaPasskey}${timestamp}`
        ).toString("base64");

        const payload = {
            BusinessShortCode: config.safaricom.mpesaShortCode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: phone,
            PartyB: config.safaricom.mpesaShortCode,
            PhoneNumber: phone,
            CallBackURL: config.safaricom.mpesaCallbackURL,
            AccountReference: "KapounApp",
            TransactionDesc: "Deposit",
        };

        const baseURL =
            config.safaricom.mpesaEnv === "production"
                ? "https://api.safaricom.co.ke"
                : "https://sandbox.safaricom.co.ke";

        const url = `${baseURL}/mpesa/stkpush/v1/processrequest`;

        const response = await axios.post(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("SERVICE ERROR:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        throw error;
    }
};

export default stkPush;