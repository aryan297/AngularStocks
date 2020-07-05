import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class MainService {

  Get_utl:string="http://localhost:3000/user"
  Post_url:string="http://localhost:3000/medicine"
  PostSell_url:string="http://localhost:3000/Sell"
  postCustomer_url:string="http://localhost:3000/Customer"
  constructor(private http:HttpClient) { 

  }


  getUserData(){
    return this.http.get(this.Get_utl)
  }

  postMedData(data){
    return this.http.post(this.Post_url,data)


  }

  getMedData(){
    return this.http.get(this.Post_url)
  }

  drugDelete(data){
    return this.http.delete(this.Post_url +"/" +data)
  }
  updateMedData(data){
    return this.http.put(this.Post_url +"/"+data.id ,data)
  }

  postSelling(data){
    return this.http.post(this.PostSell_url,data)
  }

  getSelling(){
    return this.http.get(this.PostSell_url)
  }

  sellDelete(data){
    return this.http.delete(this.PostSell_url+"/" +data)

  }

  postCustomer(data){
    return this.http.post(this.postCustomer_url,data)
  }

  getCustomer(){
    return this.http.get(this.postCustomer_url)
  }

  customerDelete(data){
    return this.http.delete(this.postCustomer_url+"/" +data)

  }
}
