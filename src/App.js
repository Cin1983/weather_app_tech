import React from "react";

 

class App extends React.Component {
    state = { temp: [] };
    
   
    onClickSubmit = async term => {
        const response_weather = await postMessage.get("api.openweathermap.org/data/2.5/weather?id=2172797&appid", {
            params: { id: term }
           headers: {
                Authorization: "Client-ID fbc42b71a1f25bdcec4ba6705cfcb970"
               
            }
        });
    
  
    render() {
        return (
            <div>


            </div>
        )
    }
}



    export default App;