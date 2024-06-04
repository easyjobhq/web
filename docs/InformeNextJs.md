# Informe - Taller de Frontend con Next.js
- Juan Jose Diaz
- Luis Charria
- Mateo Silva
---
- **Docente:** Leonardo Bustamante

### Objetivo
Desarrollar una aplicación frontend robusta con Next.js, implementando las funcionalidades requeridas y siguiendo las mejores prácticas de desarrollo web.

#### Autenticación
- **Implementación:** Se creó un sistema de autenticación basado en tokens JWT (JSON Web Tokens) utilizando Next.js y Auth.js.
- **Funcionalidades Implementadas:** 
  - Los usuarios pueden registrarse e iniciar sesión.
  - Se implementaron rutas protegidas que requieren autenticación para acceder.
- **Tecnologías Utilizadas:** Next.js, Auth.js.

#### Autorización
- **Implementación:** Se definieron dos roles diferentes: cliente y profesional. 
- **Funcionalidades Implementadas:** 
  - Se establecieron permisos basados en roles para restringir el acceso a ciertas rutas y funcionalidades.
  - Se gestionaron los roles de manera adecuada, mostrando o escondiendo elementos de la interfaz según el rol del usuario.
- **Tecnologías Utilizadas:** Next.js, Context API.

#### Interfaz de Usuario
- **Implementación:** Se diseñó una interfaz de usuario atractiva y funcional utilizando componentes de React y estilos personalizados.
- **Funcionalidades Implementadas:** 
  - Se crearon páginas para listar profesionales, agendar citas, hacer preguntas y dejar reseñas.
  - Se implementó paginación, validación de formularios y manejo de mensajes de error.
- **Tecnologías Utilizadas:** React, Material UI

#### Gestión del Estado
- **Implementación:** Se utilizó Context API para la gestión del estado de la aplicación, centralizando la información de autenticación y autorización, así como los datos principales consumidos por la aplicación. Además, se utilizó para manejar las búsquedas de empleados por criterios como la especialidad y ciudad, permitiendo la comunicación entre componentes de manera más fácil y eficiente.
- **Funcionalidades Implementadas:** 
  - Se gestionó el estado de autenticación y autorización de manera centralizada.
  - Se manejó el estado de los datos principales de la aplicación, incluyendo las búsquedas de empleados por criterios como la especialidad y ciudad.
- **Tecnologías Utilizadas:** React, Context API.


#### Funcionalidades
- **Implementación:** Se implementaron todas las funcionalidades requeridas, incluyendo la búsqueda de profesionales por ciudad y especialidad, la agenda de citas, la realización de preguntas y la dejada de reseñas por parte de los clientes. Los profesionales pueden ver y gestionar las citas, preguntas y reseñas recibidas en sus perfiles.
- **Funcionalidades Implementadas:** 
  - Búsqueda de profesionales por ciudad y especialidad.
  - Agenda de citas para clientes.
  - Realización de preguntas y reseñas por parte de los clientes.
  - Gestión de citas, preguntas y reseñas para los profesionales.
- **Tecnologías Utilizadas:** Next.js, React, Context API.

