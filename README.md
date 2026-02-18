# ILNIA Test

Prueba técnica Full Stack utilizando **Symfony (Backend)** y **React (Frontend)**.

El objetivo del proyecto es:

- Crear un endpoint en Symfony que calcule la suma de dos números.
- Crear una interfaz en React que consuma dicho endpoint.
- Ejecutar todo el proyecto mediante Docker.

Repositorio:

https://github.com/freyeswp/ilnia-test.git

---

#  1. Clonar el proyecto

```bash
git clone https://github.com/freyeswp/ilnia-test.git
cd ilnia-test
```

---

# 2. Requisitos

## Para ejecución con Docker (recomendado)

- Docker
- Docker Compose

## Para ejecución manual

- PHP 8+
- Composer
- Node.js 18+
- npm

---

# 3. Ejecución con Docker (Recomendado)

Desde la raíz del proyecto ejecutar:

```bash
docker-compose up --build
```

Esto levantará:

- Backend (Symfony) → http://localhost:8000
- Frontend (React) → http://localhost:3000

La aplicación principal es el frontend.

Abrir en el navegador:

http://localhost:3000

---

#  4. Ejecución Manual (Sin Docker)

## 4.1 Backend

```bash
cd backend
composer install
symfony serve
```

Disponible en:

http://localhost:8000

---

## 4.2 Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

Disponible en:

http://localhost:3000

Si el backend corre en otra URL, configurar:

```bash
REACT_APP_API_URL=http://localhost:8000
```

---

#  Parte 1 — Backend (Symfony)

## Endpoint implementado

```
POST /api/sum
```

## Request Body

```json
{
  "a": 3,
  "b": 7
}
```

## Respuesta exitosa

```json
{
  "sum": 10
}
```

## Respuesta de error (HTTP 400)

```json
{
  "error": "Both 'a' and 'b' must be numeric."
}
```

## Validaciones implementadas

- Ambos campos son obligatorios.
- Ambos deben ser numéricos.
- Devuelve HTTP 400 en caso de error.
- Devuelve JSON válido con headers correctos.
- No utiliza base de datos.

## Ubicación del controlador

```
backend/src/Controller/SumController.php
```

---

#  Parte 2 — Frontend (React)

La interfaz incluye:

- Dos inputs numéricos (a y b)
- Botón “Calculate”
- Estado de carga (“Calculando…”)
- Visualización del resultado
- Manejo de errores
- Uso de React Hooks
- Uso de fetch para comunicación con backend

## Flujo de funcionamiento

1. El usuario ingresa dos números.
2. Presiona el botón "Calculate".
3. Se envía un POST a `/api/sum`.
4. Se muestra el resultado o el error correspondiente.

## Archivos principales

Componente principal:

```
frontend/src/components/SumCalculator.jsx
```

Servicio de comunicación con backend:

```
frontend/src/services/sumService.js
```

Componente raíz:

```
frontend/src/App.js
```

---

#  5. Prueba manual del endpoint

```bash
curl -X POST http://localhost:8000/api/sum \
  -H "Content-Type: application/json" \
  -d '{"a":3,"b":7}'
```

Respuesta esperada:

```json
{
  "sum": 10
}
```

Ejemplo de error:

```bash
curl -X POST http://localhost:8000/api/sum \
  -H "Content-Type: application/json" \
  -d '{"a":"foo","b":7}'
```

Respuesta:

```json
{
  "error": "Both 'a' and 'b' must be numeric."
}
```

---

#  6. Estructura del Proyecto

```
ilnia-test
├── README.md
├── backend
│   ├── .editorconfig
│   ├── .env
│   ├── bin
│   │   └── console
│   ├── composer.json
│   ├── composer.lock
│   ├── config
│   │   ├── bundles.php
│   │   ├── nelmio_cors.yml
│   │   ├── packages
│   │   │   ├── cache.yaml
│   │   │   ├── framework.yaml
│   │   │   ├── nelmio_cors.yaml
│   │   │   └── routing.yaml
│   │   ├── preload.php
│   │   ├── reference.php
│   │   ├── routes
│   │   │   └── framework.yaml
│   │   ├── routes.yaml
│   │   └── services.yaml
│   ├── public
│   │   └── index.php
│   ├── src
│   │   ├── Controller
│   │   │   └── SumController.php
│   │   └── Kernel.php
│   ├── symfony.lock
│   ├── var
│   │   └── cache
├── docker
│   ├── backend
│   │   ├── Dockerfile
│   │   └── entrypoint.sh
│   └── frontend
│       ├── Dockerfile
│       ├── entrypoint.sh
│       └── package-lock.json
├── docker-compose.yml
└── frontend
    ├── .env
    ├── README.md
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── logo192.png
    │   ├── logo512.png
    │   ├── manifest.json
    │   └── robots.txt
    └── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── components
        │   └── SumCalculator.jsx
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── services
        │   └── sumService.js
        └── setupTests.js

```
