const path = require("path")
const express = require('express')
const hbs = require("hbs")
const geoCode=require("./utils/geocode")
const forecast=require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set("views",viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render("index",{
        
        title:"Weather",
        name:"Nirai Arasu"
    })


})

app.get("/about",(req,res)=>{
    res.render("about",{
       title:"About me",
       name:"Nirai Arasu"
      
        
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{

        title:"Help",
        message:'If u need any assistance or found any error please ping us to the mail provided below',
        mail:"niraiarasu6@gmail.com",
        name:"Nirai Arasu"
        })
})

app.get("/weather",(req,res)=>{
    r=req.query.address
    console.log(r)
    if (!r){
        return res.send({
            error:"You must provide an address"
        })
    }
    
        if (r){
            geoCode(r,(error,{lattitude,longitude,location}={})=>{
                
                if (error){
                    return res.send({ error})
                }
                
                forecast(lattitude,longitude,(error,forecastData)=>{
                    if (error){
                        return res.send({error})
                    }
                    res.send({
                        forecastData,
                        location,
                        address:r

                    })
                   
                })
                
            
            })
           
           

            
            }
            
        
    })
    


app.get("/help/*",(req,res)=>{
    res.render("error",{
        title:"404",
        
        errorMessage:"Help article not found",
        name:"Nirai Arasu"
    })

})
app.get("*",(req,res)=>{
    res.render("error",{
        title:"404",
        errorMessage:"Page not found",
        name:"Nirai Arasu"
    })

})

app.listen(port,()=>{
    console.log("Server is up on port"+ port)

})