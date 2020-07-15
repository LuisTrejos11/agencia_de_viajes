// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({path: 'variables.env'});

//proar la conexion a la db
//db.authenticate()
  //  .then(()=> console.log('Base de datos conectada'))
    //.catch((error)=> console.log(error));


// configurar express
const app = express();

// habilitar pug
app.set('view engine', 'pug');

// añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar carpeta statica llamada pug
app.use(express.static('public'));



// validar si estamos en desarrollo o en producción

const config = configs[app.get('env')];
// creamos la variable para el sitio web
app.locals.titulo = config.nombreSitio;

// muestra el año actual y genera la ruta
app.use((req, res, next)=>{
    // crear una fecha 
    const fecha = new Date();
    res.locals.fechaActual = fecha.getFullYear();
    console.log(res.locals);

    res.locals.ruta = req.path;
    console.log(res.locals);
    return next();

})

// ejecutamos el bodyparser 
app.use(bodyParser.urlencoded({extended:true}));

// puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


// cargar las rutas 
app.use('/', routes());




app.listen(port, host, ()=>{
  console.log('El servidor esta funcionando');
});