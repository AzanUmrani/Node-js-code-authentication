const db = require('./Model/index.js');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');




const app = express();
const server = http.createServer(app); 

// Middleware setup
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true }));


const availabilitySlotRoutes = require('./Routes/availabilitySlotRoutes');
const auth =require("./Routes/authUser")


// app.use('/api/auth', authRouter);
app.use('/api/slots', availabilitySlotRoutes);
app.use('/api/auth' , auth)

app.get('/', (req, res) => {
    res.status(200).json({ status: 200, message: "API's are working" });
});

const PORT =  3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = { server };