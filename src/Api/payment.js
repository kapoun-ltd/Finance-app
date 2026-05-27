import config from "../configs/clientConfig.js";


export const handlePayment = async () => {
    try {
        const res = await fetch(`${config.app.baseURL}/api/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: "2547XXXXXXXX",
                amount: 1,
            }),
        });

        const data = await res.json();

        if (data.success) {
            alert("Check your phone 📱");
        }
    } catch (err) {
        console.error(err);
    }
};

export const handleSchedulePayment = async (paymentData) => {
    try {
        const res = await fetch(`${config.app.baseURL}/api/schedule-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        toast.error("Failed to schedule payment. Please try again.");
        return null;
    }
};



