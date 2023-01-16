import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  
  constructor(
    private _authService: AuthService
  ) {}
  
  ngOnInit(): void {}

  signup(email: string, pass: string) {
    this._authService.signUp(email, pass);
  }
}
