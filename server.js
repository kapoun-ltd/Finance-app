import express from "express";
import cors from "cors";
import supabase from "./src/services/supabase.js"

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/callback", (req, res) => {
    console.log("M-Pesa Callback:", req.body);

    // Save transaction in DB here

    res.json({ message: "Received" });
});



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
