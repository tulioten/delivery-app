import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
    required: true,
  },
})

const User = models?.User || model('User', UserSchema)

export default User
