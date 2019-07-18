import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //тук се вкарва темплейта (файла, който ще държи html-а)
  templateUrl: './app.component.html',
  //тук се вкарват css файловете
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'second-app';
  index = null;
  button = "submit"
  //така подаваме масив, на който сме му подали any[]
  numbers: any[] = []
  submit(){
    this.numbers.push(this.val);
    this.val = "";
    
  }
  edit(i){
    let value = this.numbers[i]
    this.val=value;
    this.index = i;
  }
  delete(i){
    this.numbers.splice(i,1)
  }
  save(index){
    this.delete(index);
    this.numbers.splice(index,0,this.val);
    this.val="";
    index=null;
  }
  val = "";
}
