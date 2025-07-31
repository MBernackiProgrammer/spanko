const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors({origin: 'http://localhost:5173'}))
app.use(express.json())
app.listen(port, () => {console.log(`App listening on port ${port}`)})

const friendRoutes = require('./Routes/FriendRoutes')
app.use('/friend', friendRoutes)

app.get('/', (req, res) => {res.send(`Backend może działać.`)})