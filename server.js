const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server.log.');
    }
  });
  next();
})

app.use((req, res, next) => {
  res.render('maintainese.hbs');
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('index.hbs',{
    pageTitle: 'Home',
    welcomeMessage: 'This is your home',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  })
});

app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    name: 'Andrew',
    email: 'andrew@g.com'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 400,
    errorMessage: 'something goes wrong'
  });
})

app.listen(port, ()=> console.log(`Server is on port ${prot}.`));
