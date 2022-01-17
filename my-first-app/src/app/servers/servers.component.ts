import { Component, OnInit } from '@angular/core';
import { ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  //selector: 'app-servers',
  // selector: '[app-servers]',                             //using selector as attribute
  selector: '.app-servers',                                 //using selector as class, using selector as Id not supported by Angular
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = "No server was created";
  serverName = "TestServer";
  serverCreated = false;
  servers = ["TestServer 1", "TestServer 2"];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server was created. Name is "+ this.serverName;
  }

  onUpdateServer(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
