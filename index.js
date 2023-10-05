const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
      res.status(200).json({
      title: "Express Testing",
      message: "The app is working properly!",
    });
  });

// app.post('/login', async (req, res) => {
//     const { username } = req.body;

//     try {
//         // Mengambil data email yang diizinkan dari API
//         // Disarankan menggunakan Axios untuk fetching data
//         const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=5jxfAncj4_ihkP_lalhQLfghWylLQqZ72f9WiLwVK5sdWSgz7g60GUA_M2VMONylFfG11hNy9psu8bh8rNXQgyyiZFivcijMm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHj4gAiIGjE4xL1vv0st3WJABTnVzRDtjQr3Gb7bqgxdBIUHWR6AtyZzfAsHyERlSQ7iJvv3hRGDqDz9-ZsXkcumkXe2Dv-Rztz9Jw9Md8uu&lib=MeBOrW6M7bORH8xoUngEqjWlXADVrvMRU");
//         const data = response.data;

//         // Mengecek apakah pengguna ada dalam daftar yang diizinkan
//         const user = data.data.find(user => user.Email === username);

//         if (user) {
//             res.status(200).json({ success: true, message: 'Login Berhasil' });
//         } else {
//             res.status(404).json({ success: false, message: 'User tidak ada' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'Login gagal' });
//     }
// });

// app.post('/konfirmasi', async (req, res) => {
//     const { id, kaLab, ppcAE } = req.body;

//     try {
//         // Membuat objek yang akan dikirimkan ke API Google Apps Script
//         const requestBody = {
//             id: id,
//             kaLab: kaLab,
//             ppcAE: ppcAE
//         };

//         // Melakukan permintaan POST ke API Google Apps Script
//         const response = await axios.post("https://script.google.com/macros/s/AKfycby9J_TwNBu2Zuaa69U8IrkCYpScRF_CnaP-R2gP5Pl2giNQ9JN6jFT7MfHMHACUlmLSTg/exec", requestBody);

//         // Memeriksa respons dari API Google Apps Script
//         if (response.status === 200 && response.data.success) {
//             res.status(200).json({ success: true, message: 'Konfirmasi berhasil' });
//         } else {
//             res.status(500).json({ success: false, message: 'Konfirmasi gagal' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'Konfirmasi gagal' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
