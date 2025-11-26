# E-Commerce Server API

Backend API server for MERN E-Commerce application built with Express.js, MongoDB, and Node.js.

## Features

- 🔐 Authentication & Authorization
- 🛍️ Product Management (Admin)
- 🛒 Shopping Cart
- 📦 Order Management
- 💳 PayPal Payment Integration
- 📍 Address Management
- 🔍 Product Search
- ⭐ Product Reviews
- 🖼️ Image Upload (Cloudinary)
- 🎨 Featured Products

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **Payment**: PayPal REST SDK
- **File Upload**: Cloudinary, Multer
- **CORS**: cors
- **Environment**: dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account
- PayPal Developer account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your credentials:
   - MongoDB connection string
   - Cloudinary credentials
   - PayPal credentials
   - Client URL for CORS

4. **Run the server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## Environment Variables

See `.env.example` for all required environment variables.

Required variables:
- `MONGODB_URI` - MongoDB connection string
- `CLIENT_URL` - Frontend URL for CORS
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `PAYPAL_CLIENT_ID` - PayPal client ID
- `PAYPAL_CLIENT_SECRET` - PayPal client secret

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-auth` - Check authentication status

### Admin - Products
- `POST /api/admin/products/add` - Add new product
- `GET /api/admin/products/get` - Get all products
- `PUT /api/admin/products/edit/:id` - Update product
- `DELETE /api/admin/products/delete/:id` - Delete product
- `POST /api/admin/products/upload-image` - Upload product image

### Admin - Orders
- `GET /api/admin/orders/get` - Get all orders
- `GET /api/admin/orders/details/:id` - Get order details
- `PUT /api/admin/orders/update/:id` - Update order status

### Shop - Products
- `GET /api/shop/products/get` - Get filtered products
- `GET /api/shop/products/get/:id` - Get product details

### Shop - Cart
- `POST /api/shop/cart/add` - Add to cart
- `GET /api/shop/cart/get/:userId` - Get user cart
- `PUT /api/shop/cart/update-cart` - Update cart item
- `DELETE /api/shop/cart/:userId/:productId` - Remove from cart

### Shop - Address
- `POST /api/shop/address/add` - Add new address
- `GET /api/shop/address/get/:userId` - Get user addresses
- `PUT /api/shop/address/update/:userId/:addressId` - Update address
- `DELETE /api/shop/address/delete/:userId/:addressId` - Delete address

### Shop - Orders
- `POST /api/shop/order/create` - Create new order
- `POST /api/shop/order/capture` - Capture PayPal payment
- `GET /api/shop/order/list/:userId` - Get user orders
- `GET /api/shop/order/details/:id` - Get order details

### Shop - Search & Reviews
- `GET /api/shop/search/:keyword` - Search products
- `POST /api/shop/review/add` - Add product review
- `GET /api/shop/review/:id` - Get product reviews

### Common
- `GET /api/common/feature/get` - Get featured images
- `POST /api/common/feature/add` - Add featured image
- `GET /api/health` - Health check endpoint

## Deployment

### Vercel Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
vercel --prod
```

### Other Platforms

The server can be deployed to:
- Heroku
- Railway
- Render
- AWS
- DigitalOcean

Make sure to set all environment variables in your hosting platform.

## Project Structure

```
server/
├── api/              # Vercel serverless entry point
├── config/           # Configuration files
├── controllers/      # Route controllers
├── helpers/          # Helper functions (Cloudinary, PayPal)
├── models/           # Mongoose models
├── routes/           # API routes
├── .env              # Environment variables (not in git)
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── package.json      # Dependencies and scripts
├── server.js         # Main server file
└── vercel.json       # Vercel configuration
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run prod` - Start production server with NODE_ENV=production

## Security

- Environment variables for sensitive data
- CORS configuration
- Cookie-based authentication
- Bcrypt password hashing
- JWT token authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For issues and questions, please open an issue in the repository.
