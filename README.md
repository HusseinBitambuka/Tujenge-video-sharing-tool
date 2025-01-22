# Video Streaming and Resource Sharing Application

This project is a **Node.js**-based application for video streaming and resource sharing, designed to provide an educational platform for students. It includes features for uploading videos, PDFs, and links, tracking user interactions with these resources, and analyzing user data to demonstrate machine learning applications.

## Features

1. **Video Management**:

   - Upload and stream videos.
   - Track user interactions: total views, watched duration, completion status, rewatch count.

2. **Resource Management**:

   - Upload PDFs and share links.
   - Track interactions with PDFs and links, such as downloads or clicks.

3. **User Tracking**:

   - Monitor user engagement.
   - Collect data for machine learning experiments.

4. **Authentication and Authorization**:
   - User accounts with first and last names, cohort, and password.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js (Express.js)
- **Database**: PostgreSQL
- **Storage**: AWS S3 for video and PDF storage
- **Deployment**: Dockerized containers

---

## Setup Instructions

### 1. Prerequisites

- Node.js and npm installed.
- PostgreSQL database set up.
- AWS account with S3 bucket configured.

### 2. Clone the Repository

```bash
$ git clone https://github.com/HusseinBitambuka/Tujenge-video-sharing-tool.git
$ cd video-tracking-app
```

### 3. Install Dependencies

```bash
$ npm install
```

### 4. Set Up Environment Variables

Create a `.env` file in the project root with the following keys:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET_NAME=your_bucket_name
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### 5. Initialize the Database

Run the database migrations to set up tables.

```bash
$ npm run migrate
```

### 6. Start the Application

```bash
$ npm start
```

The server will run on `http://localhost:5000` by default.

---

## API Endpoints

### **Authentication**

1. **Register User**  
   `POST /api/auth/register`

   **Payload**:

   ```json
   {
     "firstName": "John",
     "lastName": "Doe",
     "cohort": "Spring 2025",
     "password": "securepassword"
   }
   ```

2. **Login User**  
   `POST /api/auth/login`

   **Payload**:

   ```json
   {
     "cohort": "Spring 2025",
     "password": "securepassword"
   }
   ```

---

### **Video Management**

1. **Upload Video**  
   `POST /api/videos`

   **Payload**:

   ```json
   {
     "title": "Lesson 1",
     "file": <binary>
   }
   ```

2. **Track Video Interaction**  
   `POST /api/videos/interactions`

   **Payload**:

   ```json
   {
     "userId": 1,
     "videoId": 10,
     "watchedDuration": 120,
     "completed": false
   }
   ```

---

### **Resource Management**

1. **Upload PDF**  
   `POST /api/resources/pdf`

   **Payload**:

   ```json
   {
     "title": "Chapter 1",
     "file": <binary>
   }
   ```

2. **Share Link**  
   `POST /api/resources/links`

   **Payload**:

   ```json
   {
     "title": "Data Structures",
     "url": "https://example.com/ds-guide"
   }
   ```

3. **Track Resource Interaction**  
   `POST /api/resources/interactions`

   **Payload**:

   ```json
   {
     "userId": 1,
     "resourceId": 15,
     "resourceType": "pdf",
     "extraData": {
       "downloaded": true
     }
   }
   ```

---

## Future Enhancements

- **Machine Learning Integration**: Analyze user engagement patterns and provide insights.
- **Notifications**: Alert users about new resources or assignments.
- **Live Classes**: Incorporate live video streaming for interactive sessions.

---

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
