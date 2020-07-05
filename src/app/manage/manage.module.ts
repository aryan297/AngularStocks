import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from "@angular/forms"
import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatListModule} from "@angular/material/list"
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AddComponent } from './add/add.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CustomerComponent } from './customer/customer.component';
import { SellComponent } from './sell/sell.component';
import { MatTableModule } from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator"
import { MatSortModule} from "@angular/material/sort"
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { DrugdataComponent } from './drugdata/drugdata.component'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UpdateComponent } from './update/update.component';
import { OrderComponent } from './order/order.component';
import {DatePipe} from '@angular/common';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ManageComponent, AddComponent, CustomerComponent, SellComponent, DrugdataComponent, UpdateComponent, OrderComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,

  ],
  providers:[DatePipe]
})
export class ManageModule { }
