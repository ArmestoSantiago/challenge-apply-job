# Pasos

## Step 1 — Crear el repositorio en GitHub

Creá un repositorio público en GitHub. Hacé al menos un commit inicial y tené a mano la URL del repo (ej: https://github.com/tu-usuario/tu-repo). La vas a necesitar en el Step 5.

## Step 2 — Obtener tus datos de candidato

Hacé una llamada GET a la API pasando tu email como parámetro:

GET {BASE_URL}/api/candidate/get-by-email?email=TU_EMAIL

Respuesta (200):

...

Estos los vas a usar para enviar tu postulación.

## Step 3 — Obtener la lista de posiciones abiertas

Hacé una llamada GET para obtener las posiciones disponibles:

GET {BASE_URL}/api/jobs/get-list

Respuesta (200):

...

## Step 4 — Mostrar un listado de posiciones

Creá un componente en React que muestre un listado de las posiciones obtenidas en el paso anterior. Cada item de la lista debe incluir:


Título de la posición (title)

Un campo de input donde puedas ingresar la URL de tu repositorio de GitHub

Un botón "Submit" para enviar tu postulación a esa posición

Usá el estilo que prefieras — lo importante es que se vea prolijo y funcional.


## Step 5 — Enviar tu postulación

Presioná el botón "Submit" para la posición a la que estás aplicando dentro de esta lista, llamando a la API con el siguiente body:


POST {BASE_URL}/api/candidate/apply-to-job

Content-Type: application/json

Body:




Respuesta exitosa (200):

{ "ok": true }

...

## Requisitos

Usar React (cualquier versión).

Mostrar un listado de posiciones obtenido de la API.

Cada posición debe tener un campo de input para la URL del repo de GitHub y un botón "Submit".

El botón debe hacer el POST con el body correcto.
Manejar estados de carga y error en la UI.
