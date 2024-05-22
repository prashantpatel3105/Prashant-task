import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  userForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      checkMeOut: [false]
    });
  }

  async onSubmit() {
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
