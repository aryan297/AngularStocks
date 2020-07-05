import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray ,FormGroup} from '@angular/forms';
import {  CurrencyPipe } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from "rxjs";
import {MainService} from "../../main.service"
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  Value:any=[]
  bool:boolean=false;
  vals:any;

  dataMed={}

dataval=[];

  totalPrice:Number=0

  filterTypes = [
    'TRANSFER TM',
    'APP'
  ];

  apiTypes = [
    'Less Than',
    'Equals',
    'Greater Than'
  ];

 

  dynamicForm: FormGroup;

  constructor(private fb: FormBuilder, private service:MainService, private _snack:MatSnackBar) {
    

    
    this.service.getMedData().subscribe(data=>{
      this.Value=data
    })
/* ß */
  }

  ngOnInit() {
    
    this.dynamicForm = this.fb.group({
      customerName:[''],
      Address:[''],
      DL:[''],
      GST:[''],
      Mobile:[''],
      total:[''],
      date:[''],
      filters: this.fb.array([])
    });
    
    // Uncomment the line below If you want to seed the Form with some data

  }


  createFilterGroup() {


    return this.fb.group({
      filterType: [],
      quantity: [],
      price:[],
      
    
    });

    
  }

  addFilterToFiltersFormArray() {
    this.filtersFormArray.push(this.createFilterGroup());
  }

  removeFilterFromFiltersFormArray(index) {
    this.filtersFormArray.removeAt(index);
  }

  selectedAPIChanged(i) {

   
    
    this.getFilterGroupAtIndex(i).addControl('value', this.getFormControl());
  }

  getFormControl() {
    return this.fb.control(null);
  }

  total(){


   
    
    console.log(this.dynamicForm.value);
    localStorage.setItem("form",JSON.stringify(this.dynamicForm.value.filters ))
    let data = JSON.parse(localStorage.getItem("form"));
    //console.log(data.price);
    

   for(let i=0;i<data.length;i++){
     this.totalPrice=this.totalPrice+data[i].price
    
   
  }

 
   let val = JSON.stringify(this.totalPrice);

   this._snack.open("Total Rs.="+val, "cancel", {
    duration: 100000,
  });
   localStorage.setItem("total",JSON.stringify(this.totalPrice));
  
  this.totalPrice=0;
  console.log(this.totalPrice);
  
  //console.log(this.totalPrice);

    }

  
  /*     let val = JSON.stringify(this.totalPrice);
   this._snack.open(val, "cancel", {
    duration: 10000,
  }); */
      
    



  

  save() {
    let v=JSON.parse(localStorage.getItem("total"))
    console.log("data",v);
    

    this.dynamicForm.value.total=v

    this.dynamicForm.value.date= new Date();

 
    console.log(this.dynamicForm.value.filters[0].filterType);
    
  


    localStorage.setItem("forms",JSON.stringify(this.dynamicForm.value.filters ))
     this.vals= JSON.parse(localStorage.getItem("form"));

    this.service.getMedData().subscribe(data=>{
      this.Value=data

      for(let i=0;i<this.Value.length;i++){

        for(let j=0;j<this.vals.length;j++){
         
         // console.log(this.vals[i].filterType);
        console.log("db",this.Value[i].Mname); 

       if(this.vals.length==this.dynamicForm.value.filters.length){

        if(this.Value[i].Mname==this.vals[j].filterType){


          if(this.Value[i].quantity>=this.vals[j].quantity){

            this.bool=true

     this.dataMed={
       company:this.Value[i].company,
       Mname:this.Value[i].Mname,
       Bno: this.Value[i].Bno,
       quantity: this.Value[i].quantity-this.dynamicForm.value.filters[0].quantity,
       costPrice: this.Value[i].costPrice,
       sellingPrice: this.Value[i].sellingPrice,
       Mdate: this.Value[i].Mdate,
       Edate: this.Value[i].Edate,
       id: this.Value[i].id

     }

 this.dataval.push(this.dataMed)

        }
        

       }

      }

    /*  else if(this.Value[i].Mname==this.vals[i].filterType){
           

            if(this.Value[i].quantity>this.vals[i].quantity){

              this.bool=true

       this.dataMed={
         company:this.Value[i].company,
         Mname:this.Value[i].Mname,
         Bno: this.Value[i].Bno,
         quantity: this.Value[i].quantity-this.dynamicForm.value.filters[i].quantity,
         costPrice: this.Value[i].costPrice,
         sellingPrice: this.Value[i].sellingPrice,
         Mdate: this.Value[i].Mdate,
         Edate: this.Value[i].Edate,
         id: this.Value[i].id

       }

   this.dataval.push(this.dataMed)


  

  

       
            }

            else{
              this.bool=false;
            }

            
          }
       */

      else{
        this.bool=false;
      }

          

        }
      }


       



    if(this.bool==true){
  
      this.service.postSelling(this.dynamicForm.value).subscribe(data=>{
       console.log(data);
       
     })


    console.log(this.dynamicForm.value);
    
       this._snack.open("successfully listed,please check the order history table..", "cancel", {
         duration: 5000,
       });


       for(let i=0;i<this.dataval.length;i++){
        this.service.updateMedData(this.dataval[i]).subscribe(data=>{
          console.log(data);
          
        }) 
     
       }
      
    
   
   }

  else if(this.bool==false){
    this._snack.open("this much quantity is not availabe .....edit data", "cancel", {
      duration: 3000,
    });


  }

    });





    

   
  }

  get filtersFormArray() {
    return (<FormArray>this.dynamicForm.get('filters'));
  }

  getFilterGroupAtIndex(index) {
    return (<FormGroup>this.filtersFormArray.at(index));
  }


  
    
  


}
