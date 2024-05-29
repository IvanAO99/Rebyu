# REBYU - Final Project

A comprehensive web application for game reviews, utilizing AI to evaluate reviews. This project leverages various modern web technologies to provide an engaging and interactive user experience.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Features](#features)

## Technologies Used
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Supabase
- **Database**: PostgreSQL
- **AI Integration**: Cohere API for review evaluation

## Project Overview
Rebyu is a web application designed to enhance the game reviewing experience. Users can register, log in, and review video games, as well as create and manage personalized lists of games. The platform includes CRUD (Create, Read, Update, Delete) functionalities for managing these lists. Admin users have the capability to manage game details and user reviews. The AI component, powered by the Cohere API, evaluates user-submitted reviews to ensure they are constructive and respectful, fostering a positive community environment.

## Getting Started
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IvanAO99/Rebyu.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Rebyu
    ```

3. **Create a .env file in the root directory with the following line:**
   ```bash
    VITE_API_KEY=<API_KEY_COHERE>
    ```
    You can obtain your API key by creating a free account on the official Cohere website: [Cohere Dashboard](https://dashboard.cohere.com/)a


4. **Install the dependencies:**
   ```bash
    npm install
    ```

    
5. **Start the development server:**
   ```bash
    npm run dev
    ```

## Features
- **User Registration**: Create a new account.
- **User Login**: Access your account with secure authentication.
- **Review Games**: Write, edit and delete reviews for video games.
- **Save Games to Lists**: Organize your favorite games into custom lists.
- **CRUD for Lists**: Create, read, update (adding and deleting games), and delete your game lists.
- **Admin Management**: Admin users can manage game details and delete user reviews.
- **AI Review Evaluation**: AI-powered analysis of user reviews using the Cohere API for better control on ethics and morality in the community.

