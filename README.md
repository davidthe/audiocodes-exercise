# AudioCodes Exercise

- [x] Create an online DB
- [x] Create backend service to fetch from DB
- [x] Create login screen with user/password
- [x] Show dashboard page to show data
- [x] Report Health Issue
- [x] Allow Running history
- [ ] deploy client and server

This project is a full-stack application that provides user authentication, health metrics analysis, and file handling functionalities. The application is built using Angular for the frontend and Node.js for the backend.

## Features

- User Authentication
  - Login with predefined credentials (`myUser`/`myPass`)
  - JWT-based authentication
  - Account lockout after 3 consecutive failed login attempts
- User Dashboard
  - List of users with expandable details
  - Displays user ID, age, height, weight, BMI, and heart rate data
  - Heart rate status indicators (sleeping, awake, workout)
  - Real-time heart rate status display
- Report Health Issue
  - Chained dropdowns to report specific health issues
  - Request submission feedback
- Running History
  - CSV file upload with progress bar
  - CSV to JSON conversion and storage

## Installation

### Prerequisites

- Node.js
- Angular CLI

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/davidthe/audiocodes-exercise.git
   cd audiocodes-exercise/server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file and add your RestDB API key:

   ```env
   RESTDB_API_KEY=your_api_key
   ```

4. Start the server:

   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```sh
   cd ../client/health-app
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   ng serve
   ```

4. Access the application at `http://localhost:4200`.

### Running the Application

1. Start the backend server (`localhost:3000`).
2. Start the frontend application (`localhost:4200`).
3. Log in using the credentials `myUser`/`myPass`.
4. Navigate through the user dashboard, report health issues, and upload running history CSV files.

## Future Enhancements

- Add user registration and profile management
- Implement additional health metrics and analytics
- Improve error handling and user feedback
- Use better state mangment in the process
