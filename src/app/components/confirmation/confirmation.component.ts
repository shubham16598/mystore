import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  total:string;
  name:string;
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.queryParamMap.get('name');
    this.total = this.route.snapshot.queryParamMap.get('total');

    if(!this.name && !this.total){
      this.router.navigate(['/product-list']);
    }
  }

}
