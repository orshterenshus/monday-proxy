const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

const MONDAY_TOKEN = process.env.MONDAY_API_TOKEN; // נשמור את הטוקן כסוד

app.post("/monday", async (req, res) => {
  try {
    const result = await axios.post("https://api.monday.com/v2", req.body, {
      headers: {
        Authorization: MONDAY_TOKEN,
        "Content-Type": "application/json",
      },
    });
    res.json(result.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Unknown error" });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on port 3000");
  console.log("TOKEN FROM ENV:", MONDAY_TOKEN);
});

