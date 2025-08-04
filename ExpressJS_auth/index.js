const express = require('express');
const cors = require('cors');
const port = 3000;


const https = require("https");
const fs = require("fs");
const key = fs.readFileSync("./ssl/key.pem", "utf-8");
const cert = fs.readFileSync("./ssl/cert.pem","utf-8");

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());

const UserRoutes = require('./controllers/routes/UserRoutes');
app.use('/api', UserRoutes);



app.get('/', (req, res) => {
  res.send('Hello Miłosz!');
});

// app.listen(port);
https.createServer({ key, cert }, app).listen(port);