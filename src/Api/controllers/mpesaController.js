import stkPush from "../../services/mpesaService.js";


export const initiateSTK = async (req, res) => {
    try {
        // 1. Validate body existence
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: "Request body missing"
            });
        }

        const phone = req.body.phone;
        const amount = req.body.amount;

        // 2. Validate fields
        if (!phone || !amount) {
            return res.status(400).json({
                error: "Phone and amount required"
            });
        }

        // 3. Format phone
        const formattedPhone = phone.startsWith("0")
            ? "254" + phone.slice(1)
            : phone;

        // 4. CALL STK PUSH (this was missing!)
        const response = await stkPush(formattedPhone, amount);

        // 5. Return response
        return res.json({
            message: "STK Push sent",
            data: response,
        });

    } catch (error) {
        console.error("STK PUSH ERROR:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });

        return res.status(500).json({
            error: "Failed to initiate STK Push",
        });
    }
};