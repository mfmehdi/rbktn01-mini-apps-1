const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db");

app.use(express.static("client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// cros  problem
var cors = require("cors");

const port = 4000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors());

app.post("/step", (req, res) => {
  db.addNew(req.body, d => {
    res.send(d.id);
  });
});

app.put("/updateStep", (req, res) => {
  db.update(req.body.id, req.body.data, doc => {
    console.log(doc);
    res.send(doc);
  });
});

app.put("/updateStep2", (req, res) => {
  db.update2(req.body.id, req.body.data, doc => {
    console.log(doc);
    res.send(doc);
  });
});
