import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbNav, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminmoduleRoutingModule } from './adminmodule-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedmoduleModule } from '../common_page/sharedmodule.module';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './users/users.component';
import { ImageCropperModule } from 'ngx-image-cropper-support';
import { CreateBrokerComponent } from './users/create-broker/create-broker.component';
import { EditBrokerComponent } from './users/edit-broker/edit-broker.component';
import { CategoryComponent } from './category/category.component';
import { HouseComponent } from './house/house.component';
import { CreateHouseComponent } from './house/create-house/create-house.component';
import { UpdateHouseComponent } from './house/update-house/update-house.component';
import { OwnerComponent } from './owner/owner.component';
import { CretaeOwnerComponent } from './owner/cretae-owner/cretae-owner.component';
import { UpdateOwnerComponent } from './owner/update-owner/update-owner.component';





@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    CreateBrokerComponent,
    EditBrokerComponent,
    CategoryComponent,
    HouseComponent,
    CreateHouseComponent,
    UpdateHouseComponent,
    OwnerComponent,
    CretaeOwnerComponent,
    UpdateOwnerComponent,
  ],
  imports: [
    CommonModule, ImageCropperModule,
    ReactiveFormsModule, FormsModule,
    AdminmoduleRoutingModule,
    ToastrModule.forRoot(),
    SharedmoduleModule,
    NgbNavModule, NgbModule,
  ]
})
export class AdminmoduleModule { }
