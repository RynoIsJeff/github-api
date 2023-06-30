# Github User Search App

This is a full-stack web application that allows users to search for Github users and view their profile details and repository information. The app interfaces with the Github API to fetch user data and repository details.

## Features

- User search box with results from Github.
- User details page displaying profile picture, bio, and some repositories.
- Repository details page showing the last commit date, creation date, description, and the last 5 commit messages.

## Technologies Used

- Frontend: React
- Backend: Express
- Third-party API: Github API

## Getting Started

1. Clone the repository:

git clone <repository_url>

2. Install dependencies for both frontend and backend:

cd client
npm install

cd ../server
npm install

3. Start the development server:

cd client
npm start

cd ../server
npm start

4. Open your browser and access the application at http://localhost:3000.

## Project Structure
The project structure is organized as follows:

client/: Contains the frontend React application.
github-api/: Contains the backend Express server.