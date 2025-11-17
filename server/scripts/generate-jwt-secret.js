#!/usr/bin/env node

/**
 * Script untuk generate JWT Secret Key
 * 
 * Usage:
 *   node scripts/generate-jwt-secret.js
 * 
 * Output: JWT_SECRET yang aman dan random
 */

import crypto from 'crypto';

// Generate random secret key (64 bytes = 512 bits)
const jwtSecret = crypto.randomBytes(64).toString('hex');

console.log('\n✅ JWT Secret Key Generated:\n');
console.log('='.repeat(80));
console.log(jwtSecret);
console.log('='.repeat(80));
console.log('\n📝 Copy secret key di atas dan tambahkan ke file .env:\n');
console.log(`JWT_SECRET=${jwtSecret}\n`);
console.log('⚠️  PENTING: Jangan share secret key ini ke siapapun!\n');

