const axios = require("axios")

//here we pass some parameters and we use axios api to make the requests
const sendRequest = function(url,method,data,headers){
    const baseUrl="http://localhost:3000"
    data=data||{};
    headers = headers||{};    
    return axios({
      method: method,            
      url: `${baseUrl+url}`,
      data: data,
      headers:headers
    });
  };
module.exports = {
    sendRequest,
    
}  