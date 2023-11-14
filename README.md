<h1 align="center"> :computer: 2023 - 2do cuatrimestre - Laboratorio 4 :computer: </h1> 
<h1 align="center"> TP - FINAL Clinica OnLine </h1> 
**Deploy en Firebase:** [Ir a Clinica OnLine](tp-clinica-labiv.web.app/)

<br>
<br>
## Idea del proyecto
En este Tp se busca dise una app que simule la actividad de una clinica online, siguiendo:
<i>"La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.
Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es 30 minutos. 
Los profesionales pueden cambiar la duración según su especialidad. Estos profesionales pueden tener más de una especialidad.
También contamos con un sector dentro de la clínica que se encarga de la organización y administración de la misma."
</i>

## Primeros pasos en la clinica

En primer lugar te encontraras con una pagina de bienvenida donde se encuentra el logo de la clinica y un slogan. En la parte inferior del slogan se observas dos opciones: un Inicio de sesion y un Registro donde podras registrate.

![bienvenida](src/assets/Img_readme/Bienvenida.PNG)


## Registro

Aca podes elegir si queres registrar un paciente o especialista

![registro](src/assets/Img_readme/Registro.PNG)

## Paciente - Registro

Se piden los datos necesarios para integrar un paciente al sistema, este debe agregar 2 fotos

![registro-paciente](src/assets/Img_readme/registroPaciente.PNG)

## Especialista - Registro

Se piden los datos necesarios para integrar un especialista al sistema, este debe agregar una foto y seleccionar sus especialidades

![registro-especialista](src/assets/Img_readme/registroEspecialista.PNG)

## Inicio sesión

Aca se ingresa el mail y contraseña, ademas tenemos accesos rapidos a diferentes cuentas.

![inicio-sesion](src/assets/Img_readme/InicioSesion.PNG)


## :sunglasses: Administracion (Admin) :sunglasses:

Aqui podra acceder el administrador, puede ejecutar acciones como:

### Listar Turnos

Veras todos los turnos que hubo

### Añadir Turno

Podrá registrar un nuevo turno seleccionando Especialista y Paciente

### Usuarios

Veras todos los usuarios dentro del sistema.

Se podra habilitar/deshabilitar especialistas en el sistema

Podrá agregar un nuevo administrador en categoría Administradores

### Añadir Adm

Sólo aqui se podra registrar usuarios de tipo Administrador

## 	:woman_health_worker: Especialista :man_health_worker:

### Mis Turnos

Verás los turnos que tienes o tenías disponible

### Pacientes 

Verás la historia clinica de los pacientes que en algún momento tuviste

### Comentarios

Verás los comentarios que recibiste por parte de los pacientes

## :mask: Pacientes :sneezing_face:

### Mis Turnos

Verás los turnos que tienes o tenías disponible

### Añadir Turno

Podrás generar un nuevo turno

### Comentarios

Verás los comentarios de todos los Especialistas