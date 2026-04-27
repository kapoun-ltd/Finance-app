import config from "../configs/clientConfig.js";


const handlePayment = async () => {
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

export default handlePayment;
