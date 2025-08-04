const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

dotenv.config();
const app = express();

app.use(cors({
  origin: '*', // or your Netlify domain for stricter security
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(4000, () => console.log('Server running on port 4000')))
    .catch(err => console.error(err));

    app.get('/', (req, res) => {
    res.send('Wellness Hub Backend is running');
}
);