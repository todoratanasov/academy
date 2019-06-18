const user = function(){
    const getRegister = function(ctx){
        ctx.partial('views/user/register.hbs');
    };
    const postRegister = function(ctx){
        const email = btoa(`${ctx.params.email}`);
        const username = btoa(`${ctx.params.username}`);
        const password = btoa(`${ctx.params.password}`);
        userModel.register(email, username, password)
            .then(function (result) {
                //we store the info about the user in the localstorage
                storage.saveData('email',result.data.email)
                storage.saveData('authToken',result.data.token);
                storage.saveData('userId', result.data.userId);
                storage.saveData('username', result.data.username);
                ctx.redirect('#/');
            })
            .catch(function(err){
                console.log(err)
            })
        
    }
    const getLogin=function (ctx) {
        ctx.partial('views/user/login.hbs')
    };
    const postLogin = function (ctx) {
        const username = btoa(`${ctx.params.username}`);
        const password = btoa(`${ctx.params.password}`);
        userModel.login(username, password)
            .then(function(result){
                storage.saveData('email',result.data.email)
                storage.saveData('authToken',result.data.token);
                storage.saveData('userId', result.data.userId);
                storage.saveData('username', result.data.username);
                ctx.redirect('#/');
            })
            .catch(function(err){
                console.log(err)
            })
    };
    return{
        getLogin,
        postLogin,
        getRegister,
        postRegister
    }
}();