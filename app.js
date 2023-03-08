const express = require('express');
const bodyParser = require('body-parser');
const connectFlash = require('connect-flash');
const passport = require('passport');
const expressSession = require('express-session');
const { createRoles } = require('./libs/initialSetup')
//const ConnectMongo = require('connect-mongo')(expressSession);

const app = express();
createRoles();
require('./db');
//require('./config/passport');

//Middlewares Globales
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(connectFlash());
app.use(passport.initialize());
app.use(expressSession({
    secret: 'pruebaSecret',
    resave: true,
    saveUninitialized: true,
 //   store: new ConnectMongo({mongooseConnection: mongoose.connection})
}));
app.use(passport.session());

//Rutas
app.use(require('./routes/dependencies'));
app.use(require('./routes/users'));
app.use(require('./routes/auth'));

//Variables Globales
app.use((req, res, next) => {
    res.locals.sucess_mg = req.flash('sucess_msg');
    res.locals.error_mg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Errores
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something Broke!')
});

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ mensaje: '¡Hola Mundo!' })
});

app.listen(port)
console.log('API escuchando en el puerto ' + port);

module.exports = app;