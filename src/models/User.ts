import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// defining the type of the User Schema 
export interface IUser {
    email: string; 
    password: string; 
    _id?: mongoose.Types.ObjectId; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

// now defining the userSchema of type User 
const userSchema = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, unique: true}, 
    }, {timestamps: true}
)

// before saving the user run a pre hook. 
// then check if the password is modified (like for the first time the password is modified)
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); 
    }
    next(); 
})

const User = models?.User || model<IUser>("User", userSchema)
export default User; 