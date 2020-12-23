import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
  signupForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(private authService: AuthService, private router: Router, 
    private toastr: ToastrService) { 
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: '',
      mobNo: ''
    }
  }

  ngOnInit()  {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      mobNo: new FormControl('', Validators.required)
    })
  }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.mobNo = this.signupForm.get('mobNo').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(
        // If signup is successful...
        () => {
          this.router.navigate(['/login'], {queryParams: {confirmed: 'true'}});
        },

        // If not successful
        () => {
          this.toastr.error('Registration failed! Please try again');
        }
      );
  }

}
