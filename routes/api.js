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
        const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=5jxfAncj4_ihkP_lalhQLfghWylLQqZ72f9WiLwVK5sdWSgz7g60GUA_M2VMONylFfG11hNy9psu8bh8rNXQgyyiZFivcijMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHj4gAiIGjE4xL1vv0st3WJABTnVzRDtjQr3Gb7bqgxdBIUHWR6AtyZzfAsHyERlSQ7iJvv3hRGDqDz9-ZsXkcumkXe2Dv-Rztz9Jw9Md8uu&lib=MeBOrW6M7bORH8xoUngEqjWlXADVrvMRU");
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