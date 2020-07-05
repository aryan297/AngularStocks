import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageComponent } from './manage.component';
import { AddComponent } from './add/add.component';
import { CustomerComponent } from './customer/customer.component';
import { SellComponent } from './sell/sell.component';
import { DrugdataComponent } from './drugdata/drugdata.component';
import { UpdateComponent } from './update/update.component';
import { OrderComponent } from './order/order.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [{ path: 'data', component: ManageComponent,children:[{
  path:'add',component:AddComponent,outlet:"sidebar"
},{path:"customer",component:CustomerComponent,outlet:"sidebar"},{
  path:"sell",component:SellComponent,outlet:"sidebar"
}, {path:"drug" ,component:DrugdataComponent,outlet:"sidebar"},
{path:"update",component:UpdateComponent,outlet:"sidebar"},{
  path:"order",component:OrderComponent,outlet:"sidebar"
},{path:'list',component:ListComponent,outlet:"sidebar"}] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
