const requester = function(){
  const baseUrl="http://localhost:3000"

  const sendRequest = function(url,method,data,headers){
    data=data||{};
    headers = headers||{};
    //if the user is logged in we attach the authorization token to the header;
    if(storage.getData('authToken')){
      const token = storage.getData('authToken')
      headers.Authorization = `Bearer ${token}`;
    };
    return axios({
      method: method,            
      url: `${baseUrl+url}`,
      data: data,
      headers:headers
    });
  };
  return{
    sendRequest,
  }
}();
