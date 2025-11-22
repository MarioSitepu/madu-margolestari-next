import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function checkAllDatabases() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    console.log('✅ Connected to MongoDB\n');
    
    // Get native MongoDB client
    const client = mongoose.connection.getClient();
    const admin = client.db('admin').admin();
    
    // List all databases
    const result = await admin.listDatabases();
    
    console.log('📚 All Databases in MongoDB:');
    console.log('━'.repeat(70));
    result.databases.forEach((db, index) => {
      const size = (db.sizeOnDisk / 1024 / 1024).toFixed(2);
      console.log(`${index + 1}. ${db.name} (${size} MB)`);
    });
    
    // Check madu_db
    console.log('\n📊 Collections in madu_db:');
    console.log('━'.repeat(70));
    
    const maduDb = client.db('madu_db');
    const collections = await maduDb.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('(empty - no collections)');
    } else {
      for (const col of collections) {
        const collection = maduDb.collection(col.name);
        const count = await collection.countDocuments();
        console.log(`- ${col.name} (${count} documents)`);
      }
    }
    
    // Check test database too
    console.log('\n📊 Collections in test:');
    console.log('━'.repeat(70));
    
    const testDb = client.db('test');
    const testCollections = await testDb.listCollections().toArray();
    
    if (testCollections.length === 0) {
      console.log('(empty - no collections)');
    } else {
      for (const col of testCollections) {
        const collection = testDb.collection(col.name);
        const count = await collection.countDocuments();
        console.log(`- ${col.name} (${count} documents)`);
      }
    }
    
    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAllDatabases();
