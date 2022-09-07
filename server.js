const path = require('path');
const routes = require('./controllers/');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//place all app.use() statements
app.use(express.static(path.join(__dirname, 'public')));