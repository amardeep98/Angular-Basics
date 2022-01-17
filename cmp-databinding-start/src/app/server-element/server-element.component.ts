import { 
  Component, 
  DoCheck, 
  Input, 
  OnChanges, 
  OnInit, 
  ViewEncapsulation 
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated  //None, ShadowDom
})
export class ServerElementComponent implements 
OnInit, 
OnChanges,
DoCheck 
{

  @Input('srvElement') element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit called");
  }

  ngOnChanges(){
    console.log("ngOnChanges called");
  }

  ngDoCheck(){
    console.log("ngDoCheck called");
  }

}
