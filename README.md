# DVI Práctica Final: The Legend of ~~Link~~ Zelda
Práctica final de la asignatura Desarrollo de videojuegos mediante tecnologías web de la Facultad de informática de la Universidad Complutense de Madrid.

En esta práctica final se desarrolla un videojuego de plataformas 2D basado en [_Zelda 2_](https://www.youtube.com/watch?v=5Yf7zGjbfFQ&), publicado por Nintendo en 1987 y en [_Link: The faces of evil_](https://www.youtube.com/watch?v=gqUVVbObaEM&) y [_Zelda: The wand of Gamelon_](https://www.youtube.com/watch?v=GoO2HfYTZsI), desarrollados por  Animation Magic en 1993. Se pueden consultar gameplays de los juegos originales pulsando en los enlaces que hay en sus títulos.

Se puede probar el juego implementado en esta práctica siguiendo [este enlace](https://francg07.github.io/DVI-PracticaFinal/).

# Diseño del juego
En este apartado se explica el objetivo del juego, sus mecánicas principales y los personajes que aparecen.

## Objetivo del juego
El objetivo principal del juego es llevar a Link hasta la Trifuerza. Para ello tendrá que avanzar por dos mapas plagados de enemigos y enfrentarse a ellos para conseguir alcanzar la sala del jefe final que posee la Trifuerza.

## Mecánicas principales
Las mecánicas principales del juego son las siguientes:
- Movimiento en 2 dimensiones
- Salto
- Ataque con la espada
- Colocar bombas
- Obtener aumentos de vida
- Obtener llaves para abrir puertas bloqueadas
- Obtener protección contra lanzas
- Obtener mejora de velocidad y salto
- Sobornar a los enemigos
- Tener objetos con mejoras frente a ciertos enemigos

## Controles
- Flechas izquierda y derecha: para mover al personaje en esas direcciones
- Flecha arriba: para saltar
- Barra Espacio y Z: para atacar
- S: para soltar una bomba
- D: para soltar una rupia
- C: para activar/desactivar el efecto del casco
- Control: para uso "admin", pensado para poder explorar más fácilmente el juego. Otorga mayor daño, todos los buffos y 10 corazones, 10 bombas y 10 llaves.

## Personajes
Los personajes principales del juego son:
- Link: es el personaje controlado por el jugador

  ![Imagen de Link](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/Link.png)
  
  - ![Imagen de Espada](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/sword.png) Arma base de Link que usará en sus ataques
  - ![Imagen de Rayo](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/ray.png) Rayo que saldrá de la espada de Link en caso de tener los corazones de vida completos
  
- Enemigos principales: los enemigos en el camino de Link
  - Stalfos
  
  ![Imagen de un Stalfos](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/stalfos.png)
  
  Enemigo básico del juego, se desplaza lateralmente de forma rápida, tiene poca vida y causa poco daño.
  
  - Armos

  ![Imagen de un Armos](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/armos.png)
  
  Enemigo básico del juego, se desplaza lateralmente a velocidad media, tiene vida media y causa daño medio.
  
  - Moblin 

  ![Imagen de un Moblin](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/moblin.png)
  
  Enemigo especial del juego, con movimiento lateral lento, gran cantidad de vida y mucho daño al golpear de cerca. Si Link se encuentra a rango de él le arrojará lanzas.
  
  - Acheman
  
  ![Imagen de un Acheman](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/acheman.png)
  
  Enemigo especial del juego, se desplaza lateralmente por el aire con cambios de sentido aleatorios. Tiene muy poca vida y causa poco daño.
  
  - Militron 
  
  ![Imagen de Militron](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/militron.png)
  ![Imagen de ataque de Militron](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/militronFire.png)
  
  Minijefe del juego, se desplaza lateralmente de forma lenta con cambios de sentido aleatorios y tiene mucha vida y mucho daño. Si Link tiene el guante recibirá más daño. También arroja bolas de fuego que causan un daño menor.
  
  - Ganon
  
  ![Imagen de Ganon](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/ganon.png)
  ![Imagen de ataque de Ganon](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/ganonFire.png)
  ![Imagen de flama de Ganon](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/flame.png)
  
  Jefe final del juego. Se desplaza lateralmente de forma lenta con cambios de sentido aleatorios y arroja fuego que se queda en el suelo. Tiene mucha vida y causa mucho daño.
  
- Algunos items del juego: unos son aumentos y otros de uso

  ![Imagen de Corazón](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/heartContainer.png) - Dará un corazón más a Link y curará los dañados o sólo curará un corazón, depende del tipo de corazón
  
  ![Imagen de cura Corazón](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/heart.png) - Curará un corazón dañado de Link, se encuentra como botín de los enemigos
  
  ![Imagen de la LLave](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/key.png) - Necesarias para abrir las puertas por el mapa
  
  ![Imagen de la Bomba](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/bomb.png) - Se depositan en el suelo y explotarán al cabo de unos segundos dañando a cualquiera alrededor, se encuentra como botín de los enemigos
  
  ![Imagen de la Rupia](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/ruby.png) - Se deposita en el suelo y si es recogido por un enemigo se quedará quieto y o dañará a Link, si no ocurre tras unos segundos volverá a ser una rupia normal, se encuentra como botín de los enemigos
  
  ![Imagen del Casco](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/helmet.png) - Buffo que aumenta la velocidad y altura de salto de Link, una vez obtenido puede activarse y desactivarse su efecto
  
  ![Imagen del Escudo](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/shield.png) - Buffo que dará protección a Link contra a los proyectiles que le vengan de frente
  
  ![Imagen del Guantelete](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/gauntlet.png) - Buffo que sirve para hacerle más daño al miniboss Militron, sin el cuál el daño realizado hacia él será reducido
  
  ![Imagen del Agua](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/water.png) - Buffo que reduce el daño recibido por ataques de fuego de Ganon y da la capacidad de apagar las llamas que deja golpándolas con la espada.
  
  ![Imagen del Libro](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/libro.png) - Objeto de mapa necesario para pasar al siguiente nivel
  
  ![Imagen de la Trifuerza](https://github.com/FrancG07/DVI-PracticaFinal/blob/main/images/readme-images/triforce.png) - Objetivo final del juego, conseguido tras derrotar a Ganon
  
# Vídeo gameplay
[Enlace del Vídeo](https://youtu.be/X1Duo10ToR4)
# Implementación
Para la realización del juego se ha empleado la librería JavaScript [Quintus](http://www.html5quintus.com/) y los lenguajes de programación HTML5 y JavaScript.

La lógica del juego se ha creado en los siguientes archivos que representan la arquitectura del proyecto:
- game.js: se encarga de inicializar Quintus, cargar los archivos que necesita el juego, llamar a las funciones de carga del resto de elementos del juego y poner la primera escena del juego.
- animations.js: carga los sheets de las animaciones de los sprites del juego y define las animaciones que utilizan.
- enemies.js: define la lógica de los enemigos del juego y del componente defaultEnemy que estos utilizan.
- miscellaneous.js: define la lógica de diversos elementos del juego, tales como la espada, las bombas, las llaves, etc.
- player.js: define la lógica del personaje controlado por el jugador, Link.
- scenes.js: define las diversas escenas de las que hace uso el juego.
# Equipo de trabajo y reparto de tareas
Los miembros del equipo y el porcentaje de trabajo realizado por cada uno de ellos es el siguiente:
-  [Francisco García Navarrete](https://github.com/FrancG07): 50%. Encargado del diseño de los niveles, de la obtención de los sprites y sonidos, del diseño e implementación de Link, Stalfos, Armos y Moblin además de los comportamientos de los aumentos de vida, llaves, puertas y bombas junto a las animaciones de todos estos elementos, además de la redacción de la memoria.
-  [Ari Rubén Simao Chaves](https://github.com/Ruben-SC): 50%. Encargado del ataque con lanza del Moblin, del rayo de la espada de Link, de los buffos, de los enemigos Acheman, Militron y Ganon, de diversos ajustes en las mecánicas y diseño del juego, de los vídeos de la demo y gameplay y de la redacción de la memoria.

# Referencias
Los recursos utilizados en este proyecto se han obtenido de las siguientes fuentes:
- Librerías: [Quintus](http://www.html5quintus.com/)
- Edición del mapa: [Tiled](https://www.mapeditor.org/)
- Efectos de sonido: [HelpTheWretched](http://noproblo.dayjo.org/ZeldaSounds/)
- Música: Descargada desde [YouTube](https://www.youtube.com/)
- TileSet: [Super Mario All-Stars: Super Mario Bros. & The Lost Levels](https://www.spriters-resource.com/snes/smassmb1/sheet/6211/)
- Sprites: [Link: The Faces of Evil](https://www.spriters-resource.com/cd_i/linkthefacesofevil/) y [Zelda: The Wand of Gamelon](https://www.spriters-resource.com/cd_i/zeldathewandofgamelon/)
- BackGrounds: [Terraria fandom](https://terraria.fandom.com/wiki/Biome_backgrounds) (primer nivel) y [Super Mario All-Stars: Super Mario Bros. & The Lost Levels](https://www.spriters-resource.com/fullview/135316/) (segundo nivel)
