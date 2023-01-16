import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  
  constructor(private _authService: AuthService) {}
  
  ngOnInit(): void {}

  login(userEmail: string, password: string) {
    this._authService.singIn(userEmail, password);
  }
}
