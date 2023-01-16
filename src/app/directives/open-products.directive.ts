import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/models';

@Directive({
  selector: '[appOpenProducts]'
})
export class OpenProductsDirective {
  @Input() category: Category = {
    id: 0,
    category: '',
    subcategory: '',
  }
  
  @HostListener('click') openProducts() {
    this.router.navigate(['/products'], { 
      queryParams: { 
        category: this.category.category,
        subcategory: this.category.subcategory,
      },
    });
  }
  constructor(private router: Router) {}

}
