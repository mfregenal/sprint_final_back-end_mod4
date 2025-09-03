# 🧠 Sprint Final - Backend Módulo 4

Este proyecto representa el backend desarrollado para el sprint final del Módulo 4. Está construido con Node.js y Express, siguiendo una arquitectura modular y escalable, con especial atención a la lógica defensiva, manejo de archivos e imágenes,
y separación clara de responsabilidades.

## 🚀 Tecnologías utilizadas

- **Node.js** con ES Modules
- **Express.js**
- **MongoDB** con Mongoose
- **Multer** para manejo de archivos
- **Dotenv** para variables de entorno

## 🧩 Características principales

- Modularización de rutas y modelos
- Middleware para validaciones y manejo de errores
- Upload de imágenes con lógica defensiva
- Separación entre lógica de negocio y configuración
- Preparado para despliegue en entornos productivos

## 📄 Documentación de la API

#################################################################
                          Usuarios
#################################################################

Metodos          Endpoint                Descripción
-POST          /auth/register     Registrar usuario nuevo
-GET            /user/:id         Obtener usuario especifico
                  /user/           Obtener todos los usuarios
-PUT                -              No posee
-DELETE          /user/:id         Eliminar usuario especifico

#################################################################
                        Autenticacion
#################################################################
Metodos            Endpoint                  Descripción
-POST            /auth/login        Inicio de sesion del usuario
                /auth/logout        Cierre de sesion del usuario
-GET                /check          Verificacion de login
-PUT                 -              No posee
-DELETE              -              No posee

#################################################################
                          Categorias
#################################################################
Metodos          Endpoint                    Descripción
-POST         /api/categories/create      Crear una nueva categoria
-GET            /api/categories           Obtener todas las categorias
-PUT          /api/categories/edit        Editar una categoria
-DELETE       /api/categories/:_id        Eliminar una categoria

#################################################################
                            Productos
#################################################################
Metodos            Endpoint                      Descripción
-POST          /api/products/create       Cargar un nuevo producto
-GET            /api/products             Obtener todos los productos
                                          Obtener un producto especifico
-PUT            /api/prducts/edit          Editar un producto 
-DELETE          /api/products/:_id        Eliminar un producto

Desplegado: https://tecnonar-api.onrender.com
