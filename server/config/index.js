/**
 * Server Configuration
 * 
 * Centralized configuration for server environment variables
 * This ensures all parts of the application use consistent configuration
 */

module.exports = {
    // Server Configuration
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',

    // Database Configuration
    mongodbUri: process.env.MONGODB_URI,

    // CORS Configuration
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

    // Cloudinary Configuration
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
    },

    // PayPal Configuration
    paypal: {
        mode: process.env.PAYPAL_MODE || 'sandbox',
        clientId: process.env.PAYPAL_CLIENT_ID,
        clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    },

    // JWT Configuration
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },

    // Session Configuration
    session: {
        secret: process.env.SESSION_SECRET,
    },
};
