# Tujenge Video Sharing Tool

A Node.js-based application for video and resource sharing, designed specifically for educational purposes. The platform enables administrators to upload educational content and track student engagement with videos and resources.

## Features

1. **Video Management**:

   - Secure video upload to AWS S3
   - Video streaming capabilities
   - Track student viewing progress and engagement

2. **Resource Management**:

   - Support for PDF documents and external links
   - Track resource interactions (downloads, views)

3. **User System**:
   - Role-based access (admin/student)
   - Secure authentication using JWT
   - User profiles with cohort tracking

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Storage**: AWS S3
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
src/
├── config/
│   ├── awsConfig.js
│   └── config.js
├── controllers/
│   ├── userController.js
│   ├── videoController.js
│   └── resourceController.js
├── middlewares/
│   ├── authenticate.js
│   ├── adminOnly.js
│   └── multer.js
├── models/
│   ├── index.js
│   ├── userModel.js
│   ├── videoModel.js
│   └── resourceModel.js
├── routes/
│   ├── userRoutes.js
│   ├── videoRoutes.js
│   └── resourceRoutes.js
└── app.js
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- AWS Account with S3 bucket

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HusseinBitambuka/Tujenge-video-sharing-tool.git
cd Tujenge-video-sharing-tool
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in the project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_NAME=tujenge_video_tool_dev
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=postgres

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# AWS Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
```

4. Initialize the database:

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE tujenge_video_tool_dev;
```

5. Start the server:

```bash
npm start
```

## API Endpoints

### Authentication

- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Videos

- `POST /api/videos/upload` - Upload video (Admin only)
- `DELETE /api/videos/:id` - Delete video (Admin only)
- `GET /api/videos` - Get all videos
- `POST /api/videos/track` - Track video interaction

### Resources

- `POST /api/resources/upload` - Upload resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)
- `POST /api/resources/track` - Track resource interaction

## Sample API Requests

### Register User

```bash
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "cohort": "2023",
  "role": "student"
}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john@example.com",
  "password": "password123"
}'
```

## Error Handling

The application includes comprehensive error handling for:

- Authentication failures
- File upload issues
- Database errors
- Invalid requests

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Secure file upload validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
