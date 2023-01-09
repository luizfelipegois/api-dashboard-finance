const express = require('express');
const cors = require('cors');
const databaseConnection = require('./database');
const authRouter = require('./routes/auth');
const accountRouter = require('./routes/account');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/account', accountRouter);

app.listen(process.env.PORT || 3001, databaseConnection());
