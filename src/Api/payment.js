const handlePayment = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/pay", {
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