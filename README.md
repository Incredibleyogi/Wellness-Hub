# Wellness-Hub
🧘‍♀️ Wellness Hub
A full-stack MERN (MongoDB, Express.js, React, Node.js) application to create, manage, and publish wellness sessions. Users can register, log in, save drafts, and publish sessions which are publicly viewable.

🚀 Live Links
Frontend:(http://wellness-h.netlify.app)

Backend: https://wellness-hub-b.onrender.com

📦 Tech Stack
Frontend: React + Vite + Tailwind CSS

Backend: Node.js + Express.js + MongoDB (Mongoose)

Deployment: Netlify (Frontend), Render (Backend)

🛠️ Setup Instructions
1. Clone the Repository
     git clone https://github.com/Incredibleyogi/Wellness-Hub.git
     cd Wellness-Hub
2. Setup Backend
          cd backend
          npm install
          Create .env file inside /backend:
                 MONGODB_URI=your_mongodb_connection_string
                 JWT_SECRET=your_jwt_secret
   
Run backend locally:
node server.js
4. Setup Frontend
cd ../frontend
npm install

Create .env file inside /frontend:
VITE_API_BASE_URL=http://localhost:4000
Replace the URL with your Render backend URL when deploying:

VITE_API_BASE_URL=https://wellness-hub-b.onrender.com
Run frontend locally:
npm run dev



🔐 Auth Routes

  Route            | Method | Description         | Protected 
  ---------------- | ------ | ------------------- | --------- 
    /auth/register | POST   | Register new user   | ❌         
    /auth/login    | POST   | Login existing user | ❌   

📚 Session Routes

  Route                  | Method | Description                          | Protected 
  ---------------------- | ------ | ------------------------------------ | --------- 
   /sessions             | GET    | Get all published sessions           | ❌         
   /sessions/my          | GET    | Get all sessions created by the user | ✅         
   /sessions/my/:id      | GET    | Get one session (owned by the user)  | ✅         
   /sessions/save-draft  | POST   | Save or update a session as draft    | ✅         
   /sessions/publish     | POST   | Publish a draft session              | ✅         


✨ Features
🔐 JWT-based login & protected routes
📝 Create and auto-save sessions as drafts
🚀 Publish sessions to make them visible to all
📊 Dashboard to view published sessions
📁 User-specific session manager
🎨 Responsive and interactive frontend design

📧 Contact
Feel free to reach out for contributions or questions:
Email: yogeshkawadkar413@gmail.com
GitHub: @Incredibleyogi


