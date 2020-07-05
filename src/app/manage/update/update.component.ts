import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl} from "@angular/forms"
import {MainService} from "../../main.service"
import {MatSnackBar} from "@angular/material/snack-bar"

import {Router} from "@angular/router"

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  form:FormGroup;
  Value:any=[]
  dataid:number;
  company:string
      Mname:string
      Bno:number
      quantity:number
      costPrice:number
      sellingPrice:number
      Mdate:string
      Edate:string

  constructor(private service :MainService,private _snack:MatSnackBar, private fb :FormBuilder, private route:Router) { 
    this.form=this.fb.group({
      company:[''],
      Mname:[''],
      Bno:[''],
      quantity:[''],
      costPrice:[''],
      sellingPrice:[''],
      Mdate:[''],
      Edate:[''],
      id:['']
      })

      this.service.getMedData().subscribe(data=>{
        this.Value=data
      })

      this.dataid= JSON.parse(localStorage.getItem('update'));


  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.form.value.id=this.dataid
    console.log(this.form.value);
    this.service.updateMedData(this.form.value).subscribe(data=>{
      console.log(data);
      
    })
    this._snack.open("successdully updated", "cancel", {
      duration: 3000,
    });

    
    

  }

}
