const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const https = require("https");
const fs = require("fs");
const key = fs.readFileSync("./ssl/key.pem", "utf-8");
const cert = fs.readFileSync("./ssl/cert.pem","utf-8");

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());
app.use(cookieParser())

const SleepRoutes = require('./controllers/routes/SleepRoutes');
app.use('/api', SleepRoutes);


const port = 3001;


https.createServer({ key, cert }, app).listen(port);