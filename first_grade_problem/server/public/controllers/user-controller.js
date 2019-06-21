import requester from "../helpers/requester"
exports.registerPost = ()=>{
    document.getElementById("registerForm").onsubmit = function(event) {
        event.preventDefault();
        event.stopPropagation();
        const inputs=event.target.elements;
        const email = btoa(inputs["email"].value);
        const username = btoa(inputs["username"].value);
        const password = btoa(inputs["password"].value);
        
        const data = {email,username,password};
        
        requester.sendRequest("/user/register", "POST", data)
          .then((result)=>{
            //todo here to store the token from the back-end
            window.location.href = "/"
          })
          .catch((err)=>{
            console.log(`this is register error ${err}`);
          })                        
    }
}