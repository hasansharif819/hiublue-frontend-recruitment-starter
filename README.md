# Hiublue Dashboard
## https://hiublue-dashboard.vercel.app

This project is a web application built using Next.js 14 (App Router), TypeScript, Material UI (MUI), React Hook Form, ApexCharts, and Context API for state management. The application includes features like authentication, an admin dashboard with real-time data, and a page for sending onboarding offers to new users. The project is deployed on Vercel.

Features
Authentication: Secure login page with authentication state managed using Context API and LocalStorage. Unauthorized users are restricted from accessing protected routes.

Admin Dashboard: Real-time data fetching, displayed in a table with pagination, searching, and filtering. Data is visualized using ApexCharts.

Onboarding Offers: A dedicated page for admins to send onboarding offers to new users. Includes user search using MUI Autocomplete and form validation with yup or zod.

Responsive Design: The application is fully responsive, ensuring a seamless experience across different devices.

Clean Code Structure: Modular, reusable, and well-structured code with proper TypeScript typings.

Version Control: Follows a clean Git workflow with feature branches and meaningful commit messages.

Tech Stack
Framework: Next.js 14 (App Router)

Language: TypeScript

UI Library: Material UI (MUI)

Form Handling: React Hook Form (with yup or zod validation)

Charting: ApexCharts

State Management: Context API and LocalStorage

Version Control: GitHub

Deployment: Vercel

Getting Started
Prerequisites
Node.js (v16 or higher)

## npm or yarn

Git

## Installation
* Clone the repository

## bash
- Copy
- git clone https://github.com/hasansharif819/hiublue-frontend-recruitment-starter.git
- cd project-name
- Install dependencies

## bash
- Copy
- npm install
# or
- yarn install
- Set up environment variables

Create a .env.local file in the root directory and add the necessary environment variables:

## env
- Copy
- NEXT_PUBLIC_API_URL=your_api_url_here
- NEXT_PUBLIC_AUTH_TOKEN=your_auth_token_here
- Run the development server

bash
Copy
npm run dev
# or
yarn dev
The application will be running on http://localhost:3000.

Deployment
Deploy to Vercel

Push your code to a GitHub repository.

Go to Vercel and import your project.

Follow the prompts to deploy your application.

Access the deployed application

Once deployed, Vercel will provide you with a live URL to access your application.

Usage
Authentication
Login Page: Access the login page at /login. Enter your credentials to authenticate.

Protected Routes: Only authenticated users can access the dashboard and other protected routes.

Admin Dashboard
Real-time Data: The dashboard fetches real-time data from the provided API and displays it in a table.

Pagination, Searching, and Filtering: The table supports pagination, searching, and filtering for better data management.

Charts: Data is visualized using ApexCharts for better insights.

Sending Onboarding Offers
Onboarding Page: Access the onboarding page at /onboarding.

User Search: Use the MUI Autocomplete component to search for users.

Form Validation: The form is validated using yup or zod before submission.

- [**Figma design link**](https://www.figma.com/design/p4aO5zxiLUkws5DDTTWP92/Untitled?node-id=0-1&t=oePPLG5LIUguMtQy-1)
- [**Postman collection**](https://documenter.getpostman.com/view/8605001/2sAYXFiHWQ)
