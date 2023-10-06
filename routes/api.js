const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

router.post('/login', async (req, res) => {
    const { username } = req.body;

    try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbzjrSB5d2fXQqzZ4zEXO3DBcebV4bIrpjTAu7YOySXRzkKWzLs5Co5iv1tTvmtAnkmF/exec");
        const data = response.data;

        const user = data.data.find(user => user.Email === username);

        if (user) {
            res.status(200).json({ success: true, message: 'Login Berhasil' });
        } else {
            res.status(404).json({ success: false, message: 'User tidak ada' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Login gagal' });
    }
});

router.post('/konfirmasi', async (req, res) => {
    const { id, kaLab, ppcAE } = req.body;

    try {
        const requestBody = {
            id: id,
            kaLab: kaLab,
            ppcAE: ppcAE
        };
        const response = await axios.post("https://script.google.com/macros/s/AKfycby-CsqtaPza5rlpxO8Bpcem4peBxv19AmqjJMMZHKR3E0rFN2aumKexSqjT9PwLRm99/exec", requestBody);

        if (response.status === 200 && response.data.success) {
            res.status(200).json({ success: true, message: 'Konfirmasi berhasil' });
        } else {
            res.status(500).json({ success: false, message: 'Konfirmasi gagal' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Konfirmasi gagal' });
    }
});

module.exports = router;