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
            callback(undefined,body.current.weather_descriptions[0]+".The temperature is "+((body.current.temperature - 32) * 5/9 ).toFixed(2)+" °C" +" and it feels like "+((body.current.feelslike-32)*5/9).toFixed(2)+" °C"+".The humidity is "+body.current.humidity+" % .")
        }
    })

    
}
module.exports=forecast