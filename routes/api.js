const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

router.post("/login", async (req, res) => {
  const { username, roleMode } = req.body;

  try {
    const response = await axios.get(process.env.LOGIN_SCRIPT_URL);
    const { data } = response.data;

    const user = data.find((entry) => entry.Email === username);

    if (user) {
      if (user.Role === roleMode) {
        res.status(200).json({ success: true, message: "Login Berhasil" });
      } else {
        res.status(404).json({ success: false, message: "Role tidak cocok" });
      }
    } else {
      res.status(404).json({ success: false, message: "User tidak ada" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Login gagal" });
  }
});

router.post("/konfirmasi", async (req, res) => {
  const { id, kaLab, ppcAE } = req.body;

  try {
    const requestBody = { id, kaLab, ppcAE };
    const response = await axios.post(process.env.KONFIRMASI_SCRIPT_URL, requestBody);

    if (response.status === 200 && response.data.success) {
      res.status(200).json({ success: true, message: "Konfirmasi berhasil" });
    } else {
      res.status(500).json({ success: false, message: "Konfirmasi gagal" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Konfirmasi gagal" });
  }
});

router.post("/tolak", async (req, res) => {
  try {
    const response = await fetch(process.env.TOLAK_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
