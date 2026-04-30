import express from "express";
import cors from "cors";
import supabase from "./src/services/supabase.js";
import mpesaRoutes from "./src/Routes/mpesaRoutes.js";
import stkPush from "./src/services/mpesaService.js";

const app = express(); // ✅ CREATE FIRST

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors({
    origin: "https://your-frontend.vercel.app", // change later
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/mpesa", mpesaRoutes);

app.post("/api/pay", async (req, res) => {
    try {
        const { phone, amount } = req.body;

        const result = await stkPush(phone, amount);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("PAY ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// ✅ Health check (VERY useful for Render)
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// ✅ Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});