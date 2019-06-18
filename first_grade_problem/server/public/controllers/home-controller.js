const home = function () {
    const index = function (ctx) {
        ctx.partial('views/home/home.hbs');
    };
    return{
        index,

    }
}();