# 🧠 Proyecto Final del Módulo - Sistema de Gestión de Tareas

- **ENLACE BACKEND DEPLOYADO: ** 
https://backend-project-diplomado.onrender.com/tasks
- **ENLACE FRONTEND DEPLOYADO:** https://josueuab.github.io/frontend_project_diplomado/



**Desarrollo Dirigido por Especificaciones con IA (Spec-Driven Development)**  
**Integrando TypeScript, REST, Principios SOLID y Arquitectura MVC**

---

## 🚀 Descripción General

Este proyecto implementa un **sistema de gestión de tareas** (Task Management System) como **Producto Mínimo Viable (MVP)**, desarrollado bajo el enfoque **Spec-Driven Development asistido por IA**.  
El objetivo fue construir un backend en **Node.js + Express + TypeScript** y un frontend en **React + Vite + TypeScript**, siguiendo buenas prácticas de **arquitectura REST**, **principios SOLID** y **asincronía con async/await**.

---

## 🧩 Estructura del Proyecto

```
├── backend/              # API REST con Express + TypeScript
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio (TaskController)
│   │   ├── models/       # Modelos Mongoose (Task)
│   │   ├── routes/       # Rutas REST /api/tasks
│   │   ├── middlewares/  # Validaciones y seguridad
│   │   └── config/       # Conexión a MongoDB
│   └── .env.example
│
├── frontend/             # Interfaz en React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes UI
│   │   ├── pages/        # Páginas principales (Lista, Crear, Editar)
│   │   └── services/     # Llamadas a la API con Axios
│
└── speec.md              # Documento de especificaciones funcionales y técnicas
```

---

## ⚙️ Tecnologías Utilizadas

### Backend
- **Node.js + Express.js**
- **TypeScript**
- **Mongoose (MongoDB)**
- **Arquitectura MVC**
- **Principios SOLID**
- **Async/Await para asincronía**
- **Middlewares de validación y seguridad**

### Frontend
- **React + Vite**
- **TypeScript**
- **Axios** (para consumo de la API)
- **CSS/Tailwind (UI minimalista)**
- **Arquitectura modular de componentes**

---

## 🧠 Conceptos Clave Aplicados

| Concepto | Descripción |
|-----------|--------------|
| **Spec-Driven Development (SDD)** | El desarrollo partió de un documento único (`speec.md`) que define todas las especificaciones funcionales y técnicas, guiando el trabajo del agente de IA y el código final. |
| **TypeScript** | Se usó tanto en backend como frontend para garantizar tipado fuerte, coherencia y mantenibilidad. |
| **Arquitectura REST** | Los endpoints siguen las convenciones REST (`GET`, `POST`, `PUT`, `DELETE`). |
| **Principios SOLID** | Código modular, abierto a extensión y cerrado a modificación. |
| **Async/Await** | Todas las operaciones con base de datos utilizan asincronía para mejorar la eficiencia. |
| **Validaciones y Seguridad** | Middleware dedicado a sanitizar entradas y prevenir ataques de inyección. |

---

## 🧪 Funcionalidades Principales (MVP)

1. **Crear Tareas**
   - Endpoint: `POST /api/tasks`
   - Campos: título, descripción, estado (por defecto “pendiente”).

2. **Listar Tareas**
   - Endpoint: `GET /api/tasks`
   - Devuelve todas las tareas con título, estado y fecha de creación.

3. **Actualizar Estado**
   - Endpoint: `PUT /api/tasks/:id`
   - Permite cambiar el estado de una tarea entre:
     - “Pendiente”
     - “En progreso”
     - “Completada”

---

## 💻 Instrucciones de Ejecución

### 🔹 Backend

1. Clonar el repositorio y entrar al directorio raíz.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar la base de datos en un archivo `.env`:
   ```bash
   MONGO_URI=mongodb://localhost:27017/task_management
   ```
4. Ejecutar el servidor:
   ```bash
   npm run dev
   ```
5. El backend correrá en: **http://localhost:3000**

---

### 🔹 Frontend

1. Entrar al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. El frontend estará disponible en: **http://localhost:5173**

> 🔁 El proxy de desarrollo está configurado para enviar las solicitudes a `http://localhost:3000/api`.

---

## 🧰 Scripts útiles

| Comando | Descripción |
|----------|-------------|
| `npm run dev` | Inicia el servidor backend en modo desarrollo |
| `npm run dev:both` | Inicia frontend y backend en paralelo |
| `npm run build` | Compila el proyecto |
| `npm run lint` | Ejecuta el linter para mantener la calidad del código |

---

## 📦 Despliegue

- **Frontend:** desplegado en Netlify  
- **Backend:** desplegado en Render  
- Ambos entornos están configurados para trabajar con el mismo origen.

---

## 🎥 Entregables

- **Repositorio GitHub:** [URL del repositorio](#)
- **Video de presentación (máx. 10 min):** [Enlace público (YouTube/Vimeo)](#)

El video incluye:
1. Explicación del enfoque *Spec-Driven Development*.
2. Demostración del archivo `speec.md` como guía de desarrollo.
3. Funcionamiento del MVP desplegado.
4. Evidencia de uso de **TypeScript**, **Async/Await**, **REST** y **SOLID**.

---

## 🧾 Créditos

**Autor:** JOSUE ISRAEL ARISTA HUANCA  
**Institución:** DevPro Bolivia  
**Curso:** Desarrollo Dirigido por Especificaciones con IA  
**Año:** 2025  
