import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service"
import {FormGroup,FormBuilder,FormControl} from "@angular/forms"
import {Router} from "@angular/router"
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   flag=true;
  form:FormGroup;
   Values:any=[]
  constructor(private service:MainService,private fb:FormBuilder, private route:Router, private _snack:MatSnackBar) { 
    this.service.getUserData().subscribe(data=>{
      this.Values=data;
      
      for(let i=0;i<this.Values.length;i++){
        console.log(this.Values[i].username);
        
      }
      
    })

    this.form=this.fb.group({
      username:[''],
      password:['']  
      });
  }

  ngOnInit(): void {
  }

  login(){
    this.flag=true;
    this.service.getUserData().subscribe(data=>{
      this.Values=data

      for(let i=0;i<this.Values.length;i++){
        console.log("kkkk",this.Values[i].username);
        if(this.Values[i].username===this.form.value.username && this.Values[i].password===this.form.value.password){
          this.flag=false;
          //console.log(this.Values[i]);
          

        }

      }

      if(this.flag===false){
        
        console.log("log successfull");
        this._snack.open("Welcome user", "cancel", {
          duration: 2000,
        });

        return this.route.navigate(["/manage/data"])
        
      }
      if(this.flag==true){
        this._snack.open("Wrong username and password", "cancel", {
          duration: 2000,
        });
        console.log("wrong password");
        
      }
      
    })
    console.log(this.form.value.username);
    
    
    

  }

}
