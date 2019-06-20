const path = require("path");
module.exports = {
    homescreenGet : (req, res)=>{ 
        res.sendFile(path.join(__dirname, "../views/home/homescreen.html"));
    }
}