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
   - Admin accounts managed through database seeding

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Storage**: AWS S3
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
project/
├── client/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── auth.css
│   │   ├── js/
│   │   │   ├── auth.js
│   │   │   ├── login.js
│   │   │   ├── register.js
│   │   │   ├── videos.js
│   │   │   └── resources.js
│   │   └── img/
│   ├── pages/
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── videos.html
│   │   └── resources.html
│   └── index.html
└── server/
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── models/
    │   └── routes/
    ├── scripts/
    │   └── createAdmin.js
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

5. Create admin user:

```bash
# Run the admin creation script
node scripts/createAdmin.js
```

6. Start the server:

```bash
npm start
```

7. Open the client:

- Navigate to the client directory
- Open index.html in a web browser or use Live Server

## API Endpoints

### Authentication

- `POST /api/users/register` - Register new user (students only)
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

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Secure file upload validation
- Admin accounts managed through database seeding only
- Input validation and sanitization
- CORS protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
