# Lead Scoring Dashboard

A full-stack lead scoring system that predicts user intent using a machine learning model and reranks scores based on comment sentiment. Built with FastAPI (backend) and React (frontend).

## Technologies Used

- Frontend: React.js  
- Backend: FastAPI  
- ML Model: Scikit-learn (Logistic Regression)  
- Deployment: Netlify (frontend), local FastAPI server (backend)

## Live Demo

Frontend: https://lead-scoring-dashboard.netlify.app

## Setup Instructions

### 1. Clone the Repository

bash
git clone https://github.com/JayantGusain/lead-scoring-dashboard.git
cd lead-scoring-dashboard

2. Backend Setup (FastAPI)
Navigate to the backend folder:
cd backend


(Optional) Create a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


Install dependencies:
pip install -r requirements.txt


Run the FastAPI server:
uvicorn main:app --reload


Server will start at: http://127.0.0.1:8000
API docs available at: http://127.0.0.1:8000/docs

3. Frontend Setup (React)
Navigate to the frontend folder:
cd ../frontend


Install dependencies:
npm install

Start the React app:
npm start

App will run at: http://localhost:3000

Features
- Lead scoring using ML model
- Reranking based on comment sentiment
- Sorted table of leads
- Persistent data using localStorage
- Score distribution chart using Chart.js

Author
Name: Jayant Gusain
LinkedIn: https://linkedin.com/in/jayantgusain
GitHub: https://github.com/jayantd3


