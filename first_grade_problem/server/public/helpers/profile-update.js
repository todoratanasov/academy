import {sendRequest} from "../helpers/requester";
exports.updateProfile=(_id)=>{
    const data = {_id};
    sendRequest("POST", "/profile/edit", data)
        .then((result)=>{

        })
        .cach((err)=>{
            console.log(`This is an error from editing username: ${err}`)
        })
}