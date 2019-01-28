import { Component  } from '@angular/core';
import { LhsAccountService } from './users.service';

@Component({
    selector : "users",
    templateUrl : "./users.component.html",
    styleUrls : [
        "./users.component.css",
    ]
    
})
export class UsersComponent {
    account : { 
        where : string, 
        id : string, 
        pw : string, 
        content : string};
    accounts = [];

    
    constructor(
        private accService: LhsAccountService,
      ) {

      }

    getAll() : void{


    }
    insertAcc () : void {
        let comment = {
            
        };
        console.log(comment);
        const condition = {
            
        };
        this.accService.addAcc(condition).subscribe(
            res => {
                console.log(res); 
            },
            error => {console.log(error)},
            () => {         }
        );
    }
    
}



