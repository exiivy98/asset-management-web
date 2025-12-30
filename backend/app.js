const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const db = require("./models");
const hpp = require("hpp");
const helmet = require("helmet");
const dotenv = require("dotenv");

const prod = process.env.NODE_ENV === "production";
const passport = require("passport");
const cookie = require("cookie-parser");
const session = require("express-session");

dotenv.config();
db.sequelize.sync({ force: false });
const passportConfig = require("./passport");
const userRouter = require("./routes/user");
const customerRouter = require("./routes/customer");

if (prod) {
  app.use(helmet());
  app.use(hpp());
  app.use(morgan("combined"));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
} else {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

passportConfig();
app.use(cookie(process.env.COOKIE_SECRET));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test GET 요청
app.get("/", (req, res) => {
  res.send("This is backend server port");
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: prod && ".wdfo.co.kr",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/customer", customerRouter);

app.listen(prod ? process.env.PORT : 3085, () => {
  console.log(
    `백엔드 서버 ${prod ? process.env.PORT : 3085}번 포트에서 작동 중`
  );
});
