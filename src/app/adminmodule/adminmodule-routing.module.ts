import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../Guard/auth.guard';
import { UsersComponent } from './users/users.component';
import { CreateBrokerComponent } from './users/create-broker/create-broker.component';
import { EditBrokerComponent } from './users/edit-broker/edit-broker.component';
import { CategoryComponent } from './category/category.component';
import { HouseComponent } from './house/house.component';
import { AlwaysGuard } from '../Guard/always.guard';
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

  {path:'house',component:HouseComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminmoduleRoutingModule {}
