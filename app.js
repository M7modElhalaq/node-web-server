const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = 3000;

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('views engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) throw err;
    });

    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Error Page',
        welcomeMessage: 'The website is updating now, please come soon.'
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send(`<h3>Hello World!</h3>`)
    // res.send({
    //     name: 'Mhmod',
    //     age: 21,
    //     likes: [
    //         'Egg',
    //         'Apples'
    //     ]
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the website.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Something wrong. Please refers the page."
    });
});

app.listen(port, () => {
    console.log("Server is running...");
});