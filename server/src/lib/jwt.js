import jwt from 'jsonwebtoken';

// JWT Secret dari environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// JWT Expiration time (7 hari)
const JWT_EXPIRES_IN = '7d';

/**
 * Generate JWT token untuk user
 * @param {string} userId - User ID dari MongoDB
 * @returns {string} JWT token
 */
export const generateToken = (userId) => {
  if (!userId) {
    throw new Error('User ID diperlukan untuk generate token');
  }

  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token payload
 */
export const verifyToken = (token) => {
  if (!token) {
    throw new Error('Token diperlukan');
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token sudah kadaluarsa');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token tidak valid');
    }
    throw error;
  }
};

/**
 * Decode JWT token tanpa verifikasi (untuk debugging)
 * @param {string} token - JWT token
 * @returns {object} Decoded token payload
 */
export const decodeToken = (token) => {
  if (!token) {
    throw new Error('Token diperlukan');
  }
  return jwt.decode(token);
};

/**
 * Get token expiration time
 * @returns {string} Expiration time
 */
export const getTokenExpiration = () => {
  return JWT_EXPIRES_IN;
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
  getTokenExpiration
};

