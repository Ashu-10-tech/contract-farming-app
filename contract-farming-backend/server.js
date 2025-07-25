const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tenderRoutes = require('./routes/tenders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/tenders', tenderRoutes);

mongoose.connect(process.env.MONGO_URI)
<<<<<<< HEAD:contract-farming-backend-main/server.js
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => console.error(err));
=======
  .then(() => app.listen(process.env.PORT, () => console.log("Server running")))
  .catch(err => console.log(err));
>>>>>>> 9ac634c6ce492e4944f27b44d93ab41bf4a3e9e3:contract-farming-backend/server.js
