import { Component } from '@angular/core';
import { BreadCrumbService } from '../servive/bread-crumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


constructor(private breadcrumbservice: BreadCrumbService){}

ngOnInit(){
  this.setBreadcrumbs();
}


  private setBreadcrumbs(){
     
    this.breadcrumbservice.setBreadcrumbs([
      { label:'Home', url:'/' },
      { label: 'Dashboard', url:''}
    ])
  }

}
