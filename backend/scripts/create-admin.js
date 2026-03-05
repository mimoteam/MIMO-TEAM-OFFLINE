// scripts/create-admin.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI; // já configurada no seu .env local
const adminDoc = {
  fullName: 'Admin',
  email: 'admin@mimo.team',
  login: 'admin@mimo.team',
  role: 'admin',
  status: 'active',
  passwordHash: '$2b$10$BnJ/CM9AwecZL17kYiYvleEunrDAqs9wJwZGUHImsFzdU2YuShIyy',
  createdAt: new Date('2025-08-29T00:00:00.000Z'),
  updatedAt: new Date('2025-08-29T00:00:00.000Z'),
};

async function main() {
  await mongoose.connect(MONGO_URI, { dbName: 'mimoteam' });
  const UserSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true, sparse: true },
    login: String,
    role: String,
    status: String,
    passwordHash: String,
    createdAt: Date,
    updatedAt: Date,
  }, { collection: 'users' });

  const User = mongoose.model('User', UserSchema);

  await User.updateOne(
    { email: adminDoc.email },
    { $set: adminDoc, $setOnInsert: { createdAt: adminDoc.createdAt } },
    { upsert: true }
  );

  console.log('Admin pronto.');
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
