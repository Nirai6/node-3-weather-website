const request = require("request")
const  forecast=(lattitude,longitude,callback) =>{
    const url="http://api.weatherstack.com/current?access_key=4ca9f24b3ff1516d58f67670bed79c8f&query="+lattitude+","+longitude+"&units=f"
    request({url,json:true},(error,{body})  =>{
    
        if (error){
            callback("Weather app server down",undefined)
        }
        else if(body.error){
                    callback("unable to find location")
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+" The temperature is "+body.current.temperature +"and it feels like "+body.current.feelslike)
        }
    })

    
}
module.exports=forecast