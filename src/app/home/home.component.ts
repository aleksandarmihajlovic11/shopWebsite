import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  userData: any;

  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: 'baner/Baner_Mobile.png',
      category: {
        id: 0,
        category: 'electronics',
        subcategory: 'mobiles',
      },
    },
    {
      banerimage: 'baner/Baner_Chair.png',
      category: {
        id: 1,
        category: 'furniture',
        subcategory: 'chairs',
      },
    },
    {
      banerimage: 'baner/Baner_Laptop.png',
      category: {
        id: 2,
        category: 'electronics',
        subcategory: 'mobiles',
      },
    },
    {
      banerimage: 'baner/Baner_Table.png',
      category: {
        id: 3,
        category: 'electronics',
        subcategory: 'mobiles',
      },
    },
  ];
  
  constructor (private _authService: AuthService) {}
  
  ngOnInit(): void {
    this.userData = this._authService.userData;
  }
}
