if("geolocation" in navigator){
    console.log("geolocaion available");
    const sendBtn = document.getElementById("request-btn");
    const inp = document.getElementById("inp");

    var inpVala = "";
    navigator.geolocation.getCurrentPosition(async pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        document.getElementById("latitude").textContent = lat;
        document.getElementById("longitude").textContent = lon;              
        
        var data = {lat, lon, inpVala};
        
        
        sendBtn.addEventListener("click", async () => {
            data.inpVala = inp.value;
            console.log(data);
            const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            }
            const response = await fetch("/api", options);
        });             
    });
}else{
    console.log("geolocation unavailable");
}