const express = require("express");
const connectDB = require("./app/utils/db.config");
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true, // Allow cookies to be sent across origins
}));

require("./app/routes/auth.routes.js")(app);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT : ${PORT}`);
});
