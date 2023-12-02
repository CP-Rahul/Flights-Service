const express = require('express');
const app = express();

const { ServerConfig } = require('./config');

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running on port ${ServerConfig.PORT}`);
})