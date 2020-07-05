import { Component, OnInit } from '@angular/core';

import {FormBuilder,FormGroup,FormControl} from "@angular/forms"
import {MainService} from "../../main.service"
import {MatSnackBar} from  "@angular/material/snack-bar"

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  form:FormGroup

  constructor(private fb:FormBuilder, private service:MainService, private _snack:MatSnackBar) {
    this.form=this.fb.group({
      Name:[''],
      DL:[''],
      GST:[''],
      Address:[''],
      Mobile:['',]

    })

   }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form.value);

    this.service.postCustomer(this.form.value).subscribe(data=>{
      console.log(data);
      
    })

    this._snack.open("successdully Added", "cancel", {
      duration: 3000,
    });

    this.form.reset();
    
  }

}
