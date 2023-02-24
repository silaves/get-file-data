# get-file-data 

## Guía rápida para levantar la aplicación
Puede levantar la aplicación de 3 maneras.

- **Entorno de desarrollo:** A nivel local con configuración para desarrollo. (Punto 1) 
- **docker-compose:** Ejecutando el comando `docker-compose up -d --build`, la manera mas sencilla. (Punto 2)
- **docker:** Creando la imagen y corriendo el contenedor. (Punto 5)

**NOTA:** No olvide crear el archivo `.env` antes de ejecutar los anteriores puntos. Puede copiarse del archivo `.env.example` que ya tiene las variables configuradas.
Ej. `cp .env.example .env`
## 1. Configuración del entorno de desarrollo

a. Clonar repositorio

```bash
git clone .....
```

b. Instalar dependencias

```bash
npm install
```

Generar archivo `.env`
```bash
cp .env.example .env
```

Ejecutar la aplicación en modo de desarrollo

```bash
npm run start
```

Ejecución de pruebas unitarias

```bash
npm run test
```

## 2. Docker-compose

El siguiente proyecto contiene `docker-compose.yml` que configura todo el entorno de desarrollo.
Ejecute `docker-compose up -d --build` para ejecutar la pila de desarrollo. Tenga en cuenta que la 
carpeta del proyecto se monta en la imagen docker y aplicación se inicia en modo `development`, 
cualquier cambio en el código fuente se volverá a cargar la aplicación por lo que es más fácil para el desarrollador.

## 3. Creación de una imagen Docker

```bash
docker build -t get-file-data:latest -f Dockerfile.prod .
```

## 4. Configuración

### Variables de entorno `.env`
Las variables de configuración de la aplicación se encuentran en los ficheros `.env.*`.

Tenga en cuenta que `.env` no se registra en el repositorio Git. Debe crearse por separado y suministrarse
al contenedor Docker en ejecución, por ejemplo, a través de volúmenes montados.


### Panel de control

PM2 permite al usuario utilizar el panel de control de supervisión en tiempo real. Para ejecutar su versión de consola ejecute

```bash
docker exec -it get-file-data pm2 monit
```
**NOTA:** Disponible si se usa `Dockerfile.prod` o en despliegue en producción (Punto 5).
### Healthcheck

La aplicación utiliza la librería [lightship](https://github.com/gajus/lightship#lightship) para manejar los chequeos de salud de la aplicación.
.

La aplicación expone 3 puntos finales REST adicionales en **puertos separados**:

- `/health`
- `/live`
- `/ready`

El número de puerto depende de 1 variable de entorno (configurada en el archivo `.env`):

- `LIGHTSHIP_PORT` - puerto adicional que healthchecks endpoints estará disponible
  
**NOTA:** Disponible si se usa `Dockerfile.prod` o en despliegue en producción (Punto 5).
## 5. Despliegue a producción

Para el despliegue en `production` de la aplicación:

1. Cree la imagen del contenedor `docker build -t get-file-data:latest -f Dockerfile.prod .`.
2. Cree o copie el archivo `.env`. `cp .env.example .env`
3. Inicie el contenedor y monte el archivo `.env` como volumen

```bash
docker run -d -v /$(pwd)/.env:/app/.env -p 8000:8000 -p 9000:9000 --name get-file-data get-file-data:latest
```

- La aplicación es accesible a través del puerto `8000`.
- El puerto `9002` se utiliza para healthchecks.

## 6. APIs disponibles
### GET - Obtener información de todos los archivos
API: `GET /api/files/data`

Curl:
```bash
curl --location --request GET 'localhost:8000/api/files/data'
```

### GET - Listar los archivos disponibles
API: `GET /api/files/list`

Curl:
```bash
curl --location --request GET 'localhost:8000/api/files/list'
```

### GET - Buscar por nombre de archivo
API: `GET /api/files/list?fileName=<filename>`

Curl:
```bash
curl --location --request GET 'localhost:8000/api/files/list?fileName=test3.csv'
```