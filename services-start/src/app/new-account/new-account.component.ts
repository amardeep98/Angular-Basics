import { Component, EventEmitter, Output } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  //providers: [LoggingService]                    //to be provided if not provided at a higher level
})
export class NewAccountComponent {

  constructor(private loggingService: LoggingService, private accountsService: AccountsService){

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.onAccountAdded({name: accountName, status: accountStatus});
    this.loggingService.logStatusChange(accountStatus);

  }
}
