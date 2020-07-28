const request =require("request")
const geoCode =(address,callback)=>{
    const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmlyYWkiLCJhIjoiY2tkMjYwNTN4MWExZDMxb3VhMWQ3N2E3YiJ9.bsdYtA7pBFp0Auha-lBUog&limit=1"
    request({url,json:true},(error,{body})=>{
        if (error){
            callback("geolocation server is down",undefined)
        }
        else if(body.message === "Not Found"){
            callback("Please enter the location",undefined)
        }
        else if(body.features.length === 0){
        callback("Enter with proper keyword",undefined)
        }
        else {
            
            const lattitude=body.features[0].center[1]
            const longitude=body.features[0].center[0]
            const location=body.features[0].place_name
            callback(undefined,{
                lattitude,
                longitude,
                location
            
            })
        }


    })
}

module.exports=geoCode