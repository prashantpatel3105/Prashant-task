import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  userForm: FormGroup ;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router:Router
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkMeOut: [false]
    });
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkMeOut: [false]
    });
  }

  ngOnInit() { }

  async onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        localStorage.setItem('auth-user', JSON.stringify(userCredential.user));
        this.router.navigate(['/tasks'])
        this.signInForm.reset();
      } catch (error: any) {
        this.errorMessage = error.message;
        console.error('Error signing in:', error);
      }
    } else {
      console.log('Form not valid');
    }
  }
  async onSignup() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;
      try {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        console.log('User signed up successfully!');
        this.userForm.reset();
      } catch (error: any) {
        this.errorMessage = error.message;
        console.error('Error signing up:', error);
      }
    } else {
      console.log('Form not valid');
    }
  }
}
