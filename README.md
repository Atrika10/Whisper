 Whisper - Anonymous Messaging App

Welcome to Whisper! This is a web application that allows users to receive anonymous feedback and messages from anyone on the internet. Share your unique profile link and discover what people want to tell you without revealing their identity.


Short description
- Whisper is a Next.js application that provides user registration with email verification, session authentication (NextAuth with credentials), and a simple nested message model stored in MongoDB. Email sending is implemented using Resend and @react-email templates.


Project overview
- Register users (username, email, password).
- Generate a verification code and send via email.
- Store users and nested messages in MongoDB.
- Authenticate using NextAuth credentials provider (identifier can be username or email).
- Server-side React email templates with @react-email.

Tech stack
- Next.js (App Router)
- TypeScript
- Mongoose (MongoDB)
- NextAuth (credentials)
- Resend (email API)
- @react-email (email templates)
- bcryptjs (password hashing)



Environment variables (required)
- MONGODB_URI — base MongoDB connection URI (without DB name if you use dbName option).
- MONGODB_DB or MONGO_DB_NAME — target database name (e.g., whisper).
- RESEND_API_KEY — Resend API key.



Quick start
1. Install
   - npm install
2. Add environment variables (see above) and restart the dev server.
3. Run dev server
   - npm run dev


