import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoListComponent } from './task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { TodoItemComponent } from './task-list/components/todo-item/todo-item.component';
import { AngularFirestoreModule as AngularFirestoneModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
