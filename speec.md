# Especificaciones del Proyecto - Sistema de Gestión de Tareas

## Objetivo

Desarrollar un Producto Mínimo Viable (MVP) para un sistema de gestión de tareas que permita a los usuarios realizar las siguientes acciones:

- **Crear nuevas tareas** con título, descripción y estado (inicialmente "pendiente").
- **Ver una lista de todas las tareas**.
- **Actualizar el estado de las tareas** (por ejemplo, "en progreso", "completada").

## Requerimientos Funcionales

1. **Crear tarea**
   - El sistema debe permitir la creación de nuevas tareas con los siguientes campos:
     - **Título**: Un campo de texto que describe brevemente la tarea.
     - **Descripción**: Un campo de texto que describe los detalles de la tarea.
     - **Estado**: Un campo que representa el estado de la tarea, con valor inicial "pendiente".

2. **Ver tareas**
   - El sistema debe permitir ver una lista de todas las tareas creadas.
   - La lista debe mostrar al menos el título de la tarea, su estado y la fecha de creación.

3. **Actualizar estado de tarea**
   - El sistema debe permitir actualizar el estado de las tareas. Los estados posibles son:
     - "Pendiente"
     - "En progreso"
     - "Completada"

## Instrucciones para la IA

### 1. **Primer Commit: Inicializar Proyecto y Configuración Básica**

- **Acción**: Inicializa el proyecto de Node.js con TypeScript y Express.
- **Archivos a crear**:
  - `package.json`: Para las dependencias.
  - `tsconfig.json`: Configuración para TypeScript.
  - `index.ts`: Archivo principal que inicia el servidor Express.
  - Instala las dependencias necesarias (`express`, `typescript`, `mongoose`, etc.).
- **Commit**: `"Inicializa el proyecto con estructura básica"`

---

### 2. **Segundo Commit: Implementar la Conexión a MongoDB**

- **Acción**: Implementa la conexión a MongoDB usando Mongoose y un archivo de configuración `.env`.
- **Archivos a crear**:
  - `config/database.ts`: Archivo para gestionar la conexión a MongoDB usando Mongoose.
  - `.env`: Archivo de configuración con la variable `MONGO_URI` para la cadena de conexión a la base de datos.
- **Commit**: `"Configura la conexión a la base de datos MongoDB"`

---

### 3. **Tercer Commit: Crear Modelo de Tarea con Mongoose**

- **Acción**: Crea un modelo de datos para las tareas usando Mongoose.
- **Archivos a crear**:
  - `models/task.ts`: Define el esquema de las tareas (título, descripción, estado y fecha de creación).
- **Commit**: `"Crea el modelo de datos de tareas con Mongoose"`

---

### 4. **Cuarto Commit: Crear Ruta para Crear Tareas**

- **Acción**: Implementa la funcionalidad para crear tareas. Crea una ruta `POST /tasks` que reciba título, descripción y estado (por defecto "pendiente").
- **Archivos a crear**:
  - `controllers/taskController.ts`: Controlador que maneja la creación de tareas.
  - `routes/taskRoutes.ts`: Define la ruta para crear tareas.
- **Commit**: `"Implementa la funcionalidad para crear nuevas tareas"`

---

### 5. **Quinto Commit: Crear Ruta para Ver Tareas**

- **Acción**: Implementa la funcionalidad para listar todas las tareas. Crea una ruta `GET /tasks` que devuelva todas las tareas almacenadas en la base de datos.
- **Archivos a crear**:
  - `controllers/taskController.ts`: Añadir la lógica para obtener todas las tareas.
- **Commit**: `"Añadir funcionalidad para ver todas las tareas"`

---

### 6. **Sexto Commit: Crear Ruta para Actualizar el Estado de las Tareas**

- **Acción**: Implementa la funcionalidad para actualizar el estado de las tareas. Crea una ruta `PUT /tasks/:id` para cambiar el estado de la tarea entre "pendiente", "en progreso" y "completada".
- **Archivos a crear**:
  - `controllers/taskController.ts`: Añadir la lógica para actualizar el estado de las tareas.
- **Commit**: `"Implementa la funcionalidad para actualizar el estado de las tareas"`

---

### 7. **Séptimo Commit: Refactorizar el Código Siguiendo los Principios SOLID**

- **Acción**: Refactoriza el código siguiendo los principios SOLID. Esto incluye mejorar la estructura de los controladores, servicios y modelos para mantener el código limpio y mantenible.
- **Archivos a modificar**:
  - Refactoriza `controllers/taskController.ts`, `models/task.ts`, `routes/taskRoutes.ts` según principios SOLID.
- **Commit**: `"Refactoriza el código para seguir los principios SOLID"`

---

### 8. **Octavo Commit: Implementar Validaciones de Seguridad**

- **Acción**: Agrega validaciones básicas de seguridad para prevenir ataques como inyecciones SQL o cualquier otra entrada maliciosa. Implementa un middleware de validación.
- **Archivos a crear/modificar**:
  - `middlewares/validationMiddleware.ts`: Archivo de middleware para validar las entradas.
- **Commit**: `"Agrega validaciones básicas para prevenir inyecciones SQL"`

---

### 9. **Noveno Commit: Configuración de Autenticación y Autorización**

- **Acción**: Prepara el sistema para la autenticación y autorización de usuarios (puedes usar JWT como placeholder para futuras implementaciones).
- **Archivos a crear**:
  - `controllers/authController.ts`: Controlador para la autenticación.
  - `middlewares/authMiddleware.ts`: Middleware para verificar autenticación de usuarios.
- **Commit**: `"Agrega placeholder para autenticación y autorización de usuarios"`

---

## Frontend (UI/UX)

- **Acción**: Crear el frontend con un enfoque intuitivo de UI/UX, asegurando que los usuarios puedan interactuar fácilmente con el sistema.
- **Tecnologías recomendadas**:
  - **React** o **Vue.js** para el frontend.
  - **CSS** (o frameworks como **TailwindCSS** o **Bootstrap**) para el diseño.
  - **Axios** para la comunicación con la API del backend.
- **Flujo de trabajo**:
  - **Pantalla Principal**: Visualiza una lista de todas las tareas.
  - **Pantalla de Creación de Tareas**: Permite agregar nuevas tareas con título y descripción.
  - **Pantalla de Edición de Tareas**: Permite actualizar el estado de las tareas.

### UI/UX Features:
- **Fácil navegación**: Asegúrate de que la aplicación tenga un diseño limpio, accesible y fácil de usar.
- **Interacción intuitiva**: Los usuarios deben poder realizar acciones como crear tareas, ver tareas y actualizar el estado de manera rápida y sencilla.

---

## Requerimientos No-Funcionales

1. **Lenguaje**: TypeScript
   - El proyecto debe ser desarrollado utilizando **TypeScript**, para aprovechar los beneficios de la tipificación estática, lo que mejora la calidad y mantiene la coherencia del código.

2. **Asincronía (Async/Await)**
   - El backend debe hacer uso de **async/await** para manejar operaciones de entrada/salida (I/O), garantizando la eficiencia y claridad en la gestión de solicitudes asincrónicas, especialmente cuando se interactúa con la base de datos.

3. **API RESTful**
   - El backend debe estar diseñado siguiendo el patrón **REST** para realizar las operaciones CRUD:
     - **POST** para crear tareas.
     - **GET** para obtener todas las tareas.
     - **PUT** para actualizar el estado de una tarea.
     - **DELETE** para eliminar tareas (si es necesario en el futuro).

4. **Arquitectura MVC**
   - El backend debe seguir la arquitectura **MVC (Modelo-Vista-Controlador)**:
     - **Modelo**: Representa los datos de la tarea (título, descripción, estado).
     - **Vista**: Interacción con el frontend (aunque puede no ser necesario si solo se ofrece una API).
     - **Controlador**: Gestiona las peticiones y la lógica de negocio.

5. **Patrones SOLID**
   - El código debe seguir los principios de diseño **SOLID**, asegurando que cada componente tenga una responsabilidad única, el código sea abierto a extensión pero cerrado a modificación, y las dependencias estén invertidas para facilitar la mantenibilidad y escalabilidad.

6. **Seguridad**
   - El sistema debe tener placeholders para **autenticación** y **autorización** de usuarios.
   - Se deben seguir las **buenas prácticas de seguridad** como la validación de entradas para prevenir inyecciones de SQL y otros ataques comunes.

---

### Tecnologías Requeridas

1. **Lenguaje**: TypeScript

2. **Base de datos**: MongoDB (usando Mongoose)

3. **Frontend**: React o Vue.js con TailwindCSS o Bootstrap

4. **Backend**: Node.js con Express.js

5. **Autenticación**: Placeholder para futuras implementaciones de autenticación (por ejemplo, JWT).

6. **Despliegue**: Netlify o plataforma similar.

---

### Archivos Relacionados para el Frontend

- **UI/UX**: Pantallas y componentes deben ser diseñados pensando en la facilidad de uso y la accesibilidad.
