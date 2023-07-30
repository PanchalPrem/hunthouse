import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminmoduleModule } from './adminmodule/adminmodule.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SharedmoduleModule } from './common_page/sharedmodule.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbActiveModal, NgbModule, NgbNav, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper-support';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    AdminmoduleModule, FormsModule, HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedmoduleModule,
    ToastrModule,
    NgbModule, NgbNavModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

