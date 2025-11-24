import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/user.js';

dotenv.config();

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/madu_db');
    console.log('✅ Connected to MongoDB\n');
    
    const users = await User.find({}).select('email name role provider');
    
    console.log('📋 All Users in Database:');
    console.log('━'.repeat(70));
    users.forEach((user, index) => {
      console.log(`${index + 1}. Email: ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Provider: ${user.provider}`);
      console.log('');
    });
    
    console.log('━'.repeat(70));
    console.log(`Total Users: ${users.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

listUsers();
