import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document {
  fistName?: string,
  lastName?: string,
  age?: number,
  email?: string
  fullName(): string
}

const UserSchema = new Schema({
  fistName: String,
  lastName: String,
  age: Number,
  email: String
}, {
  timestamps: true
}
)

UserSchema.methods.fullName = function (): string {
  return this.firstName + ' ' + this.lastName
}

export default model<UserInterface>('User', UserSchema)
