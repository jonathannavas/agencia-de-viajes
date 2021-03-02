import express from 'express';
import router  from './routes/index.js';
import db from './config/db.js';

const app = express();

//conectar la base de datos
db.authenticate()
    .then(()=>{
        console.log('Base de datos conectada');
    }).catch((err) => {
        console.log(err);
    })

//definir puerto

const port = process.env.PORT || 4000;

//habilitar pug
app.set('view engine','pug');

//obtener el año actual
app.use((req,res,next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}));

//definir la carpeta publica
app.use(express.static('public'));

//agregar router

app.use('/',router);

app.listen(port,()=>{
    console.log(`El servidor esta funcionando  en el puerto ${port}`);
});