# Deployment Guide

## Frontend on Vercel

1. Import the repo into Vercel.
2. Set the root directory to `frontend`.
3. Add this environment variable:
   - `NEXT_PUBLIC_API_URL=https://your-render-backend.onrender.com`
4. Deploy.

## Backend on Render

1. Create a new Web Service on Render from this repo.
2. Set the root directory to `backend`.
3. Choose `Docker` as the environment.
4. Add these environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `APP_CORS_ALLOWED_ORIGINS=https://your-vercel-project.vercel.app`
   - `SPRING_JPA_SHOW_SQL=false`
5. Deploy.

## Notes

- The backend reads `PORT` automatically on Render.
- For local frontend development, create `frontend/.env.local` with:
  - `NEXT_PUBLIC_API_URL=http://localhost:8080`
- For local backend development, run Spring with the `local` profile:
  - `SPRING_PROFILES_ACTIVE=local`
- Rotate any database password that was previously committed before making the repo public.
