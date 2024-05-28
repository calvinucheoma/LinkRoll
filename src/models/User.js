import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: Date,
});

export const User = models?.User || model('User', UserSchema);

// MongoDB stores our models in plural, all lowercase form, but we can call them in a singular, capitalized form.
// For example, we have a 'users' model in our database but we call it as 'User' here. Since it exists, any changes
//  we make using this 'User' schema would affect the 'users' model in our database. So we have to define the properties
// in the same way they are listed on our mongoDB database.
