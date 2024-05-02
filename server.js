const express = require('express');
const cors = require('cors');
const http = require("http");
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const server = http.createServer(app); // Création du serveur HTTP

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`Server up and running on http://localhost:${PORT}`));

require('./configurations/sql.config');
const User = require('./models/users.model');

app.use("/api/auth", require("./routes/auth.route"));


