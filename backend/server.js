import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import mysql from "mysql";

const app = express();
const PORT = 7000;
const accounts = [];
const users = [];
let userIds = 1;

const secret = "!Backend123";
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mysql",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
  }
});

function generateAccsessToken(userId) {
  return jwt.sign(userId, secret);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secret, (err, userId) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.userId = userId;

    next();
  });
}

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/users", (req, res) => {
  const user = req.body;
  console.log(user);
  user.id = userIds++;
  users.push(user);

  const account = {
    money: "1000000",
    userId: user.id,
  };
  accounts.push(account);
  console.log(users);

  res.statusCode = 200;
  res.send("Good job");
});

// skapa token från user, skicka token till användaren för att de sedan skickas
// tillbacka i nästa request.

app.post("/sessions", (req, res) => {
  const user = req.body;
  console.log(user);
  const dbUser = users.find((u) => u.username == user.username);

  if (dbUser != null && dbUser.password == user.password) {
    const token = generateAccsessToken(dbUser.id);
    console.log(token);
    res.json({ token });
  } else {
    res.status = 401;
    res.json();
  }
});

app.get("/me/accounts", authenticateToken, (req, res) => {
  console.log("userId: ", req.userId);
  const account = accounts.find((ac) => ac.userId == req.userId);
  console.log(account);
  res.json(account);
});

app.listen(PORT, () => {
  console.log("server starts listening on port " + PORT);
});
