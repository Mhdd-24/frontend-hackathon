import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../services/layout.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  model: any[] = [];
  constructor(public layoutService: LayoutService) { }


  ngOnInit() {
    this.model = [
      {
        label: 'Dashboard', items: [
          {
            label: 'Overview', icon: 'pi pi-fw pi-briefcase', routerLink: ['/dashboard/studio-overview'],
          },
        ]
      },
      {
        label: 'Event Planner',
        items: [
          {
            label: 'Event Registration', icon: 'pi pi-fw pi-book',
            items: [
              {
                label: 'Register Event', icon: 'pi pi-fw pi-pencil', routerLink: ['/event/eventRegistration'],
              },
              {
                label: 'Manage Events', icon: 'pi pi-fw pi-database', routerLink: ['/event/eventDetails'],
              },
              {
                label: 'Event Invitation', icon: 'pi pi-fw pi-bookmark-fill', routerLink: ['/event/inviationEvent'],
              }
            ]
          },
          {
            label: 'Volunteer', icon: 'pi pi-fw pi-heart', routerLink: ['/event/volunteerEvent'],
          },
          {
            label: 'Event Suggestion', icon: 'pi pi-fw pi-megaphone', routerLink: ['/event/eventSuggestion'],
          },
        ]
      },
      {
        label: 'Leave Roster',
        items: [
          {
            label: 'Fetch Leave', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/leaveRoster/uploadLeaves'],
          },
         
        ]

      },
      {
        label: 'Food Order',
        items: [
          {
            label: 'Menu', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/food/food-count'],
          },
          {
            label: 'Order Food', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/food/foodDetails'],
          },
        ]

      },
      {
        label: 'Employee Details',
        items: [
          { label: 'Employee Details', icon: 'pi pi-fw pi-table', routerLink: ['/userProfile/employeeDetails'] },
          { label: 'Raise Complaint', icon: 'pi pi-fw pi-send', routerLink: ['/userProfile/raiseComplaint'] },

        ]
      }
      // {
      //   label: 'Utilities',
      //   items: [
      //     { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
      //     { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
      //   ]
      // },
      // {
      //   label: 'Pages',
      //   icon: 'pi pi-fw pi-briefcase',
      //   items: [
      //     {
      //       label: 'Landing',
      //       icon: 'pi pi-fw pi-globe',
      //       routerLink: ['/landing']
      //     },
      //     {
      //       label: 'Auth',
      //       icon: 'pi pi-fw pi-user',
      //       items: [
      //         {
      //           label: 'Login',
      //           icon: 'pi pi-fw pi-sign-in',
      //           routerLink: ['/auth/login']
      //         },
      //         {
      //           label: 'Error',
      //           icon: 'pi pi-fw pi-times-circle',
      //           routerLink: ['/auth/error']
      //         },
      //         {
      //           label: 'Access Denied',
      //           icon: 'pi pi-fw pi-lock',
      //           routerLink: ['/auth/access']
      //         }
      //       ]
      //     },
      //     {
      //       label: 'Crud',
      //       icon: 'pi pi-fw pi-pencil',
      //       routerLink: ['/pages/crud']
      //     },
      //     {
      //       label: 'Timeline',
      //       icon: 'pi pi-fw pi-calendar',
      //       routerLink: ['/pages/timeline']
      //     },
      //     {
      //       label: 'Not Found',
      //       icon: 'pi pi-fw pi-exclamation-circle',
      //       routerLink: ['/notfound']
      //     },
      //     {
      //       label: 'Empty',
      //       icon: 'pi pi-fw pi-circle-off',
      //       routerLink: ['/pages/empty']
      //     },
      //   ]
      // },
      // {
      //   label: 'Hierarchy',
      //   items: [
      //     {
      //       label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
      //           ]
      //         },
      //         {
      //           label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
      //           ]
      //         },
      //       ]
      //     },
      //     {
      //       label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
      //       items: [
      //         {
      //           label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
      //             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
      //           ]
      //         },
      //         {
      //           label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
      //           items: [
      //             { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
      //           ]
      //         },
      //       ]
      //     }
      //   ]
      // },
      // {
      //   label: 'Get Started',
      //   items: [
      //     {
      //       label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
      //     },
      //     {
      //       label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
      //     }
      //   ]
      // }
    ];
  }
}
