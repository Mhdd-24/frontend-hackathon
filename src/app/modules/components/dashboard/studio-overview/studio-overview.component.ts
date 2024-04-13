import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-studio-overview',
  templateUrl: './studio-overview.component.html',
  styleUrl: './studio-overview.component.scss'
})
export class StudioOverviewComponent {
  items!: MenuItem[];

}
