

# API RESTful para Gestión de Eventos - Prueba técnica Coordinadora

Esta es una API RESTful para la gestión de eventos y asistentes, construida con **Node.js**, **Express**, **Sequelize**, y **MySQL**. La API permite gestionar eventos y asistentes, y está documentada con **Swagger**. Además, la aplicación está **dockerizada** con soporte para múltiples réplicas.

## Características

- **CRUD de Eventos**: Crear, leer, actualizar y eliminar eventos.
- **Gestión de Asistentes (Atendees)**: CRUD para gestionar asistentes a los eventos.
- **Autenticación JWT**: Autenticación basada en JSON Web Tokens (JWT).
- **Dockerización**: La aplicación está completamente dockerizada, incluyendo la base de datos MySQL.
- **Documentación con Swagger**: Documentación interactiva disponible en `/api-docs`.

---

## Requisitos

- **Node.js** v20 o superior
- **MySQL** v5.7 o superior
- **Docker** y **Docker Compose** (opcional para la versión dockerizada)
- **Postman** (opcional para probar la API)

## Instalación

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/kvnCore/event-coordinadora-api
   cd event-coordinadora-api
   ```

2. **Instalar Dependencias**:

   Asegúrate de tener las dependencias necesarias:

   ```bash
   npm install
   ```

3. **Configuración de Variables de Entorno**:

   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```bash
   PORT=3000
    DB_HOST=localhost
    DB_USER=coordinadora
    DB_PASS=c00rd1n4d0r4
    DB_NAME=eventdb
    JWT_SECRET=your_jwt_secret
    MAP_BOX_KEY=pk.eyJ1Ijoia3ZuY29yZSIsImEiOiJjbTEzd2lnbXEwdG9mMmxwdzdxZ2Fhb2dtIn0.3_jDppQDQH5_4aUs5pErng
    FETCH_URL_ADRESS=http://localhost:3000
   ```

4. **Configurar la Base de Datos**:

   Asegúrate de que MySQL esté corriendo y luego crea la base de datos `eventdb`:

   ```sql
   CREATE DATABASE eventdb;
   ```
    **En la ruta './src/templates/db' encontrarás un script de base de datos junto a su modelo de entidad - relación**

5. **Iniciar la Aplicación**:

   Inicia la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

---

## Uso con Docker

Si prefieres utilizar Docker para la gestión del entorno, sigue estos pasos:

1. **Construir y Ejecutar la Aplicación con Docker**:

   Asegúrate de tener **Docker** instalado y luego ejecuta:

   ```bash
   docker-compose up --build
   ```

   Esto iniciará tanto la API como la base de datos MySQL en contenedores. La API estará disponible en `http://localhost:3000`.

2. **Escalar Réplicas**:

   Puedes escalar el número de réplicas del servicio **api** utilizando Docker Compose:

   ```bash
   docker-compose up --scale api=5
   ```

3. **Detener los Contenedores**:

   Para detener y eliminar los contenedores:

   ```bash
   docker-compose down
   ```

---

## Autenticación JWT

La API está protegida mediante autenticación **JWT**. Para utilizar las rutas protegidas, sigue estos pasos:

1. **Registro de Usuario**:

   Endpoint: `POST /api/auth/register`

   ```json
   {
     "name": "Kevin Ramirez",
     "email": "kevin@coordinadora.com",
     "password": "password123"
   }
   ```

2. **Inicio de Sesión**:

   Endpoint: `POST /api/auth/login`

   ```json
   {
     "email": "jkevin@coordinadora.com",
     "password": "password123"
   }
   ```

   Esto devolverá un token JWT que puedes usar para autenticarte en las rutas protegidas.

3. **Uso del Token JWT**:

   Envía el token en el encabezado `Authorization` para acceder a rutas protegidas:

   ```bash
   Authorization: Bearer <tu_token_jwt>
   ```

---

## Documentación con Swagger

La API está documentada con **Swagger**. Puedes acceder a la documentación interactiva en:

```
http://localhost:3000/api-docs
```

Desde esta interfaz puedes explorar los endpoints, probar la API, y ver las respuestas en tiempo real.

---

## Endpoints Principales

- **Eventos**:
  - `GET /api/events/getall`: Obtener todos los eventos.
  - `POST /api/events/create`: Crear un nuevo evento.
  - `GET /api/events/getbyid/:id`: Obtener un evento por ID.
  - `PUT /api/events/update/:id`: Actualizar un evento por ID.
  - `DELETE /api/events/delete/:id`: Eliminar un evento por ID.

- **Asistentes (Atendees)**:
  - `GET /api/atendee/create`: Obtener todos los asistentes.
  - `POST /api/atendee/getAll`: Registrar un nuevo asistente.
  - `PUT /api/atendee/update/:id`: Actualizar un asistente.
  - `DELETE /api/atendee/delete/:id`: Eliminar un asistente.

---

## Cargar Eventos desde un Archivo Excel

Puedes cargar eventos en lote desde un archivo **Excel**.

1. Crea un archivo **Excel** con las siguientes columnas (En '../src/templates/' encontrarás una plantilla vacia):

   | title          | description      | date                 | location           | organizerId |
   |----------------|------------------|----------------------|--------------------|-------------|
   | Concierto Rock | Música en vivo   | 2025-03-04 00:00:00  | Auditorio Nacional | 1           |

2. Sube el archivo usando el endpoint:

   - **POST `/api/events/upload`**
   - Tipo de campo: **form-data**
   - Campo: **file** (cargar archivo .xlsx)

---

## Desarrolladores

- **Kevin Andrés Ramírez Velez**
- **kevin2002core@gmail.com**
- **GitHub**: [https://github.com/kvnCore](https://github.com/kvnCore)

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

---
