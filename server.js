
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3100 ;
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

//git reset --mixed origin/master
// git add .
// git commit -m "This is a new commit for what I originally planned to be amended"
// git push origin master

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

app.listen(port,()=>{
   console.log(`Server is running.. ${port}`);
});