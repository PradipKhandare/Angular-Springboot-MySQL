import { Component } from '@angular/core';
import { BreadCrumbService, Breadcrumb } from '../servive/bread-crumb.service';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {

  breadcrumbs: Breadcrumb[] = [];  
 
  constructor(private breadcrumbService: BreadCrumbService) {}
 
  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs: Breadcrumb[]) => {
      this.breadcrumbs = breadcrumbs;
    });
  }

}
