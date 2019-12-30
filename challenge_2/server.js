const express = require("express");
const path = require("path");
// var cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
const fs = require("fs");
var csv = require("fast-csv");

// app.use(cors());
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); // cros  problem

const port = 4000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
var count = 0;

app.post("/upload", (req, res) => {
  var texJson = req.body.textJson;

  covertJsonToCsv(texJson, (ws, datas) => {
    // ws.on("finish", () => {
    //   console.log("finish");
    // });
    //   ws.end();
    console.log("my" + count + ".csv");
    var p = path.join(__dirname, "my" + count + ".csv");

    csv.write(datas, { headers: true }).pipe(ws);
    //fs.writeFileSync("my.csv", datas);

    res.download(p);
    count++;
  });

  //   res.end();
});

var covertJsonToCsv = function(text, callback) {
  var ws = fs.createWriteStream("my" + count + ".csv");
  var myObj = JSON.parse(text);
  var keys = Object.keys(myObj);
  keys.pop();
  var datas = getData(myObj, []);
  // console.log(datas);
  datas.unshift(keys);
  //  var data = Object.values(myObj);
  // csv
  //   .write(datas, { headers: true })
  //   .pipe(ws)
  //   .then(datas => {
  //     callback(datas);
  //   });
  callback(ws, datas);
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
