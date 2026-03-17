const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
    stripeCustomerId: String,
    expiresAt: Date,
  },
  instagramAccounts: [{
    username: String,
    password: { type: String, select: false }, // crypté
    isActive: { type: Boolean, default: true },
    lastSync: Date,
  }],
  rules: [{
    trigger: String, // mot-clé
    response: String, // réponse automatique
    platform: { type: String, default: 'instagram' },
  }],
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('User', UserSchema);
