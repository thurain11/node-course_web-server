
const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
      console.log('Unable to append to server.log');
  });
   next()
});

// app.use((req,res,next)=>{
//   res.render('mainstance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().toString()
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        home:'Welcome to my Website',
    
    })
});


app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        home: 'About page',
    
    });
});

app.listen(3100,()=>{
   console.log("Server is running..");
});