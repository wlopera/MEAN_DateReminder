MEAN_DateReminder:
-----------------
Programa que envia recordatorios vía SMTP. Se utiliza un cron que consulta base de datos Mongo y envía correos de recordatorios de fechas importantes (cumpleaños, notas de eventos que queremos recordar, etc). 

Instalaciones Requeridas:
-------------------------

  1.- Instalar nodeJS:
  https://nodejs.org/en/download/

  2.- Instalar MongoDB
      https://www.mongodb.com/download-center#community

      En Community Service descargar
        mongodb-win32-x86_64-2008plus-ssl-3.6.3-signed.msi
      instalar
        - Abrir consola de windows - CMD
        - > mongod (opcional crear la ruta de la base de datos ex: d:\data\db)
        - > mongo (levantar la seccion - cuidado con el puerto "27017" o "27666")

  3.- Instalar Express

      http://expressjs.com/es/starter/installing.html

      Si ya esta instalado instalado Node.js, cree un directorio que contenga
      la aplicación y conviértalo en el directorio de trabajo.

       > mkdir myapp
       > cd myapp

  4.- Instalar y configurar angularJS (OPCIONAL)
  
  5.- Intslar y configurar nodemailer,js
  
  6.- Uso de cor.js, bory-parser, properties-reader, etc

  nota: Intalaciones para windows.

Adicionales:
-------------
  1.- npm install mongoose

  2.- npm install morgan

Los instaladores adicionales . Se pueden configurar en el package.json (npm install)

Configuraciones:
---------------
  Configurar package.json:  para express y mongo

      Utilice el mandato "npm init" para crear un archivo package.json para la aplicación.

        > npm init

      Este mandato solicita varios elementos como, por ejemplo, el nombre y la versión de la aplicación.
      Por ahora, sólo tiene que pulsar INTRO para aceptar los valores predeterminados para la mayoría de ellos,
      con la siguiente excepción:

      entry point: (index.js)

      Especifique app.js o el nombre que desee para el archivo principal.
      Si desea que sea index.js, pulse INTRO para aceptar el nombre de archivo predeterminado recomendado.

      A continuación, instale Express en el directorio app y guárdelo en la lista de dependencias.
      Por ejemplo:

        > npm install express --save

      Para instalar Express temporalmente y no añadirlo a la lista de dependencias, omita la opción --save:

        > npm install express

CODIGO:
------
Copiar o bajarse el codigo fuente.


Poner en funcionamiento el proyecto?

      Luego de instalar NodeJS, Angular (opcional), Express y MongoDB:

      npm install : teneis que ejecutar este comando en la carpeta del proyecto para que se descargue las librerías de express y mongose, es decir las dependencias del proyecto.
      Es similar al uso  del fichero "pom.xml" de Maven en Java

        > npm install

      Para subir el servidor en la carpeta del proyecto lanzar el comando "node server.js"

        > node server.js

      Para ver la aplicacion funcionando (el puerto es el definido en server.js)

        > http://localhost:8080:


 PRUEBA MONGO - FACTURA:
 ------------------------------       
Ejemplo de consulta en MongoDB
  > show dbs
    admin      0.000GB
    clientdb   0.000GB
    config     0.000GB
    countrydb  0.000GB
    factura    0.000GB
    local      0.000GB
    test       0.000GB
  
  > use factura
    switched to db factura
  
  > show collections;
    facturas
  
  > db.facturas.find().pretty();
  {
          "_id" : ObjectId("5cf7464aec288829f46d89df"),
          "empresa" : "PriceSmart",
          "fecha" : "02-06-2019",
          "total" : "200.05",
          "__v" : 0
  }


LINK:
-------

