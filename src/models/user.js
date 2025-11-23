import {Schema, model} from "mongoose";

export const userShema = new Schema({
  username: { type: String, trim: true },
  email: { type: String, retiqured: true, unique: true, trim: true },
  password: { type: String, required: true },
},
  {
    timestamps: true, variosKey: false,
  }
);

userShema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});

userShema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userShema);
