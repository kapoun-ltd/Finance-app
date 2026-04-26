const lipaNaMpes = async () => {
    const toke = await getAccessToken();

    const Timestamp = new Date().toISOString().replace(/[^0-9]/g, "");

    const res = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
            BusinessShortCode: 174379,
            Password: "[PASSWORD]",
            Timestamp: Timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: 1,
            PartyA: 254700000000,
            PartyB: 174379,
            PhoneNumber: 254700000000,
            CallBackURL: "https://example.com/callback",
            AccountReference: "Test",
            TransactionDesc: "Test",
        },
        {
            headers: {
                Authorization: `Bearer ${toke}`,
            },
        }
    );

    return res.data;
} 