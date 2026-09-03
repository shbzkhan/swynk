# Swynk

### Real-Time Chat & Social Communication App

Swynk is a mobile-first social communication application built around real-time messaging, conversations, friendships, stories, and notifications.

The application combines REST APIs with Socket.IO to provide both traditional API-based operations and real-time communication.

## What is Swynk?

Swynk allows users to connect with other users, send friend requests, start conversations, exchange messages in real time, and share stories.

The application is divided into two parts:

- **Backend** – Node.js, Express.js, MongoDB, Mongoose and Socket.IO
- **Mobile** – React Native CLI with TypeScript

## Highlights

- JWT-based authentication
- Email OTP verification
- Google authentication
- One-to-one real-time messaging
- Socket.IO communication
- Friend request management
- Story sharing
- Firebase push notifications
- Cloudinary media storage
- React Native mobile application
- MongoDB database
- Modular backend structure

## Application Architecture

```text
                       Swynk
                         |
            +------------+------------+
            |                         |
         Mobile                    Backend
            |                         |
     React Native CLI          Express.js API
            |                         |
            |                 +-------+--------+
            |                 |                |
            |              REST API         Socket.IO
            |                 |                |
            +-----------------+----------------+
                              |
                           MongoDB
```

## Backend

## Backend Stack

| Technology | Role |
|---|---|
| Node.js | JavaScript Runtime |
| Express.js | API Framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| Bcrypt | Password Security |
| Socket.IO | Real-Time Communication |
| Cloudinary | Media Storage |
| Multer | File Upload Processing |
| Nodemailer | Email and OTP Delivery |
| Firebase Admin | Push Notifications |
| Google Auth Library | Google Authentication |
| CORS | Cross-Origin Requests |
| Cookie Parser | Cookie Handling |

### Authentication

- User registration
- Login and logout
- Access and refresh tokens
- JWT protected routes
- Email OTP verification
- Google Sign-In
- Password hashing
- Token refresh
- Authentication middleware

### User Management

- User profiles
- Get current user
- Search users
- Profile avatar
- User discovery
- Authentication state management

### Friend System

- Send friend requests
- View friend requests
- Accept friend requests
- Reject friend requests
- Manage connections

### Conversations

- Create conversations
- Fetch conversations
- Delete conversations
- One-to-one conversations
- Conversation-based messaging

### Real-Time Messaging

- Send messages
- Receive messages in real time
- Get conversation messages
- Delete messages
- Socket.IO communication
- Real-time connection handling

### Stories

- Create stories
- View user stories
- Story media upload
- Story expiration support

### Notifications

- Firebase Cloud Messaging
- Push notifications
- Device notifications
- Local notifications
- Notification handling

### Media Management

- Image uploads
- Profile image upload
- Story media upload
- Cloudinary integration
- Multer file upload middleware

## Backend Folder Structure

```text
backend/
|
├── public/
│   └── temp/
|
├── src/
│   |
│   ├── controllers/
│   │   ├── conversation.controllers.js
│   │   ├── message.controllers.js
│   │   ├── request.controllers.js
│   │   ├── story.controllers.js
│   │   └── user.controllers.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middlewares.js
│   │   └── multer.middlewares.js
│   │
│   ├── models/
│   │   ├── Otp.models.js
│   │   ├── PendingUser.models.js
│   │   ├── conversation.models.js
│   │   ├── message.models.js
│   │   ├── request.models.js
│   │   ├── story.models.js
│   │   └── user.models.js
│   │
│   ├── routes/
│   │   ├── conversation.routes.js
│   │   ├── message.routes.js
│   │   ├── request.routes.js
│   │   ├── story.routes.js
│   │   └── user.routes.js
│   │
│   ├── socket/
│   │   └── socket.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── cloudinary.js
│   │   ├── nodemailer.js
│   │   ├── otpGenerator.js
│   │   └── sendNotificationToDevice.js
│   │
│   ├── app.js
│   ├── constant.js
│   └── index.js
|
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
└── yarn.lock
```

## Database

## Data Models

| Model | Responsibility |
|---|---|
| `User` | Stores user accounts and profile data |
| `PendingUser` | Holds users during registration verification |
| `Otp` | Stores verification OTP information |
| `Conversation` | Represents a chat between users |
| `Message` | Stores individual chat messages |
| `Request` | Stores friend requests |
| `Story` | Stores story information |

### Base API

All REST API endpoints use the following base URL:

### Local Development

```text
http://localhost:8000/api/v1
```

### Production

```text
https://your-backend-domain.com/api/v1
```

## API Modules

| Module | Base Endpoint | Purpose |
|---|---|---|
| Users | `/users` | Authentication, registration, OTP, Google login and user search |
| Friend Requests | `/requests` | Send and manage friend requests |
| Conversations | `/conversations` | Fetch and manage conversations |
| Messages | `/messages` | Send, fetch and delete messages |
| Stories | `/stories` | Create and retrieve stories |

## REST API Reference

### User APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/users/send-otp` | Send email verification OTP |
| `POST` | `/users/verify-otp` | Verify OTP |
| `POST` | `/users/register` | Create a new account |
| `POST` | `/users/login` | Authenticate a user |
| `POST` | `/users/google-login` | Authenticate with Google |
| `POST` | `/users/logout` | End the current session |
| `POST` | `/users/refresh-token` | Generate a new access token |
| `GET` | `/users/current` | Fetch authenticated user |
| `GET` | `/users/search` | Search for users |

### Friend Request APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/requests/` | Retrieve friend requests |
| `POST` | `/requests/send/:receiverId` | Send a friend request |
| `POST` | `/requests/accept/:requestId` | Accept or reject a request |

### Conversation APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/conversations/` | Retrieve conversations |
| `POST` | `/conversations/delete/:conversationId` | Delete a conversation |

### Message APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/messages/:conversationId` | Retrieve conversation messages |
| `POST` | `/messages/:conversationId` | Send a message |
| `DELETE` | `/messages/:conversationId/:messageId` | Delete a message |

### Story APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/stories/` | Create a story |
| `POST` | `/stories/me` | Retrieve user's stories |

### API Request Example

```http
GET http://localhost:8000/api/v1/users/current
```

## Real-Time Communication

Swynk uses Socket.IO for real-time communication between connected users.

```text
User A
  |
  | Message
  v
Socket.IO
  |
  v
Backend Socket Server
  |
  v
Socket.IO
  |
  v
User B
```

Socket implementation:

```text
backend/src/socket/socket.js
```

## Mobile Application

### Mobile Stack

| Technology | Purpose |
|---|---|
| React Native | Mobile Framework |
| React Native CLI | Native Application Development |
| TypeScript | Static Type Checking |
| Redux Toolkit | Application State |
| React Redux | Redux Integration |
| Socket.IO Client | Real-Time Communication |
| React Navigation | Navigation |
| NativeWind | Styling |
| Firebase Messaging | Push Notifications |
| Notifee | Local Notifications |
| Google Sign-In | Google Authentication |
| AsyncStorage | Local Persistence |
| React Native Reanimated | Animations |
| React Native Image Picker | Image Selection |
| React Native Image Crop Picker | Image Cropping |
| Lottie | UI Animations |
| React Native SVG | SVG Rendering |

## Mobile Features

### Authentication

- Welcome screen
- Registration
- Email verification
- OTP verification
- Login
- Google authentication
- Persistent login
- Logout

### Chat

- One-to-one conversations
- Real-time messages
- Message history
- Message deletion
- Conversation deletion
- Socket.IO connection

### Friends

- User discovery
- Search users
- Friend requests
- Accept requests
- Reject requests

### Stories

- Create stories
- Upload story media
- View stories
- Story viewer

### Profile

- User profile
- Profile picture
- Account information
- Profile management

### Notifications

- Firebase notifications
- Device notifications
- Local notifications
- Notifee integration

## Mobile Structure

```text
mobile/
|
├── android/
├── ios/
|
├── src/
│   |
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── navigation/
│   ├── redux/
│   ├── screens/
│   ├── types/
│   └── utils/
|
├── __tests__/
├── app.json
├── babel.config.js
├── global.css
├── index.js
├── jest.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── react-native.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── yarn.lock
```

### Navigation

Swynk uses React Navigation for managing application navigation.

```text
navigation/
|
├── BottomTabNavigator.tsx
├── MainNavigator.tsx
├── NavigationUtils.tsx
├── ScreenCollection.tsx
└── StackNavigator.tsx
```

### Main Screens

```text
screens/
|
├── EmailAddressScreen.tsx
├── HomeScreen.tsx
├── LoginScreen.tsx
├── MessageScreen.tsx
├── NewGroupScreen.tsx
├── OTPScreen.tsx
├── ProfileScreen.tsx
├── RegisterScreen.tsx
├── RequestScreen.tsx
├── SearchFriendScreen.tsx
├── SearchScreen.tsx
├── SplashScreen.tsx
├── StoryScreen.tsx
└── WelcomeScreen.tsx
```

### Media Management

Swynk uses Cloudinary for cloud-based media storage.

The upload flow is:

```text
Mobile App
    |
    v
Multipart Upload
    |
    v
Multer
    |
    v
Cloudinary
    |
    v
Media URL
    |
    v
MongoDB
```

### Email and OTP

Nodemailer is used to send verification OTPs through Gmail SMTP.

```text
User
 |
 v
Enter Email
 |
 v
Generate OTP
 |
 v
Nodemailer
 |
 v
Email
 |
 v
Verify OTP
 |
 v
Account Creation
```

## Environment Variables

### Backend `.env`

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Express server |
| `ORIGIN` | Allowed client origin |
| `MONGODB_URL` | MongoDB database connection URL |
| `ACCESS_TOKEN_SECRET` | Secret used to sign access tokens |
| `ACCESS_TOKEN_EXPIRY` | Access token lifetime |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | Refresh token lifetime |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud identifier |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `MAIL_ID` | Email account used for OTP delivery |
| `MAIL_PASS` | Gmail app password |
| `GOOGLE_CLIENT_ID` | Google OAuth client identifier |
| `FIREBASE_PROJECT_ID` | Firebase project identifier |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |

```env
PORT=8000

ORIGIN=http://localhost:3000

MONGODB_URL=mongodb://localhost:27017/swynk

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

MAIL_ID=your_email@gmail.com
MAIL_PASS=your_gmail_app_password

GOOGLE_CLIENT_ID=your_google_client_id

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY=your_private_key
```

### Mobile `.env`

| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Base URL used by the mobile app to communicate with the backend |
| `GOOGLE_WEB_CLIENT_ID` | Google OAuth client ID used for Google Sign-In |
| `SOCKET_URL` | Backend URL used to establish the Socket.IO connection |

```env
API_BASE_URL=http://localhost:8000/api/v1

GOOGLE_WEB_CLIENT_ID=your_google_web_client_id

SOCKET_URL=http://localhost:8000
```

## Getting Started

### Requirements

- Node.js 18+
- Yarn or npm
- MongoDB
- Android Studio
- React Native CLI environment
- Xcode for iOS development
- Firebase project
- Cloudinary account
- Gmail account with App Password

### Clone

```bash
git clone https://github.com/shbzkhan/swynk.git

cd swynk
```

### Backend Setup

```bash
cd backend

yarn install

yarn dev
```

### Mobile Setup

Open another terminal:

```bash
cd mobile

yarn install
```

### Start Metro

```bash
yarn start
```

### Android

```bash
yarn android
```

### iOS

```bash
yarn ios
```

## Development Workflow

```text
        React Native App
               |
               +-------- REST API --------+
               |                          |
               +-------- Socket.IO -------+
                                          |
                                          v
                                    Express Server
                                          |
                              +-----------+-----------+
                              |                       |
                           MongoDB                Services
                              |                       |
                              |             +---------+---------+
                              |             |                   |
                              v          Cloudinary          Firebase
                           Database        |                   |
                                          v                   v
                                        Media             Notifications
```

## Future Improvements

- Group conversations
- Message reactions
- Typing indicators
- Online / offline presence
- Read receipts
- Reply to messages
- Message forwarding
- Voice messages
- Voice calls
- Video calls
- Story reactions
- Story replies
- Advanced message search
- Improved notification center
- End-to-end encryption

### Developed by
Shahbaz Husain Khan

Portfolio
https://shahbazkhan.vercel.app/

Linkedin 
https://www.linkedin.com/in/shahbaz-husain
