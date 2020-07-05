import { Component, OnInit ,ViewChild} from '@angular/core';
import {MainService} from "../../main.service"
import {sell} from "../../sell"
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from "@angular/material/sort"
import {MatSlideToggle} from '@angular/material/slide-toggle'
import {MatTableDataSource} from "@angular/material/table"
import {MatSnackBar} from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { DatePipe } from '@angular/common';

import * as jsPDF from  'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  Value:any=[]
  new:any=[];
  datas:any=[]

  displayedColumns:string[]=['customerName','DL','GST','Mobile','Address','total','id', 'date'];


  public dataSource = new MatTableDataSource<sell>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild("slide") matSlideToggle:MatSlideToggle

  constructor(private service:MainService, private _snack:MatSnackBar, private datePipe:DatePipe) { 
    this.data()
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    this.dataSource.paginator=this.paginator
    this.dataSource.sort=this.sort

  }

  public doFilter =(value :string)=>{
    this.dataSource.filter=value.trim().toLocaleLowerCase();
  }



  delete(id){
    this.service.sellDelete(id).subscribe(data=>{
      console.log(data);
      this.data();
      
    })
    this._snack.open("successfully deleted", "cancel", {
      duration: 2000,
    });


  }

  data(){
    this.service.getSelling().subscribe(res=>{
      this.dataSource.data=res as sell[];
    })
  }

  generatePdf(ids){

    let Name;
    let Address;
    let Mobile;
    let GST;
    let DL;
    let total;
    let date;
    var startY=500;

    const head=[['Medicine Name' ,'Medicine Quantity', 'Medicine Price']];

    this.service.getSelling().subscribe(res=>{
      this.new=res;

      for(let i=0;i<this.new.length;i++){
        if(this.new[i].id===ids){

          Name=this.new[i].customerName;
          Address=this.new[i].Address;
          Mobile= this.new[i].Mobile;
          GST=this.new[i].GST;
          DL=this.new[i].DL;
          total=this.new[i].total;
          date = this.datePipe.transform(this.new[i].date,"yyyy-MM-dd")
          


          for(let j=0;j<this.new[i].filters.length;j++){
            if(this.new[i].filters.length==1){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price]]
            

            }

             if(this.new[i].filters.length==2){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price]]
            }

            if(this.new[i].filters.length==3){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price]]
            }

            if(this.new[i].filters.length==4){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price]]
            }

            if(this.new[i].filters.length==5){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
             [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price]]
            }

            if(this.new[i].filters.length==6){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
             [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
             [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
             [ this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price]]
            }
 


            if(this.new[i].filters.length==7){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
        [ this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
             [ this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
            [ this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
             [ this.new[i].filters[6].filterType , ''+this.new[i].filters[6].quantity, this.new[i].filters[6].price]]
            }


            if(this.new[i].filters.length==8){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
             [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
             [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
             [this.new[i].filters[6].filterType , ''+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
            [ this.new[i].filters[7].filterType , ''+this.new[i].filters[7].quantity, this.new[i].filters[7].price]]
            }

            if(this.new[i].filters.length==9){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
             [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
             [ this.new[i].filters[6].filterType , ''+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , ''+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
             [this.new[i].filters[8].filterType , ''+this.new[i].filters[8].quantity, this.new[i].filters[8].price]]
            }

            if(this.new[i].filters.length==10){
              this.datas=[[this.new[i].filters[0].filterType , ''+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , ''+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , ''+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , ''+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , ''+this.new[i].filters[9].quantity, this.new[i].filters[9].price]]
            }
 


            if(this.new[i].filters.length==11){
              this.datas=[[this.new[i].filters[0].filterType , 'Rs.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , ''+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , ''+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , ''+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , ''+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , ''+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , ''+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
             [this.new[i].filters[7].filterType , ''+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[10].price]]
            }

            if(this.new[i].filters.length==12){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
          [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType , '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price]]
            }

            if(this.new[i].filters.length==13){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
             [ this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
             [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
             [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price]]
            }

            if(this.new[i].filters.length==14){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price]]
            }


            if(this.new[i].filters.length==15){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price]]
            }

            if(this.new[i].filters.length==16){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price]]
            }

            if(this.new[i].filters.length==17){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price]]
            }

            if(this.new[i].filters.length==18){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price]]
            }


            if(this.new[i].filters.length==19){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price]]
            }

            if(this.new[i].filters.length==20){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price]]
            }
 

            if(this.new[i].filters.length==21){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price]]
            }


            if(this.new[i].filters.length==22){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price]]
            }
 
 
            if(this.new[i].filters.length==23){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price]]
            }
            if(this.new[i].filters.length==24){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price]]
            }

            if(this.new[i].filters.length==25){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price]]
            }
 

            if(this.new[i].filters.length==26){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price]]
            }

            if(this.new[i].filters.length==27){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price]]
            }
 
            if(this.new[i].filters.length==28){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price]]
            }

            if(this.new[i].filters.length==29){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price]]
            }

            if(this.new[i].filters.length==30){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price]]
            }
 

            if(this.new[i].filters.length==31){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price]]
            }

            if(this.new[i].filters.length==32){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price]]
            }

            if(this.new[i].filters.length==33){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price]]
            }
 

            if(this.new[i].filters.length==34){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price]]
            }
 

            if(this.new[i].filters.length==35){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price]]
            }
 

            if(this.new[i].filters.length==36){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price]]
            }

            if(this.new[i].filters.length==37){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price]]
            }


            if(this.new[i].filters.length==38){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price]]
            }

            if(this.new[i].filters.length==39){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price]]
            }
 

            if(this.new[i].filters.length==40){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price]]
            }
            if(this.new[i].filters.length==41){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price]]
            }


            if(this.new[i].filters.length==42){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price]]
            }
 

            if(this.new[i].filters.length==43){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price]]
            }
 


            if(this.new[i].filters.length==44){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price]]
            }

            if(this.new[i].filters.length==45){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price]]
            }

            if(this.new[i].filters.length==46){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price],
              [this.new[i].filters[45].filterType , '.'+this.new[i].filters[45].quantity, this.new[i].filters[45].price]]
            }
 

            if(this.new[i].filters.length==47){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price],
              [this.new[i].filters[45].filterType , '.'+this.new[i].filters[45].quantity, this.new[i].filters[45].price],
              [this.new[i].filters[46].filterType , '.'+this.new[i].filters[46].quantity, this.new[i].filters[46].price]]
            }

            if(this.new[i].filters.length==48){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price],
              [this.new[i].filters[45].filterType , '.'+this.new[i].filters[45].quantity, this.new[i].filters[45].price],
              [this.new[i].filters[46].filterType , '.'+this.new[i].filters[46].quantity, this.new[i].filters[46].price],
              [this.new[i].filters[47].filterType , '.'+this.new[i].filters[47].quantity, this.new[i].filters[47].price]]
            }

            if(this.new[i].filters.length==49){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price],
              [this.new[i].filters[45].filterType , '.'+this.new[i].filters[45].quantity, this.new[i].filters[45].price],
              [this.new[i].filters[46].filterType , '.'+this.new[i].filters[46].quantity, this.new[i].filters[46].price],
              [this.new[i].filters[47].filterType , '.'+this.new[i].filters[47].quantity, this.new[i].filters[47].price],
              [this.new[i].filters[48].filterType , '.'+this.new[i].filters[48].quantity, this.new[i].filters[48].price]]
            }

            if(this.new[i].filters.length==50){
              this.datas=[[this.new[i].filters[0].filterType , '.'+this.new[i].filters[0].quantity, this.new[i].filters[0].price],
              [this.new[i].filters[1].filterType , '.'+this.new[i].filters[1].quantity, this.new[i].filters[1].price],
              [this.new[i].filters[2].filterType , '.'+this.new[i].filters[2].quantity, this.new[i].filters[2].price],
              [this.new[i].filters[3].filterType ,  '.'+this.new[i].filters[3].quantity, this.new[i].filters[3].price],
              [this.new[i].filters[4].filterType , '.'+this.new[i].filters[4].quantity, this.new[i].filters[4].price],
              [this.new[i].filters[5].filterType , '.'+this.new[i].filters[5].quantity, this.new[i].filters[5].price],
              [this.new[i].filters[6].filterType , '.'+this.new[i].filters[6].quantity, this.new[i].filters[6].price],
              [this.new[i].filters[7].filterType , '.'+this.new[i].filters[7].quantity, this.new[i].filters[7].price],
              [this.new[i].filters[8].filterType , '.'+this.new[i].filters[8].quantity, this.new[i].filters[8].price],
              [this.new[i].filters[9].filterType , '.'+this.new[i].filters[9].quantity, this.new[i].filters[9].price],
              [this.new[i].filters[10].filterType , '.'+this.new[i].filters[10].quantity, this.new[i].filters[10].price],
              [this.new[i].filters[11].filterType , '.'+this.new[i].filters[11].quantity, this.new[i].filters[11].price],
              [this.new[i].filters[12].filterType , '.'+this.new[i].filters[12].quantity, this.new[i].filters[12].price],
              [this.new[i].filters[13].filterType , '.'+this.new[i].filters[13].quantity, this.new[i].filters[13].price],
              [this.new[i].filters[14].filterType , '.'+this.new[i].filters[14].quantity, this.new[i].filters[14].price],
              [this.new[i].filters[15].filterType , '.'+this.new[i].filters[15].quantity, this.new[i].filters[15].price],
              [this.new[i].filters[16].filterType , '.'+this.new[i].filters[16].quantity, this.new[i].filters[16].price],
              [this.new[i].filters[17].filterType , '.'+this.new[i].filters[17].quantity, this.new[i].filters[17].price],
              [this.new[i].filters[18].filterType , '.'+this.new[i].filters[18].quantity, this.new[i].filters[18].price],
              [this.new[i].filters[19].filterType , '.'+this.new[i].filters[19].quantity, this.new[i].filters[19].price],
              [this.new[i].filters[20].filterType , '.'+this.new[i].filters[20].quantity, this.new[i].filters[20].price],
              [this.new[i].filters[21].filterType , '.'+this.new[i].filters[21].quantity, this.new[i].filters[21].price],
              [this.new[i].filters[22].filterType , '.'+this.new[i].filters[22].quantity, this.new[i].filters[22].price],
              [this.new[i].filters[23].filterType , '.'+this.new[i].filters[23].quantity, this.new[i].filters[23].price],
              [this.new[i].filters[24].filterType , '.'+this.new[i].filters[24].quantity, this.new[i].filters[24].price],
              [this.new[i].filters[25].filterType , '.'+this.new[i].filters[25].quantity, this.new[i].filters[25].price],
              [this.new[i].filters[26].filterType , '.'+this.new[i].filters[26].quantity, this.new[i].filters[26].price],
              [this.new[i].filters[27].filterType , '.'+this.new[i].filters[27].quantity, this.new[i].filters[27].price],
              [this.new[i].filters[28].filterType , '.'+this.new[i].filters[28].quantity, this.new[i].filters[28].price],
              [this.new[i].filters[29].filterType , '.'+this.new[i].filters[29].quantity, this.new[i].filters[29].price],
              [this.new[i].filters[30].filterType , '.'+this.new[i].filters[30].quantity, this.new[i].filters[30].price],
              [this.new[i].filters[31].filterType , '.'+this.new[i].filters[31].quantity, this.new[i].filters[31].price],
              [this.new[i].filters[32].filterType , '.'+this.new[i].filters[32].quantity, this.new[i].filters[32].price],
              [this.new[i].filters[33].filterType , '.'+this.new[i].filters[33].quantity, this.new[i].filters[33].price],
              [this.new[i].filters[34].filterType , '.'+this.new[i].filters[34].quantity, this.new[i].filters[34].price],
              [this.new[i].filters[35].filterType , '.'+this.new[i].filters[35].quantity, this.new[i].filters[35].price],
              [this.new[i].filters[36].filterType , '.'+this.new[i].filters[36].quantity, this.new[i].filters[36].price],
              [this.new[i].filters[37].filterType , '.'+this.new[i].filters[37].quantity, this.new[i].filters[37].price],
              [this.new[i].filters[38].filterType , '.'+this.new[i].filters[38].quantity, this.new[i].filters[38].price],
              [this.new[i].filters[39].filterType , '.'+this.new[i].filters[39].quantity, this.new[i].filters[39].price],
              [this.new[i].filters[40].filterType , '.'+this.new[i].filters[40].quantity, this.new[i].filters[40].price],
              [this.new[i].filters[41].filterType , '.'+this.new[i].filters[41].quantity, this.new[i].filters[41].price],
              [this.new[i].filters[42].filterType , '.'+this.new[i].filters[42].quantity, this.new[i].filters[42].price],
              [this.new[i].filters[43].filterType , '.'+this.new[i].filters[43].quantity, this.new[i].filters[43].price],
              [this.new[i].filters[44].filterType , '.'+this.new[i].filters[44].quantity, this.new[i].filters[44].price],
              [this.new[i].filters[45].filterType , '.'+this.new[i].filters[45].quantity, this.new[i].filters[45].price],
              [this.new[i].filters[46].filterType , '.'+this.new[i].filters[46].quantity, this.new[i].filters[46].price],
              [this.new[i].filters[47].filterType , '.'+this.new[i].filters[47].quantity, this.new[i].filters[47].price],
              [this.new[i].filters[48].filterType , '.'+this.new[i].filters[48].quantity, this.new[i].filters[48].price],
              [this.new[i].filters[49].filterType , '.'+this.new[i].filters[49].quantity, this.new[i].filters[49].price]]
            }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 

          }


        }

      }


      const doc = new jsPDF();

      const imgs ="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4Qm+aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+IDxkYzpjcmVhdG9yPiA8cmRmOlNlcT4gPHJkZjpsaT5WZWN0b3JTdG9jay5jb20vMTUwNTkzODQ8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L2RjOmNyZWF0b3I+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAD6AO4DAREAAhEBAxEB/8QAHQABAAMBAQEBAQEAAAAAAAAAAAYHCAUB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"




      const img1 = "data:image/jpeg;base64,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"



      var  pageHeight= doc.internal.pageSize.height;
      doc.text("Yash Pharma", 15,12)
     
      doc.addImage(imgs,'JPEG',150,0);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0)


      doc.setFontSize(10);
      doc.text("Azad nagar, ward no.-12 ",15,16)

      doc.setFontSize(10);
      doc.text("Madhepura , Bihar",15,20)

      doc.setFontSize(10);
      doc.text("Mob.-9876543210",15,24)

      doc.text("GST-186272725244277", 15 ,28)
      doc.setFontSize(8),
      doc.setTextColor(0,0,0)


      doc.addImage(img1,'JPEG',38,90);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0)

     
      doc.setFontSize(12);
      doc.text("Name:"+Name,15,40);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);

      doc.setFontSize(12);
      doc.text("Address:"+Address,15,48);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);

      doc.setFontSize(12);
      doc.text("Dl No.:"+DL,15,56);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);

      doc.setFontSize(12);
      doc.text("GST no.:"+GST,15,64);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);

      doc.setFontSize(12);
      doc.text("Mobile :"+Mobile,15,72);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);


      doc.setFontSize(12);
      doc.text("Total Rs.:"+total,15,80);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);

      doc.setFontSize(12);
      doc.text("Date :"+date,15,88);
      doc.setFontSize(11);
      doc.setTextColor(0,0,0);





      (doc as any).autoTable({
        startY:95,
        head,
        body:this.datas,
        theme:'plain',
        didDrawCell:dataa=>{
          console.log(dataa.column.index);
          
        },
      });


    

// Before adding new content
 // Height position of new content
if (this.datas>= pageHeight)
{
  doc.addPage();

  (doc as any).autoTable({
    startY:0,
    head,
    body:this.datas,
    theme:'plain',
    didDrawCell:dataa=>{
      console.log(dataa.column.index);
      
    },
  });

  // Restart height position

  
}




      doc.output("dataurlnewwindow");
      doc.open('yash_Pharma.pdf')

    })

  }
v}
