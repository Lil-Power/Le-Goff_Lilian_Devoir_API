const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Le nom est requis"],
    },
    firstname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "L’email est requis"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Le mot de passe est requis"],
    },
  },
  { timestamps: true }
);

// Hash du mot de passe avant save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
