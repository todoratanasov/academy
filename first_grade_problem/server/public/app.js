const app = Sammy('#container', function(){
    this.use('Handlebars', 'hbs');

    this.get('#/', home.index);
    this.get('#/register', user.getRegister);
    this.post('#/register', user.postRegister)
    this.get('#/login', user.getLogin);
    this.post('#/login', user.postLogin);
});

$(()=>app.run('#/'));