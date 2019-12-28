const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
var csv = require("fast-csv");

app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var ws = fs.createWriteStream("my.csv");
const port = 4000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post("/upload", (req, res) => {
  var texJson = req.body.textJson;

  covertJsonToCsv(texJson, datas => {
    res.download(path.join(__dirname, "my.csv"));
  });

  //   res.end();
});

var covertJsonToCsv = function(text, callback) {
  var myObj = JSON.parse(text);
  var keys = Object.keys(myObj);
  keys.pop();
  var datas = getData(myObj, []);
  // console.log(datas);
  datas.unshift(keys);
  //  var data = Object.values(myObj);
  csv.write(datas, { headers: true }).pipe(ws);
  callback(datas);
};

var getData = function(obj, datas) {
  var value = Object.values(obj);
  // console.log(value);
  var children = value[value.length - 1];
  value.pop();
  datas.push(value);

  if (children.length > 0) {
    for (let i = 0; i < children.length; i++) {
      getData(children[i], datas);
    }
  }
  return datas;
};
app.get("/upload", (req, res) => {
  // console.log("get", req.query);
  res.send("ok");
});
