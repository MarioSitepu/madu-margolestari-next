import dotenv from 'dotenv';
import { uploadImageToSupabase } from '../lib/supabase.js';

dotenv.config();

async function testSupabaseConnection() {
  try {
    console.log('🧪 Testing Supabase Connection...\n');

    // Check environment variables
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log('📋 Environment Variables Check:');
    console.log(`✓ SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Not set'}`);
    console.log(`✓ SUPABASE_SERVICE_ROLE_KEY: ${supabaseKey ? '✅ Set' : '❌ Not set'}`);

    if (!supabaseUrl || !supabaseKey) {
      console.error('\n❌ Supabase credentials not found in .env file!');
      process.exit(1);
    }

    // Create a simple test image (1x1 pixel PNG)
    const testImage = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41,
      0x54, 0x08, 0x99, 0x63, 0xF8, 0xCF, 0xC0, 0x00,
      0x00, 0x00, 0x03, 0x00, 0x01, 0x3B, 0xB6, 0xEE,
      0x56, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E,
      0x44, 0xAE, 0x42, 0x60, 0x82
    ]);

    const testFileName = `test-${Date.now()}.png`;
    
    console.log('\n🚀 Attempting to upload test image...');
    console.log(`   File: ${testFileName}`);

    const result = await uploadImageToSupabase(testImage, testFileName, 'test-uploads', 'image/png');

    console.log('\n✅ Supabase Connection Successful!');
    console.log(`\n📝 Upload Result:`);
    console.log(`   Public URL: ${result.url}`);
    console.log(`   Path: ${result.path}`);

    console.log('\n✨ All systems operational!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Supabase Connection Failed!');
    console.error(`\nError: ${error.message}`);
    console.error(`\n💡 Troubleshooting Tips:`);
    console.error(`   1. Verify SUPABASE_URL is correct`);
    console.error(`   2. Verify SUPABASE_SERVICE_ROLE_KEY is correct`);
    console.error(`   3. Check if Supabase project is active`);
    console.error(`   4. Ensure test-uploads bucket exists or can be auto-created`);
    console.error(`   5. Check Supabase project settings and permissions`);
    process.exit(1);
  }
}

testSupabaseConnection();
