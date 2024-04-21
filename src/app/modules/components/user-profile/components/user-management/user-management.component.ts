import { Table } from 'primeng/table';

import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeTableDetails } from '../../models/EmployeeTable.models';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  employees: EmployeeTableDetails[] = [];
  loading: boolean = true;

  constructor() { }

  ngOnInit() {
    this.fetchEmployeeData();
  }

  fetchEmployeeData() {
    const employeeData: EmployeeTableDetails[] = [
      {
        empid: "2024506",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        department: "Finance",
        designation: "Financial Analyst",
        dob: "1982-09-28",
        doj: "2018-03-15",
        address: "789 Elm St, Anothertown, USA",
        mobileno: "1357908642",
        userId: "mjohnson",
        employeeExperience: [
          {
            companyName: "Microsoft",
            domain: "Finance",
            yearsOfExp: 4.8
          }
        ],
        skillVsRating: [
          {
            finance: 4.5
          },
          {
            Software: 5
          }
        ]
      },
      {
        empid: "2024507",
        name: "Emily Brown",
        email: "emily.brown@example.com",
        department: "IT",
        designation: "Software Engineer",
        dob: "1990-12-10",
        doj: "2017-06-20",
        address: "321 Pine St, Yetanothertown, USA",
        mobileno: "2468013579",
        userId: "ebrown",
        employeeExperience: [
          {
            companyName: "Apple",
            domain: "Information Technology",
            yearsOfExp: 5.5
          }
        ],
        skillVsRating: [
          {
            it: 4.7
          }
        ]
      },
      {
        empid: "2024508",
        name: "William Wilson",
        email: "william.wilson@example.com",
        department: "Marketing",
        designation: "Marketing Manager",
        dob: "1988-03-22",
        doj: "2016-12-05",
        address: "987 Maple St, Newtown, USA",
        mobileno: "3692581470",
        userId: "wwilson",
        employeeExperience: [
          {
            companyName: "Facebook",
            domain: "Marketing",
            yearsOfExp: 6.3
          }
        ],
        skillVsRating: [
          {
            marketing: 4.9
          }
        ]
      },
      {
        empid: "2024509",
        name: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        department: "Operations",
        designation: "Operations Manager",
        dob: "1983-07-18",
        doj: "2015-10-10",
        address: "741 Cedar St, Othercity, USA",
        mobileno: "8024671359",
        userId: "otaylor",
        employeeExperience: [
          {
            companyName: "IBM",
            domain: "Operations",
            yearsOfExp: 7.1
          }
        ],
        skillVsRating: [
          {
            operations: 4.8
          }
        ]
      },
      {
        empid: "2024510",
        name: "James Anderson",
        email: "james.anderson@example.com",
        department: "Research",
        designation: "Research Analyst",
        dob: "1986-11-30",
        doj: "2014-04-12",
        address: "159 Birch St, Cityville, USA",
        mobileno: "5738291460",
        userId: "janderson",
        employeeExperience: [
          {
            companyName: "Tesla",
            domain: "Research",
            yearsOfExp: 8.5
          }
        ],
        skillVsRating: [
          {
            research: 4.6
          }
        ]
      },
      {
        empid: "2024511",
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        department: "Quality Assurance",
        designation: "QA Engineer",
        dob: "1991-04-25",
        doj: "2013-09-22",
        address: "852 Walnut St, Villagetown, USA",
        mobileno: "6182437095",
        userId: "smartinez",
        employeeExperience: [
          {
            companyName: "Samsung",
            domain: "Quality Assurance",
            yearsOfExp: 9.2
          }
        ],
        skillVsRating: [
          {
            qa: 4.3
          }
        ]
      },
      {
        empid: "2024512",
        name: "Liam Wilson",
        email: "liam.wilson@example.com",
        department: "Customer Support",
        designation: "Support Specialist",
        dob: "1989-08-08",
        doj: "2012-02-18",
        address: "369 Oak St, Townsville, USA",
        mobileno: "6248157039",
        userId: "lwilson",
        employeeExperience: [
          {
            companyName: "Sony",
            domain: "Customer Support",
            yearsOfExp: 10.7
          }
        ],
        skillVsRating: [
          {
            customerSupport: 4.1
          }
        ]
      },
      {
        empid: "2024513",
        name: "Ava Jones",
        email: "ava.jones@example.com",
        department: "Administration",
        designation: "Administrative Assistant",
        dob: "1987-02-14",
        doj: "2011-07-14",
        address: "753 Pine St, Countryside, USA",
        mobileno: "9513702846",
        userId: "ajones",
        employeeExperience: [
          {
            companyName: "HP",
            domain: "Administration",
            yearsOfExp: 11.4
          }
        ],
        skillVsRating: [
          {
            administration: 4.0
          }
        ]
      },
      {
        empid: "2024514",
        name: "Noah Taylor",
        email: "noah.taylor@example.com",
        department: "Production",
        designation: "Production Manager",
        dob: "1992-10-05",
        doj: "2010-12-30",
        address: "258 Cedar St, Countryside, USA",
        mobileno: "7402851639",
        userId: "ntaylor",
        employeeExperience: [
          {
            companyName: "Nvidia",
            domain: "Production",
            yearsOfExp: 12.9
          }
        ],
        skillVsRating: [
          {
            production: 3.9
          }
        ]
      },
      {
        empid: "2024515",
        name: "Isabella Brown",
        email: "isabella.brown@example.com",
        department: "Logistics",
        designation: "Logistics Coordinator",
        dob: "1993-03-12",
        doj: "2009-05-20",
        address: "963 Birch St, Countryside, USA",
        mobileno: "3705928164",
        userId: "ibrown",
        employeeExperience: [
          {
            companyName: "FedEx",
            domain: "Logistics",
            yearsOfExp: 13.6
          }
        ],
        skillVsRating: [
          {
            logistics: 3.7
          }
        ]
      },
      {
        empid: "2024506",
        name: "Michael Johnson",
        email: "michael.johnson@example.com",
        department: "Finance",
        designation: "Financial Analyst",
        dob: "1982-09-28",
        doj: "2018-03-15",
        address: "789 Elm St, Anothertown, USA",
        mobileno: "1357908642",
        userId: "mjohnson",
        employeeExperience: [
          {
            companyName: "Microsoft",
            domain: "Finance",
            yearsOfExp: 4.8
          }
        ],
        skillVsRating: [
          {
            finance: 4.5
          }
        ]
      },
      {
        empid: "2024507",
        name: "Emily Brown",
        email: "emily.brown@example.com",
        department: "IT",
        designation: "Software Engineer",
        dob: "1990-12-10",
        doj: "2017-06-20",
        address: "321 Pine St, Yetanothertown, USA",
        mobileno: "2468013579",
        userId: "ebrown",
        employeeExperience: [
          {
            companyName: "Apple",
            domain: "Information Technology",
            yearsOfExp: 5.5
          }
        ],
        skillVsRating: [
          {
            it: 4.7
          }
        ]
      },
      // Add 18 more employee data entries here
      {
        empid: "2024508",
        name: "William Wilson",
        email: "william.wilson@example.com",
        department: "Marketing",
        designation: "Marketing Manager",
        dob: "1988-03-22",
        doj: "2016-12-05",
        address: "987 Maple St, Newtown, USA",
        mobileno: "3692581470",
        userId: "wwilson",
        employeeExperience: [
          {
            companyName: "Facebook",
            domain: "Marketing",
            yearsOfExp: 6.3
          }
        ],
        skillVsRating: [
          {
            marketing: 4.9
          }
        ]
      },
      {
        empid: "2024509",
        name: "Olivia Taylor",
        email: "olivia.taylor@example.com",
        department: "Operations",
        designation: "Operations Manager",
        dob: "1983-07-18",
        doj: "2015-10-10",
        address: "741 Cedar St, Othercity, USA",
        mobileno: "8024671359",
        userId: "otaylor",
        employeeExperience: [
          {
            companyName: "IBM",
            domain: "Operations",
            yearsOfExp: 7.1
          }
        ],
        skillVsRating: [
          {
            operations: 4.8
          }
        ]
      },
      {
        empid: "2024510",
        name: "James Anderson",
        email: "james.anderson@example.com",
        department: "Research",
        designation: "Research Analyst",
        dob: "1986-11-30",
        doj: "2014-04-12",
        address: "159 Birch St, Cityville, USA",
        mobileno: "5738291460",
        userId: "janderson",
        employeeExperience: [
          {
            companyName: "Tesla",
            domain: "Research",
            yearsOfExp: 8.5
          }
        ],
        skillVsRating: [
          {
            research: 4.6
          }
        ]
      },
      {
        empid: "2024511",
        name: "Sophia Martinez",
        email: "sophia.martinez@example.com",
        department: "Quality Assurance",
        designation: "QA Engineer",
        dob: "1991-04-25",
        doj: "2013-09-22",
        address: "852 Walnut St, Villagetown, USA",
        mobileno: "6182437095",
        userId: "smartinez",
        employeeExperience: [
          {
            companyName: "Samsung",
            domain: "Quality Assurance",
            yearsOfExp: 9.2
          }
        ],
        skillVsRating: [
          {
            qa: 4.3
          }
        ]
      },
      {
        empid: "2024512",
        name: "Liam Wilson",
        email: "liam.wilson@example.com",
        department: "Customer Support",
        designation: "Support Specialist",
        dob: "1989-08-08",
        doj: "2012-02-18",
        address: "369 Oak St, Townsville, USA",
        mobileno: "6248157039",
        userId: "lwilson",
        employeeExperience: [
          {
            companyName: "Sony",
            domain: "Customer Support",
            yearsOfExp: 10.7
          }
        ],
        skillVsRating: [
          {
            customerSupport: 4.1
          }
        ]
      },
      {
        empid: "2024513",
        name: "Ava Jones",
        email: "ava.jones@example.com",
        department: "Administration",
        designation: "Administrative Assistant",
        dob: "1987-02-14",
        doj: "2011-07-14",
        address: "753 Pine St, Countryside, USA",
        mobileno: "9513702846",
        userId: "ajones",
        employeeExperience: [
          {
            companyName: "HP",
            domain: "Administration",
            yearsOfExp: 11.4
          }
        ],
        skillVsRating: [
          {
            administration: 4.0
          }
        ]
      },
      {
        empid: "2024514",
        name: "Noah Taylor",
        email: "noah.taylor@example.com",
        department: "Production",
        designation: "Production Manager",
        dob: "1992-10-05",
        doj: "2010-12-30",
        address: "258 Cedar St, Countryside, USA",
        mobileno: "7402851639",
        userId: "ntaylor",
        employeeExperience: [
          {
            companyName: "Nvidia",
            domain: "Production",
            yearsOfExp: 12.9
          }
        ],
        skillVsRating: [
          {
            production: 3.9
          }
        ]
      },
      {
        empid: "2024515",
        name: "Isabella Brown",
        email: "isabella.brown@example.com",
        department: "Logistics",
        designation: "Logistics Coordinator",
        dob: "1993-03-12",
        doj: "2009-05-20",
        address: "963 Birch St, Countryside, USA",
        mobileno: "3705928164",
        userId: "ibrown",
        employeeExperience: [
          {
            companyName: "FedEx",
            domain: "Logistics",
            yearsOfExp: 13.6
          }
        ],
        skillVsRating: [
          {
            logistics: 3.7
          }
        ]
      },
      {
        empid: "2024516",
        name: "Mason Garcia",
        email: "mason.garcia@example.com",
        department: "Training",
        designation: "Training Manager",
        dob: "1994-11-20",
        doj: "2008-09-15",
        address: "147 Elm St, Hometown, USA",
        mobileno: "9258163704",
        userId: "mgarcia",
        employeeExperience: [
          {
            companyName: "Cisco",
            domain: "Training",
            yearsOfExp: 14.3
          }
        ],
        skillVsRating: [
          {
            training: 3.5
          }
        ]
      },
      {
        empid: "2024517",
        name: "Oliver Martinez",
        email: "oliver.martinez@example.com",
        department: "Sales",
        designation: "Sales Representative",
        dob: "1995-07-30",
        doj: "2007-03-12",
        address: "369 Maple St, Hometown, USA",
        mobileno: "8163709254",
        userId: "omartinez",
        employeeExperience: [
          {
            companyName: "Oracle",
            domain: "Sales",
            yearsOfExp: 15.8
          }
        ],
        skillVsRating: [
          {
            sales: 3.3
          }
        ]
      },
      {
        empid: "2024518",
        name: "Charlotte Anderson",
        email: "charlotte.anderson@example.com",
        department: "Research",
        designation: "Research Scientist",
        dob: "1996-05-25",
        doj: "2006-01-05",
        address: "741 Oak St, Hometown, USA",
        mobileno: "3709258164",
        userId: "canderson",
        employeeExperience: [
          {
            companyName: "Intel",
            domain: "Research",
            yearsOfExp: 16.7
          }
        ],
        skillVsRating: [
          {
            research: 3.1
          }
        ]
      },
      {
        empid: "2024519",
        name: "Amelia Wilson",
        email: "amelia.wilson@example.com",
        department: "Marketing",
        designation: "Marketing Specialist",
        dob: "1997-02-20",
        doj: "2005-08-22",
        address: "258 Pine St, Hometown, USA",
        mobileno: "9253708164",
        userId: "awilson",
        employeeExperience: [
          {
            companyName: "Twitter",
            domain: "Marketing",
            yearsOfExp: 17.4
          }
        ],
        skillVsRating: [
          {
            marketing: 2.9
          }
        ]
      },
      {
        empid: "2024520",
        name: "Evelyn Taylor",
        email: "evelyn.taylor@example.com",
        department: "Customer Support",
        designation: "Customer Support Specialist",
        dob: "1998-09-15",
        doj: "2004-03-30",
        address: "147 Cedar St, Hometown, USA",
        mobileno: "3708169254",
        userId: "etaylor",
        employeeExperience: [
          {
            companyName: "Adobe",
            domain: "Customer Support",
            yearsOfExp: 18.1
          }
        ],
        skillVsRating: [
          {
            customerSupport: 2.7
          }
        ]
      },
      {
        empid: "2024503",
        name: "Ella Brown",
        email: "ella.brown@example.com",
        department: "Finance",
        designation: "Financial Analyst",
        dob: "1982-05-10",
        doj: "2019-11-05",
        address: "101 Pine St, Springfield, USA",
        mobileno: "9870123456",
        userId: "ebrown",
        employeeExperience: [
          {
            companyName: "Apple",
            domain: "Financial Planning",
            yearsOfExp: 4
          }
        ],
        skillVsRating: [
          {
            financialPlanning: 4.2
          }
        ]
      },
      {
        empid: "2024504",
        name: "Frank Davis",
        email: "frank.davis@example.com",
        department: "Operations",
        designation: "Operations Manager",
        dob: "1976-12-28",
        doj: "2014-06-15",
        address: "202 Elm St, Springfield, USA",
        mobileno: "4561237890",
        userId: "fdavis",
        employeeExperience: [
          {
            companyName: "Amazon",
            domain: "Supply Chain",
            yearsOfExp: 6
          }
        ],
        skillVsRating: [
          {
            supplyChain: 4.7
          }
        ]
      }
    ];




    this.employees = employeeData;
    this.loading = false;
  }

  @ViewChild('dt') dt!: Table;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getSkill(employee: EmployeeTableDetails, skillObj: { [key: string]: number }): string {
    const skillName = Object.keys(skillObj)[0];
    const experience = employee.employeeExperience.find(exp => exp.domain === skillName);
    return experience ? experience.domain : skillName;
  }
  
  getSkillRating(employee: EmployeeTableDetails, skillObj: { [key: string]: number }): string {
    const skillName = Object.keys(skillObj)[0];
    const rating = skillObj[skillName];
    return rating.toFixed(1);
  }
  
}
