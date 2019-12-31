const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/checkout");

let schema = mongoose.Schema({
  // id: { type: Number, required: true, unique: true },
  name: String,
  email: String,
  password: String,
  adresse: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    zipCode: String
  },
  creditCard: Number,
  expirydate: String,
  ccv: Number,
  billingZc: String
});

let Check = mongoose.model("check", schema);

var save = function(data, callback) {
  var newData = new Check(data);
  newData.save((err, da) => {
    if (err) console.log(err);
    else callback(da);
  });
};

var update = function(id, data, callback) {
  Check.findOneAndUpdate({ _id: id }, { adresse: data }, { new: true }).then(
    doc => {
      //console.log("db===>", doc);
      callback(doc);
    }
  );
};

var update2 = function(id, data, callback) {
  console.log("data2===>", data);

  Check.findOneAndUpdate({ _id: id }, data, { new: true }).then(doc => {
    console.log("db2===>", doc);
    callback(doc);
  });
};
// Check.findById(id)
//   .then(model => {
//     model.updateOne(model, { adresse: data });
//   })
//   .then(model => {
//     console.log(model);
//     // model.save().then(model => {
//     //   return model;
//     // });
//   });

module.exports.addNew = save;
module.exports.update = update;
module.exports.update2 = update2;
