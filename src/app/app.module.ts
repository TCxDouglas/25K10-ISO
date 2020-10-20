import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';

//config firebase
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { MaterialModule } from './material/material.module';





import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AsideComponent } from './components/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyProjectsComponent } from './components/my-projects/my-projects.component';
import { LoginContentComponent } from './components/auth/login/login-content/login-content.component';
import { MyProjectsContentComponent } from './components/my-projects/my-projects-content/my-projects-content.component';
import { BandejaComponent } from './components/bandeja/bandeja.component';
import { BandejaContentComponent } from './components/bandeja/bandeja-content/bandeja-content.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ViewProjectComponent } from './components/view-project/view-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    AsideComponent,
    NavbarComponent,
    MyProjectsComponent,
    LoginContentComponent,
    MyProjectsContentComponent,
    BandejaComponent,
    BandejaContentComponent,
    MainHeaderComponent,
    ViewProjectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    MaterialModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
