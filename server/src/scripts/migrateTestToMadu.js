import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

async function migrateData() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
    console.log('✅ Connected to MongoDB\n');

    const client = mongoose.connection.getClient();
    const sourceDb = client.db('test');
    const targetDb = client.db('madu_db');

    // Collections to migrate
    const collections = ['users', 'articles', 'galleries', 'comments', 'products'];

    console.log('🔄 Migrating data from test → madu_db...\n');

    for (const collName of collections) {
      try {
        const sourceCollection = sourceDb.collection(collName);
        const targetCollection = targetDb.collection(collName);
        
        // Get all documents from source
        const documents = await sourceCollection.find({}).toArray();
        
        if (documents.length === 0) {
          console.log(`⏭️  ${collName}: no data to migrate`);
          continue;
        }

        // Delete existing data in target (optional, change to skip if you want to preserve)
        const deleteResult = await targetCollection.deleteMany({});
        console.log(`🗑️  Cleared ${collName} in madu_db (${deleteResult.deletedCount} deleted)`);

        // Insert all documents
        const insertResult = await targetCollection.insertMany(documents);
        console.log(`✅ Migrated ${collName}: ${insertResult.insertedIds.length} documents`);
      } catch (error) {
        console.error(`❌ Error migrating ${collName}:`, error.message);
      }
    }

    console.log('\n━'.repeat(70));
    console.log('🎉 Migration completed!\n');

    // Verify
    console.log('📊 Verifying madu_db after migration:');
    console.log('━'.repeat(70));
    for (const collName of collections) {
      const collection = targetDb.collection(collName);
      const count = await collection.countDocuments();
      console.log(`${collName}: ${count} documents`);
    }

    mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

migrateData();
