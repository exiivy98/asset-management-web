const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');

const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');

db.sequelize.sync({force : false});
const passportConfig = require('./passport');
const userRouter = require('./routes/user');
const customerRouter = require('./routes/customer');


app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
passportConfig();
app.use(cookie('coockiesecret'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Test GET 요청
app.get('/', (req, res) => {
    res.send('This is backend server port');
});

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/customer', customerRouter);

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동 중`)
});