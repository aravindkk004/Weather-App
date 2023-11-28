$("form").submit(function(event){
    event.preventDefault();
    getDetails();
})

function getDetails(){
    var inputText = $("input").val();
    $("input").val('');
    apiFetch(inputText);
}

async function apiFetch(cityName){
    try {
        var api_key = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid={API_key}&units=metric')
            .then(res => {
                if (!res.ok) {
                    throw new Error('City not found');
                }
                return res.json();
            })
            .catch(err => {
                throw new Error('Error fetching data');
            });

        $(".container").addClass("active");
        $(".temp span").text(Math.round(api_key.main.temp));
        $(".tempImg").attr("src","./images/"+api_key.weather[0].main+".png");
        console.log(api_key.weather[0].main)
        $(".cityName").text(api_key.name);
        $(".humidityRate").text(api_key.main.humidity+" %");
        $(".windRate").text(api_key.wind.speed+" km/h");
    } catch (error) {

        $(".error").addClass("errActive");
        setTimeout(function(){
            $(".error").removeClass("errActive");
        },3000);
    }
}
