const path = require("path");
module.exports = {
    gameGet : (req,res)=>{
        res.sendFile(path.join(__dirname, "../views/game/game-homescreen.html"));
    }
}