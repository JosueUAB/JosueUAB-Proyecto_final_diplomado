# Proyecto: Sistema de Gestión de Tareas

Esta repo contiene un backend en Node/TypeScript (Express + Mongoose) y un frontend en React + Vite.

Estructura básica:
- `src/` - código backend (Express, TypeScript)
- `frontend/` - código frontend (Vite + React + TypeScript)

Requisitos:
- Node.js >= 14
- MongoDB (local o remoto)

Desarrollo (desde la raíz):
1. Instalar dependencias del backend:
   ```powershell
   npm install
   ```
2. Instalar dependencias del frontend:
   ```powershell
   npm --prefix frontend install
   ```
3. Ejecutar ambos en paralelo:
   ```powershell
   npm run dev:both
   ```

Acceso:
- API backend: http://localhost:3000
- Frontend: por defecto Vite corre en http://localhost:5173

Notas:
- El frontend está configurado con un proxy en desarrollo para `/tasks` apuntando al backend en `http://localhost:3000`.
- Ajusta `.env` con `MONGO_URI` en la raíz antes de ejecutar el backend.
