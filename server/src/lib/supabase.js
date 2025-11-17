import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Peringatan: SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ditemukan di environment variables');
}

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Upload image to Supabase Storage
 * @param {Buffer} imageBuffer - Image buffer data
 * @param {string} fileName - Name for the file (e.g., 'user-123-avatar.jpg')
 * @param {string} bucket - Storage bucket name (default: 'avatars')
 * @returns {Promise<{url: string, path: string}>} Public URL and path of uploaded file
 */
export async function uploadImageToSupabase(imageBuffer, fileName, bucket = 'avatars') {
  if (!supabase) {
    throw new Error('Supabase client tidak dikonfigurasi. Pastikan SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY sudah di-set di .env');
  }

  try {
    // Create bucket if it doesn't exist (optional, can be done manually in Supabase dashboard)
    // For now, we assume the bucket exists

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, imageBuffer, {
        contentType: 'image/jpeg',
        upsert: true // Overwrite if file exists
      });

    if (error) {
      throw new Error(`Gagal upload ke Supabase: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return {
      url: urlData.publicUrl,
      path: data.path
    };
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    throw error;
  }
}

/**
 * Download image from URL
 * @param {string} imageUrl - URL of the image to download
 * @returns {Promise<Buffer>} Image buffer
 */
export async function downloadImageFromUrl(imageUrl) {
  try {
    const axios = (await import('axios')).default;
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 10000 // 10 seconds timeout
    });
    
    return Buffer.from(response.data, 'binary');
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error(`Gagal download gambar dari URL: ${error.message}`);
  }
}

/**
 * Get content type from file extension
 * @param {string} extension - File extension
 * @returns {string} MIME type
 */
function getContentType(extension) {
  const contentTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };
  return contentTypes[extension.toLowerCase()] || 'image/jpeg';
}

/**
 * Resize image to optimal size for avatar
 * @param {Buffer} imageBuffer - Original image buffer
 * @param {number} maxWidth - Maximum width (default: 400)
 * @param {number} maxHeight - Maximum height (default: 400)
 * @param {number} quality - JPEG quality 1-100 (default: 85)
 * @returns {Promise<Buffer>} Resized image buffer
 */
export async function resizeImage(imageBuffer, maxWidth = 400, maxHeight = 400, quality = 85) {
  try {
    // Get image metadata to check format
    let metadata;
    try {
      metadata = await sharp(imageBuffer).metadata();
    } catch (error) {
      // If can't read metadata, try to process as regular image
      console.warn('Tidak bisa membaca metadata gambar, mencoba resize langsung');
      metadata = { format: 'unknown' };
    }
    
    // Handle SVG (sharp can't resize SVG directly, but can convert)
    if (metadata.format === 'svg') {
      try {
        // Convert SVG to PNG first, then resize
        const pngBuffer = await sharp(imageBuffer)
          .png()
          .toBuffer();
        
        return await sharp(pngBuffer)
          .resize(maxWidth, maxHeight, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ 
            quality: quality,
            mozjpeg: true
          })
          .toBuffer();
      } catch (svgError) {
        console.warn('Gagal convert SVG, menggunakan buffer asli');
        return imageBuffer;
      }
    }
    
    // Resize regular images (JPEG, PNG, WebP, GIF, etc.)
    const resizedBuffer = await sharp(imageBuffer)
      .resize(maxWidth, maxHeight, {
        fit: 'cover', // Crop to fill, maintain aspect ratio
        position: 'center' // Center the crop
      })
      .jpeg({ 
        quality: quality,
        mozjpeg: true // Better compression
      })
      .toBuffer();
    
    return resizedBuffer;
  } catch (error) {
    console.error('Error resizing image:', error.message);
    // Return original buffer if resize fails
    return imageBuffer;
  }
}

/**
 * Upload Google profile picture to Supabase
 * @param {string} googlePictureUrl - Google profile picture URL
 * @param {string} userId - User ID for unique filename
 * @param {object} options - Resize options
 * @param {number} options.maxWidth - Maximum width (default: 400)
 * @param {number} options.maxHeight - Maximum height (default: 400)
 * @param {number} options.quality - JPEG quality 1-100 (default: 85)
 * @returns {Promise<string>} Public URL of uploaded image
 */
export async function uploadGoogleAvatarToSupabase(googlePictureUrl, userId, options = {}) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn('Supabase tidak dikonfigurasi, menggunakan URL Google');
      return googlePictureUrl;
    }

    // Download image from Google
    const originalBuffer = await downloadImageFromUrl(googlePictureUrl);
    
    // Resize image to optimal size for avatar
    const { maxWidth = 400, maxHeight = 400, quality = 85 } = options;
    const resizedBuffer = await resizeImage(originalBuffer, maxWidth, maxHeight, quality);
    
    // Always use jpg for resized avatars (better compression)
    const fileName = `user-${userId}-${Date.now()}.jpg`;
    const contentType = 'image/jpeg';
    
    // Log size reduction if significant
    const originalSize = originalBuffer.length;
    const resizedSize = resizedBuffer.length;
    const reduction = ((originalSize - resizedSize) / originalSize * 100).toFixed(1);
    if (reduction > 10) {
      console.log(`Foto profil diresize: ${(originalSize / 1024).toFixed(1)}KB → ${(resizedSize / 1024).toFixed(1)}KB (${reduction}% lebih kecil)`);
    }
    
    // Upload to Supabase with correct content type
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, resizedBuffer, {
        contentType: contentType,
        upsert: true
      });

    if (error) {
      throw new Error(`Gagal upload ke Supabase: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading Google avatar to Supabase:', error);
    // Return original Google URL as fallback
    return googlePictureUrl;
  }
}

export default supabase;

