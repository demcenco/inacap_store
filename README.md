[![Inacap Store](https://user-images.githubusercontent.com/103654022/179422435-ba266e3a-f690-4e55-8cdb-e9984e3d1549.png)](https://inacap.store)


## Que es InacapStore?
[InacapStore](https://inacap.store) es una aplicacion web que permite administrar un negocio o bazar, sus principales caracteristicas son: 
- Administracion de usuarios
- Administracion del inventario
- Manejo de turnos
- Emision de facturas y boletas
- Sistema de creacion de ordenes
- Reportes detallados

## Pasos de instalacion para produccion
Prerequisitos:
- Docker Compose instalado

Clonar el repositorio de forma local:
```
git clone https://github.com/demcenco/inacap_store
cd ./inacap_store
```
Ejecutar el archivo docker-compose.yml
```
docker-compose up
```
Para versiones mas actuales de docker ejecutar con:
```
docker compose up
```

## Pasos para desarrollo
Prerequisitos:
- Node.js 16 

Clonar el repositorio de forma local:
```
git clone https://github.com/demcenco/inacap_store
```
La aplicacion se encuentra en la ruta ```/app``` , posteriormente instalar las dependencias para el desarrollo e iniciar el servidor de desarrollo
```
cd ./inacap_store/app
npm install
npm run dev
```
La aplicacion estara disponible en http://localhost:3044