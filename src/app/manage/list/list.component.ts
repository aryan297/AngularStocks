import { Component, OnInit ,ViewChild} from '@angular/core';

import {MainService} from "../../main.service"
import {MatPaginator} from "@angular/material/paginator"
import {MatSort} from "@angular/material/sort"
import {MatSlideToggle} from '@angular/material/slide-toggle'
import {MatTableDataSource} from "@angular/material/table"
import {MatSnackBar} from '@angular/material/snack-bar';
import {Medicine} from "../../medicine"
import {Router,ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns:string[]=['Name','DL','GST','Address','Mobile', 'id'];

  public dataSource = new MatTableDataSource<Medicine>();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild("slide") matSlideToggle:MatSlideToggle

    constructor(private service:MainService, private _snack:MatSnackBar, private route:Router , private router:ActivatedRoute){
      this.data();
  
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
    this.service.customerDelete(id).subscribe(data=>{
      console.log(data);
      this.data();
      
    })
    this._snack.open("successfully deleted", "cancel", {
      duration: 2000,
    });


  }

  update(id){

    localStorage.setItem("update",id)

    return this.route.navigate(['../update'],{relativeTo:this.router})
  }



  data(){
    this.service.getCustomer().subscribe(val=>{
      this.dataSource.data=val as Medicine[]
      console.log("value",this.dataSource.data);
      

    });

  }

}
