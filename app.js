const express = require("express");

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("cors")());

app.use("/", require("./routes/notification"));

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`
  )
);