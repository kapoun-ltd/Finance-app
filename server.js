import express from "express";
import cors from "cors";
import supabase from "./src/services/supabase.js"

const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")

  if (error) return res.status(500).json({ error })

  res.json(data)
})



async function validateUserInput(username, password, db) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  const result = await db.query(
    "SELECT * FROM Register WHERE email = $1",
    [username]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid username or password");

  }

  return result.rows[0];
}


app.post("/deposit", async (req, res) => {
  const { amount, account_deposit, deposit_method } = req.body;

  try {
    const result = await supabase
      .from("deposit")
      .insert([{
        amount,
        account_deposit,
        deposit_method
      }])
      .select()

    res.json(result)
  } catch (error) {
    console.error("Error depositing:", error);
    res.status(500).json({ message: "Failed to deposit" });
  }
})

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await validateUserInput(username, password, db);
    res.status(200).json({ message: "Login successful", username });
  } catch (err) {
    res.status(400).json({ message: err.message });

  }
});

app.post("/register", async (req, res) => {
  const { full_name, email, phone_number, password, confirm_password } = req.body;
  console.log("📥 Incoming data:", req.body);

  try {
    const result = await supabase
      .from("registration")
      .insert([{
        full_name,
        email,
        phone_number,
        password,
        confirm_password
      }])
      .select()

    res.json(result)
  } catch (error) {
    console.error("Error depositing:", error);
    res.status(500).json({ message: "Failed to deposit" });
  }
})

app.post("/transactions", async (req, res) => {
  const {
    user_id,
    account_id,
    category_id,
    type,
    amount,
    description,
    transaction_date
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO transactions
       (user_id, account_id, category_id, type, amount, description, transaction_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        user_id,
        account_id,
        category_id,
        type,
        amount,
        description,
        transaction_date
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Failed to add transaction" });
  }
});



app.delete("/transactions/:id", async (req, res) => {
  const id = Number(req.params.id); // 👈 important

  try {
    const result = await db.query(
      "DELETE FROM transactions WHERE id = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});






app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
