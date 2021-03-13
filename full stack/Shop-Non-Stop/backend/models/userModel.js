import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    isAdmin: { type: Boolean, required: true,default:false },
    isActive: { type: Boolean, required: true,default:true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User',userSchema)

export default User