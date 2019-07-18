import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "loop"
})
export class LoopPipe implements PipeTransform{
   transform(value: Array<number>, args?: any):Array<number>{
    
    if(args){
        return value.map((x)=>{return x*args})
    }else{
        return value.map((x)=>{return x*2})
    }
   }
}