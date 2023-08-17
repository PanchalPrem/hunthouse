import { UpdateOwnerComponent } from './owner/update-owner/update-owner.component';
import { CretaeOwnerComponent } from './owner/cretae-owner/cretae-owner.component';
import { OwnerComponent } from './owner/owner.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../Guard/auth.guard';
import { UsersComponent } from './users/users.component';
import { CreateBrokerComponent } from './users/create-broker/create-broker.component';
import { EditBrokerComponent } from './users/edit-broker/edit-broker.component';
import { CategoryComponent } from './category/category.component';
import { HouseComponent } from './house/house.component';
import { AlwaysGuard } from '../Guard/always.guard';
import { CreateHouseComponent } from './house/create-house/create-house.component';
import { UpdateHouseComponent } from './house/update-house/update-house.component';
import { UserInquiryComponent } from './user-inquiry/user-inquiry.component';
const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
// broker path
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'create-broker',
    component: CreateBrokerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-broker/:id',
    component: EditBrokerComponent,
    canActivate: [AuthGuard],
  },
  {path:"category",component:CategoryComponent,canActivate:[AuthGuard]},



  {path:'owner',component:OwnerComponent,canActivate:[AuthGuard]},
  {path:'createowner',component:CretaeOwnerComponent,canActivate:[AuthGuard]},
  {path:'updateowner/:id',component:UpdateOwnerComponent,canActivate:[AuthGuard]},



  {path:'house',component:HouseComponent,canActivate:[AuthGuard]},
  {path:'createhouse',component:CreateHouseComponent,canActivate:[AuthGuard]},
  {path:'updatehouse/:id',component:UpdateHouseComponent,canActivate:[AuthGuard]},

  {path:'inquiry',component:UserInquiryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminmoduleRoutingModule {}
