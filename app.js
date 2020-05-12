const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(morgan('common'))

const apps = require('./appStore.js')

app.get('/apps',(req,res)=>{
    const { sort = " ", genre = ""} = req.query;
    let results = [];
    console.log(sort)
    if (sort) {
        if (!['Rating','App', " "].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be ranking or app');
        }
        else{
            results = apps.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
        }
      }
      if (genre) {
        if (!['Action','Puzzle','Strategy','Casual','Arcade','Card',""].includes(genre)) {
          return res
            .status(400)
            .send('No such category. Try again!');
        }
        else{
            results = apps.filter(app=>
                app.Genres.includes(genre)
            )
        }
      }

    
     
    res.json(results)
});

app.listen(8000, ()=>{
    console.log("server started on port 8000")
})
