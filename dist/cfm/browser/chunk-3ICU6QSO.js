import{I as l,a as r,b as m,g as i}from"./chunk-SBUFGK5X.js";var y=(()=>{let t=class t{constructor(){this.employees=[{id:1,name:"John Doe",email:"john@example.com",role:"Senior Developer",phone:"123-456-7890",joinDate:new Date("2024-01-15"),address:"123 Main St",employmentType:"FULL_TIME",annualSalary:85e3,medical:{planType:"Premium",coverageType:"Family",startDate:new Date("2024-01-15")},retirement401k:{contributionPercentage:5,companyMatch:4}},{id:2,name:"Jane Smith",email:"jane@example.com",role:"Project Manager",phone:"123-456-7891",joinDate:new Date("2023-08-01"),address:"456 Oak St",employmentType:"FULL_TIME",annualSalary:95e3,medical:{planType:"Standard",coverageType:"Individual",startDate:new Date("2023-08-01")},retirement401k:{contributionPercentage:6,companyMatch:4}},{id:3,name:"Mike Johnson",email:"mike@example.com",role:"UI/UX Designer",phone:"123-456-7892",joinDate:new Date("2023-06-15"),address:"789 Pine St",employmentType:"CONTRACTOR",hourlyRate:65,expectedHoursPerWeek:40,contractDuration:6},{id:4,name:"Sarah Williams",email:"sarah@example.com",role:"Backend Developer",phone:"123-456-7893",joinDate:new Date("2023-09-20"),address:"321 Elm St",employmentType:"FULL_TIME",annualSalary:78e3,medical:{planType:"Standard",coverageType:"Individual",startDate:new Date("2023-09-20")},retirement401k:{contributionPercentage:4,companyMatch:4}},{id:5,name:"David Brown",email:"david@example.com",role:"DevOps Engineer",phone:"123-456-7894",joinDate:new Date("2023-11-10"),address:"654 Maple St",employmentType:"CONTRACTOR",hourlyRate:75,expectedHoursPerWeek:35,contractDuration:12},{id:6,name:"Emily Davis",email:"emily@example.com",role:"QA Engineer",phone:"123-456-7895",joinDate:new Date("2024-02-01"),address:"987 Cedar St",employmentType:"FULL_TIME",annualSalary:72e3,medical:{planType:"Premium",coverageType:"Family",startDate:new Date("2024-02-01")},retirement401k:{contributionPercentage:5,companyMatch:4}},{id:7,name:"Alex Turner",email:"alex@example.com",role:"Frontend Developer",phone:"123-456-7896",joinDate:new Date("2023-07-15"),address:"741 Birch St",employmentType:"CONTRACTOR",hourlyRate:60,expectedHoursPerWeek:40,contractDuration:9},{id:8,name:"Lisa Anderson",email:"lisa@example.com",role:"Product Owner",phone:"123-456-7897",joinDate:new Date("2023-10-05"),address:"852 Walnut St",employmentType:"FULL_TIME",annualSalary:88e3,medical:{planType:"Premium",coverageType:"Individual",startDate:new Date("2023-10-05")},retirement401k:{contributionPercentage:7,companyMatch:4}},{id:9,name:"Chris Wilson",email:"chris@example.com",role:"System Architect",phone:"123-456-7898",joinDate:new Date("2023-12-01"),address:"963 Pine St",employmentType:"FULL_TIME",annualSalary:98e3,medical:{planType:"Premium",coverageType:"Family",startDate:new Date("2023-12-01")},retirement401k:{contributionPercentage:8,companyMatch:4}},{id:10,name:"Rachel Green",email:"rachel@example.com",role:"Business Analyst",phone:"123-456-7899",joinDate:new Date("2024-01-20"),address:"159 Oak St",employmentType:"CONTRACTOR",hourlyRate:55,expectedHoursPerWeek:30,contractDuration:6}],this.employeesSubject=new i(this.employees)}getEmployees(){return this.employeesSubject.asObservable()}getEmployeeById(a){return new i(this.employees.find(e=>e.id===a)).asObservable()}addEmployee(a){let e=Math.max(...this.employees.map(p=>p.id||0),0)+1,o=m(r({},a),{id:e});this.employees=[...this.employees,o],this.employeesSubject.next(this.employees)}getEmployee(a){return this.employees.find(e=>e.id===a)}updateEmployee(a){let e=this.employees.findIndex(o=>o.id===a.id);e!==-1&&(this.employees[e]=a,this.employeesSubject.next([...this.employees]))}deleteEmployee(a){this.employees=this.employees.filter(e=>e.id!==a),this.employeesSubject.next(this.employees)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=l({token:t,factory:t.\u0275fac,providedIn:"root"});let n=t;return n})();export{y as a};
