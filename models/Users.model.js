const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // lastname: { type: String, required: true},
    email: { type: String, required: true },
    // number: { type: Number, required: true },
    password: { type: String, required: true },
    // confirmPassword: { type: String, required: true },
    // status: {type:Boolean, default: false},
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false}],
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);
userSchema.pre("save", function(next){

  var hash = bcrypt.hashSync( this.password, 6);
  this.password = hash;
  next()
})

userSchema.methods.checkPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
