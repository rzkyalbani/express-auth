# Express Auth API

Sebuah RESTful API untuk sistem autentikasi yang dibangun dengan Express.js, TypeScript, dan MongoDB. API ini menyediakan fitur registrasi, login, logout, dan manajemen profil pengguna dengan keamanan JWT token.

## 🚀 Fitur

- **Registrasi Pengguna** - Pendaftaran akun baru dengan validasi email unik
- **Login/Logout** - Autentikasi pengguna dengan JWT token
- **Keamanan Password** - Hashing password dengan bcrypt
- **Cookie-based Authentication** - JWT token disimpan dalam HTTP-only cookies
- **Profile Management** - Endpoint untuk melihat profil pengguna yang sedang login
- **Error Handling** - Penanganan error yang konsisten dan informatif
- **TypeScript** - Full TypeScript support untuk type safety

## 🛠️ Tech Stack

- **Backend**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB dengan Mongoose ODM
- **Authentication**: JSON Web Token (JWT)
- **Password Hashing**: bcrypt
- **Development**: ts-node-dev untuk hot reload

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework untuk Node.js
- `mongoose` - MongoDB ODM
- `bcrypt` - Library untuk hashing password
- `jsonwebtoken` - Implementasi JWT untuk Node.js
- `cookie-parser` - Middleware untuk parsing cookies
- `dotenv` - Environment variables loader

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node-dev` - Development server dengan hot reload
- `@types/*` - Type definitions untuk TypeScript
- `prettier` - Code formatter

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- MongoDB (lokal atau cloud)
- npm atau yarn

### Installation

1. **Clone repository**
```bash
git clone https://github.com/rzkyalbani/express-auth.git
cd express-auth
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Buat file `.env` di root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/express-auth
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1d
```

4. **Run development server**
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## 📚 API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Registrasi pengguna baru | ❌ |
| POST | `/auth/login` | Login pengguna | ❌ |
| POST | `/auth/logout` | Logout pengguna | ❌ |
| GET | `/auth/me` | Dapatkan profil pengguna | ✅ |

### API Usage Examples

#### 1. Register User
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "id": "user-id",
  "username": "johndoe",
  "email": "john@example.com"
}
```

#### 2. Login User
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### 3. Get Current User Profile
```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Cookie: jwt=your-jwt-token"
```

#### 4. Logout
```bash
curl -X POST http://localhost:3000/api/v1/auth/logout
```

## 🏗️ Project Structure

```
src/
├── config/
│   ├── config.ts          # Konfigurasi aplikasi
│   └── db.ts              # Koneksi database MongoDB
├── controllers/
│   └── authController.ts  # Controller untuk autentikasi
├── errors/
│   └── responseError.ts   # Custom error class
├── middlewares/
│   ├── authMiddleware.ts  # JWT verification middleware
│   └── errorHandler.ts    # Global error handler
├── models/
│   └── userModel.ts       # User schema dan model
├── routes/
│   ├── authRoutes.ts      # Routes untuk autentikasi
│   └── index.ts           # Main router
├── services/
│   └── authService.ts     # Business logic untuk autentikasi
├── types/
│   └── authType.ts        # TypeScript type definitions
└── index.ts               # Entry point aplikasi
```

## 🔐 Security Features

- **Password Hashing**: Menggunakan bcrypt dengan salt rounds 10
- **JWT Token**: Secure token-based authentication
- **HTTP-only Cookies**: Token JWT disimpan dalam HTTP-only cookies untuk keamanan XSS
- **Environment Variables**: Sensitive data disimpan dalam environment variables
- **Input Validation**: Validasi input pada setiap endpoint
- **Error Handling**: Tidak mengekspos informasi sensitif dalam error messages

## 📝 Available Scripts

```bash
# Development
npm run dev          # Jalankan server development dengan hot reload

# Production
npm run build        # Compile TypeScript ke JavaScript
npm start           # Jalankan production server

# Code Quality
npm run format      # Format kode dengan Prettier
```

## 🧪 Testing

Saat ini proyek belum memiliki test suite. Untuk testing manual, Anda bisa menggunakan:
- **Postman** - Import collection untuk testing API
- **curl** - Command line testing seperti contoh di atas
- **Thunder Client** - VS Code extension untuk API testing

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buat Pull Request

## 📄 License

Project ini menggunakan ISC License.

## 👨‍💻 Author

**rzkyalbani** - [GitHub Profile](https://github.com/rzkyalbani)

---

## 🔧 Environment Variables

Berikut adalah daftar lengkap environment variables yang dibutuhkan:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Port server | 3000 | ❌ |
| `MONGO_URI` | MongoDB connection string | - | ✅ |
| `NODE_ENV` | Environment mode | development | ❌ |
| `JWT_SECRET` | Secret key untuk JWT | - | ✅ |
| `JWT_EXPIRES_IN` | JWT expiration time | 1d | ❌ |

## 🚨 Important Notes

- Pastikan MongoDB server berjalan sebelum menjalankan aplikasi
- JWT_SECRET harus berupa string yang kuat dan unik untuk production
- Untuk production, set NODE_ENV=production untuk mengaktifkan secure cookies
- Default cookie expiration adalah 24 jam

Untuk pertanyaan atau bantuan, silakan buat issue di repository ini.
