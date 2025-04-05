# Trello Server Side

![Trello API](https://img.shields.io/badge/Trello-API-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)
![Express](https://img.shields.io/badge/Express-4.17+-orange)
![Node.js](https://img.shields.io/badge/Node.js-14+-brightgreen)

A modern, responsive Trello-inspired task management application frontend built with React. This application provides an intuitive drag-and-drop interface for managing tasks across different status categories.

## 🔗 Important Links

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-2ea44f?style=for-the-badge&logo=vercel)](https://trello-0.netlify.app/)
[![Client Repository](https://img.shields.io/badge/Client_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizurrahman-zero/trello_client-side)
[![Server Repository](https://img.shields.io/badge/Server_Code-GitHub-blue?style=for-the-badge&logo=github)](https://github.com/azizurrahman-zero/trello_server-side)

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

- **Task Management**: Create, read, update, and delete task tickets
- **Status Tracking**: Organize tasks by status (todo, research, inProgress, review, completed)
- **Priority Levels**: Assign priority levels to tasks (Low, Medium, High)
- **Drag and Drop Support**: Backend support for frontend drag-and-drop functionality
- **Filtering**: Filter tasks by status or view all tasks
- **MongoDB Integration**: Persistent storage of all task data

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for storing task data
- **Mongoose**: MongoDB object modeling tool
- **dotenv**: Environment variable management
- **CORS**: Cross-Origin Resource Sharing support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- Mong## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)oDB Atlas account or local MongoDB installation
- npm (Node Package Manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/azizurrahman-zero/trello_server-side.git
   cd trello_server-side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your MongoDB credentials:
   ```
   DB_USERNAME=your_mongodb_username
   DB_PASSWORD=your_mongodb_password
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The server will be running at `http://localhost:5000`

## Environment Variables

| Variable | Description |
|----------|-------------|
| DB_USERNAME | MongoDB Atlas username |
| DB_PASSWORD | MongoDB Atlas password |
| PORT | Server port (defaults to 5000) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/:query` | Get tasks by status (todo, research, inProgress, review, completed, all) |
| POST | `/add` | Create a new task ticket |
| PUT | `/edit/:id` | Edit an existing task ticket |
| PUT | `/updateStatus/:id` | Update the status of a task (for drag and drop) |
| PUT | `/updatePriority/:id` | Update the priority of a task |
| DELETE | `/delete/:id` | Delete a task ticket |
| GET | `/` | Server health check endpoint |


## Project Structure

```
trello_server-side/
├── node_modules/
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── index.js              # Main application entry point
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```