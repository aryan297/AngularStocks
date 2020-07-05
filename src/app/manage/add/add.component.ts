import { Component, OnInit } from '@angular/core';
import {MainService} from "../../main.service"
import {FormBuilder,FormGroup} from "@angular/forms"
import { Observable } from 'rxjs';
import {Router} from "@angular/router"
import {MatSnackBar} from "@angular/material/snack-bar"
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form:FormGroup;

  constructor(private service:MainService,private fb:FormBuilder, private route:Router, private _snack:MatSnackBar) { 

    this.form=this.fb.group({
    company:[''],
    Mname:[''],
    Bno:[''],
    quantity:[''],
    costPrice:[''],
    sellingPrice:[''],
    Mdate:[''],
    Edate:['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.service.postMedData(this.form.value).subscribe(data=>{
      console.log(data);
      
    })
    console.log(this.form.value);

    this._snack.open("successdully Added", "cancel", {
      duration: 3000,
    });


    this.form.reset();
    
  }

  



}
