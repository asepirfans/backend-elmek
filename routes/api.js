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
        const response = await axios.get("https://script.google.com/macros/s/AKfycbxjZxeVGfuwuT3jCgaqKhmlOZd9lvIps8VPKW2NkujTQHLuj7uAVLZ47xuXq3cupA_Abw/exec");
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
        const response = await axios.post("https://script.google.com/macros/s/AKfycby9J_TwNBu2Zuaa69U8IrkCYpScRF_CnaP-R2gP5Pl2giNQ9JN6jFT7MfHMHACUlmLSTg/exec", requestBody);

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