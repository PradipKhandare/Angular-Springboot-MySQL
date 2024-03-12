import { Component } from '@angular/core';
import { BreadCrumbService } from '../servive/bread-crumb.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  constructor(private breadcrumbservice: BreadCrumbService){}

ngOnInit(){
  this.setBreadcrumbs();
}

  private setBreadcrumbs(){
     
    this.breadcrumbservice.setBreadcrumbs([
      { label:'Home', url:'/' },
      { label: 'Tasks', url:'/task'}
    ])
  }

}
