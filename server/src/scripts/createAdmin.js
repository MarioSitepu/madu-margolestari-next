import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    // Handle --key=value format
    if (arg.includes('=')) {
      const [key, ...valueParts] = arg.split('=');
      const value = valueParts.join('=').replace(/^["']|["']$/g, '');
      
      if (key === '--email') {
        config.email = value;
      } else if (key === '--password') {
        config.password = value;
      } else if (key === '--name') {
        config.name = value;
      }
    }
    // Handle --key value format
    else if (arg.startsWith('--')) {
      const key = arg;
      const nextArg = args[i + 1];
      
      if (key === '--email' && nextArg && !nextArg.startsWith('--')) {
        config.email = nextArg;
        i++;
      } else if (key === '--password' && nextArg && !nextArg.startsWith('--')) {
        config.password = nextArg;
        i++;
      } else if (key === '--name' && nextArg && !nextArg.startsWith('--')) {
        // Handle quoted names with spaces
        let name = nextArg;
        i++;
        
        // If name starts with quote, collect until closing quote
        if ((name.startsWith('"') || name.startsWith("'")) && !name.endsWith(name[0])) {
          const quote = name[0];
          name = name.slice(1);
          while (i < args.length - 1) {
            i++;
            name += ' ' + args[i];
            if (args[i].endsWith(quote)) {
              name = name.slice(0, -1);
              break;
            }
          }
        } else {
          // Remove quotes if present
          name = name.replace(/^["']|["']$/g, '');
        }
        config.name = name;
      }
    }
  }
  
  return config;
}

// Function to prompt for password securely
function promptPassword(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    const stdout = process.stdout;
    
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    let password = '';
    stdout.write(question);
    
    const onData = (char) => {
      char = char.toString();
      
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004': // Ctrl+D
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener('data', onData);
          stdout.write('\n');
          resolve(password);
          break;
        case '\u0003': // Ctrl+C
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener('data', onData);
          process.exit();
          break;
        case '\u007f': // Backspace
        case '\b':
          if (password.length > 0) {
            password = password.slice(0, -1);
            stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          stdout.write('*');
          break;
      }
    };
    
    stdin.on('data', onData);
  });
}

// Function to prompt for input
function promptInput(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Debug: log all process.argv to see what we're getting
if (process.argv.length > 2) {
  console.log('Debug - process.argv:', process.argv);
}

const args = parseArgs();

// Debug: log parsed arguments
if (Object.keys(args).length > 0) {
  console.log('Debug - Parsed arguments:', args);
}

const ADMIN_EMAIL = args.email || process.env.ADMIN_EMAIL || 'admin@marles.com';
const ADMIN_PASSWORD = args.password || process.env.ADMIN_PASSWORD;
const ADMIN_NAME = args.name || process.env.ADMIN_NAME || 'Admin Marles';

async function createAdmin() {
  try {
    let email = ADMIN_EMAIL;
    let password = ADMIN_PASSWORD;
    let name = ADMIN_NAME;

    // If password not provided, prompt for it
    if (!password) {
      console.log('\n📝 Admin User Setup\n');
      console.log('Enter admin credentials (or press Enter to use defaults):\n');
      
      const inputEmail = await promptInput(`Email [${email}]: `);
      if (inputEmail.trim()) {
        email = inputEmail.trim();
      }

      password = await promptPassword('Password: ');
      if (!password) {
        console.log('❌ Password is required!');
        process.exit(1);
      }

      const confirmPassword = await promptPassword('Confirm Password: ');
      if (password !== confirmPassword) {
        console.log('❌ Passwords do not match!');
        process.exit(1);
      }

      const inputName = await promptInput(`Name [${name}]: `);
      if (inputName.trim()) {
        name = inputName.trim();
      }
    }

    // Validate password
    if (password.length < 6) {
      console.log('❌ Password must be at least 6 characters long!');
      process.exit(1);
    }

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/marles';
    await mongoose.connect(mongoUri);
    console.log('\n✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log(`\nℹ️  Admin user already exists: ${email}`);
        
        // Ask if user wants to update password
        const update = await promptInput('Do you want to update the password? (y/n): ');
        if (update.toLowerCase() === 'y' || update.toLowerCase() === 'yes') {
          const hashedPassword = await bcrypt.hash(password, 10);
          existingAdmin.password = hashedPassword;
          existingAdmin.name = name;
          await existingAdmin.save();
          console.log('✅ Admin password updated successfully!');
          await mongoose.disconnect();
          return;
        } else {
          console.log('   To update password, run the script again with --password flag.');
          await mongoose.disconnect();
          return;
        }
      } else {
        // Update existing user to admin
        const hashedPassword = await bcrypt.hash(password, 10);
        existingAdmin.password = hashedPassword;
        existingAdmin.role = 'admin';
        existingAdmin.name = name;
        await existingAdmin.save();
        console.log(`✅ Updated existing user to admin: ${email}`);
        await mongoose.disconnect();
        return;
      }
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      email,
      name,
      password: hashedPassword,
      role: 'admin',
      provider: 'local',
      isVerified: true
    });

    await admin.save();
    console.log('\n✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('🔑 Password: ******** (hidden)');
    console.log('\n⚠️  IMPORTANT: Keep your password secure!');

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

