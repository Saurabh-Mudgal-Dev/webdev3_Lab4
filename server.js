require('dotenv').config();
const express = require('express');
const http = require('http');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);

require('./socket/chat')(server);

app.use(express.json());

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/protected'));
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server };
