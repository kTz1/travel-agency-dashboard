<div align="center">
  <br />
  <img width="1200" src="https://github.com/user-attachments/assets/4e75ee7f-b8d0-40c4-8dd3-6bf5ecbee7cc" alt="screenshot" />
  <br />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=black&color=646CFF" />
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=black&color=3178C6" />
  <img src="https://img.shields.io/badge/React--Router--v7-CA4245?style=for-the-badge&logo=react-router&logoColor=CA4245&labelColor=black&color=CA4245" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=black&color=06B6D4" />
  <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=FD366E&labelColor=black&color=FD366E" />
  <h1 align="center">Travel Agency Dashboard</h1>
</div>


## <a name="introduction">🤖 Introduction</a>
Dynamic travel dashboard with personalized travel suggestions, charts and tables using React Router v7, Syncfusion, Appwrite, and Gemini AI. Authentication, create interactive charts, and integrate Gemini AI for outstanding features.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## <a name="tech-stack">⚙️ Tech Stack</a>

- Vite
- TypeScript
- Appwrite
- React-router-v7
- TailwindCSS
- Syncfusion

**Cloning the Repository**

```bash
git clone https://github.com/kTz1/travel-agency-dashboard
cd travel-agency-dashboard
```

**Installation**

Install the project dependencies using npm:

```bash
npm run dev
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
# SYNCFUSION
VITE_SYNCFUSION_LICENSE_KEY=
# APPWRITE
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_API_KEY=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_USERS_COLLECTION_ID=
VITE_APPWRITE_TRIPS_COLLECTION_ID=
VITE_APPWRITE_API_ENDPOINT=
# Gemini
GEMINI_API_KEY=
# Unsplash
UNSPLASH_ACCESS_KEY=
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.<b> To open the application, click the sign-out icon, sign in again, and then click on the dashboard.</b>

## <a name="tech-stack">🚀 Deploy on Vercel</a>

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
