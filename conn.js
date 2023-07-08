const mongoose = require('mongoose');
const config = require('./db');

mongoose
    .connect(config.DB, { useNewUrlParser: true })
    .then(() => {
        console.log('Database is Connected');
    })
    .catch((err) => {
        console.log('err_db_conn', err);
    });
