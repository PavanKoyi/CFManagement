"use strict";(self.webpackChunkCFM=self.webpackChunkCFM||[]).push([[75],{3075:(re,D,l)=>{l.r(D),l.d(D,{PeopleModule:()=>ne});var c=l(177),h=l(8498),s=l(9159),u=l(8834),_=l(9213),p=l(5596),E=l(4823),e=l(4438),R=l(4412);let b=(()=>{class t{constructor(){this.people=[{id:1,name:"John Doe",email:"john@example.com",role:"Consultant",phone:"123-456-7890",joinDate:new Date("2024-01-15"),address:"123 Main St"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"Senior Consultant",phone:"123-456-7891",joinDate:new Date("2023-08-01"),address:"456 Oak St"}],this.peopleSubject=new R.t(this.people)}getPeople(){return this.peopleSubject.asObservable()}addPerson(o){const a={...o,id:Math.max(...this.people.map(m=>m.id),0)+1};this.people=[...this.people,a],this.peopleSubject.next(this.people)}static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275prov=e.jDH({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function S(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Name "),e.k0s())}function I(t,r){if(1&t&&(e.j41(0,"mat-cell"),e.EFF(1),e.k0s()),2&t){const o=r.$implicit;e.R7$(),e.SpI(" ",o.name," ")}}function M(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Email "),e.k0s())}function $(t,r){if(1&t&&(e.j41(0,"mat-cell"),e.EFF(1),e.k0s()),2&t){const o=r.$implicit;e.R7$(),e.SpI(" ",o.email," ")}}function O(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Role "),e.k0s())}function w(t,r){if(1&t&&(e.j41(0,"mat-cell"),e.EFF(1),e.k0s()),2&t){const o=r.$implicit;e.R7$(),e.SpI(" ",o.role," ")}}function G(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Phone "),e.k0s())}function L(t,r){if(1&t&&(e.j41(0,"mat-cell"),e.EFF(1),e.k0s()),2&t){const o=r.$implicit;e.R7$(),e.SpI(" ",o.phone," ")}}function V(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Join Date "),e.k0s())}function Y(t,r){if(1&t&&(e.j41(0,"mat-cell"),e.EFF(1),e.nI1(2,"date"),e.k0s()),2&t){const o=r.$implicit;e.R7$(),e.SpI(" ",e.bMT(2,1,o.joinDate)," ")}}function H(t,r){1&t&&(e.j41(0,"mat-header-cell"),e.EFF(1," Actions "),e.k0s())}function q(t,r){if(1&t){const o=e.RV6();e.j41(0,"mat-cell")(1,"button",14),e.bIt("click",function(){const a=e.eBV(o).$implicit,m=e.XpG();return e.Njj(m.viewPerson(a.id))}),e.j41(2,"mat-icon"),e.EFF(3,"visibility"),e.k0s()(),e.j41(4,"button",15),e.bIt("click",function(){const a=e.eBV(o).$implicit,m=e.XpG();return e.Njj(m.editPerson(a.id))}),e.j41(5,"mat-icon"),e.EFF(6,"edit"),e.k0s()(),e.j41(7,"button",16),e.bIt("click",function(){const a=e.eBV(o).$implicit,m=e.XpG();return e.Njj(m.viewPayments(a.id))}),e.j41(8,"mat-icon"),e.EFF(9,"payments"),e.k0s()()()}}function B(t,r){1&t&&e.nrm(0,"mat-header-row")}function X(t,r){1&t&&e.nrm(0,"mat-row")}let U=(()=>{class t{constructor(o,n){this.router=o,this.peopleService=n,this.displayedColumns=["name","email","role","phone","joinDate","actions"],this.people=[]}ngOnInit(){this.peopleService.getPeople().subscribe(o=>{this.people=o})}viewPerson(o){this.router.navigate(["/people",o])}editPerson(o){this.router.navigate(["/people",o,"edit"])}viewPayments(o){this.router.navigate(["/people",o,"payments"])}addPerson(){this.router.navigate(["/people/new"])}static#e=this.\u0275fac=function(n){return new(n||t)(e.rXU(h.Ix),e.rXU(b))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-people-list"]],standalone:!0,features:[e.aNF],decls:29,vars:3,consts:[[1,"people-list-container"],[1,"header"],["mat-raised-button","","color","primary",3,"click"],[3,"dataSource"],["matColumnDef","name"],[4,"matHeaderCellDef"],[4,"matCellDef"],["matColumnDef","email"],["matColumnDef","role"],["matColumnDef","phone"],["matColumnDef","joinDate"],["matColumnDef","actions"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],["mat-icon-button","","matTooltip","View Details",3,"click"],["mat-icon-button","","matTooltip","Edit",3,"click"],["mat-icon-button","","matTooltip","Payment History",3,"click"]],template:function(n,a){1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"h2"),e.EFF(3,"People"),e.k0s(),e.j41(4,"button",2),e.bIt("click",function(){return a.addPerson()}),e.j41(5,"mat-icon"),e.EFF(6,"add"),e.k0s(),e.EFF(7," Add Person "),e.k0s()(),e.j41(8,"mat-table",3),e.qex(9,4),e.DNE(10,S,2,0,"mat-header-cell",5)(11,I,2,1,"mat-cell",6),e.bVm(),e.qex(12,7),e.DNE(13,M,2,0,"mat-header-cell",5)(14,$,2,1,"mat-cell",6),e.bVm(),e.qex(15,8),e.DNE(16,O,2,0,"mat-header-cell",5)(17,w,2,1,"mat-cell",6),e.bVm(),e.qex(18,9),e.DNE(19,G,2,0,"mat-header-cell",5)(20,L,2,1,"mat-cell",6),e.bVm(),e.qex(21,10),e.DNE(22,V,2,0,"mat-header-cell",5)(23,Y,3,3,"mat-cell",6),e.bVm(),e.qex(24,11),e.DNE(25,H,2,0,"mat-header-cell",5)(26,q,10,0,"mat-cell",6),e.bVm(),e.DNE(27,B,1,0,"mat-header-row",12)(28,X,1,0,"mat-row",13),e.k0s()()),2&n&&(e.R7$(8),e.Y8G("dataSource",a.people),e.R7$(19),e.Y8G("matHeaderRowDef",a.displayedColumns),e.R7$(),e.Y8G("matRowDefColumns",a.displayedColumns))},dependencies:[c.MD,c.vh,s.tP,s.Zl,s.tL,s.ji,s.cC,s.YV,s.iL,s.KS,s.$R,s.YZ,s.NB,u.Hl,u.$z,u.iY,_.m_,_.An,p.Hu,E.uc,E.oV],styles:[".people-list-container[_ngcontent-%COMP%]{padding:20px}.people-list-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.people-list-container[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0}.people-list-container[_ngcontent-%COMP%]   mat-table[_ngcontent-%COMP%]{width:100%}.people-list-container[_ngcontent-%COMP%]   .mat-column-actions[_ngcontent-%COMP%]{width:120px;text-align:right}"]})}return t})(),J=(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-person-details"]],standalone:!0,features:[e.aNF],decls:2,vars:0,template:function(n,a){1&n&&(e.j41(0,"p"),e.EFF(1,"person-details works!"),e.k0s())}})}return t})();var i=l(9417),d=l(882),v=l(9631),y=l(2798),f=l(5084),T=l(6600);function A(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Name is required "),e.k0s())}function z(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Email is required "),e.k0s())}function Z(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Please enter a valid email address "),e.k0s())}function K(t,r){if(1&t&&(e.j41(0,"mat-option",18),e.EFF(1),e.k0s()),2&t){const o=r.$implicit;e.Y8G("value",o),e.R7$(),e.SpI(" ",o," ")}}function W(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Role is required "),e.k0s())}function Q(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Phone is required "),e.k0s())}function ee(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Join date is required "),e.k0s())}function te(t,r){1&t&&(e.j41(0,"mat-error"),e.EFF(1," Address is required "),e.k0s())}let x=(()=>{class t{constructor(o,n,a){this.fb=o,this.router=n,this.peopleService=a,this.roles=["Consultant","Senior Consultant","Manager","Director","Partner"]}ngOnInit(){this.initializeForm()}initializeForm(){this.personForm=this.fb.group({name:["",i.k0.required],email:["",[i.k0.required,i.k0.email]],role:["",i.k0.required],phone:["",i.k0.required],joinDate:["",i.k0.required],address:["",i.k0.required],notes:[""]})}onSubmit(){if(this.personForm.valid){const o=this.personForm.value;console.log("Form submitted with data:",o),this.peopleService.addPerson({...o,joinDate:new Date(o.joinDate)}),console.log("POST request to /api/people"),console.log("Request payload:",JSON.stringify(o,null,2)),this.router.navigate(["/people"])}else console.log("Form is invalid"),this.markFormGroupTouched(this.personForm)}markFormGroupTouched(o){Object.values(o.controls).forEach(n=>{n.markAsTouched(),n instanceof i.gE&&this.markFormGroupTouched(n)})}static#e=this.\u0275fac=function(n){return new(n||t)(e.rXU(i.ok),e.rXU(h.Ix),e.rXU(b))};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-person-form"]],standalone:!0,features:[e.aNF],decls:52,vars:11,consts:[["joinDatePicker",""],[1,"person-form-container"],[3,"ngSubmit","formGroup"],[1,"form-section"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","type","email","formControlName","email"],["formControlName","role"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","phone"],["matInput","","formControlName","joinDate",3,"matDatepicker"],["matSuffix","",3,"for"],["matInput","","formControlName","address","rows","3"],["matInput","","formControlName","notes","rows","3"],[1,"form-actions"],["mat-button","","type","button","routerLink","/people"],["mat-raised-button","","color","primary","type","submit"],[3,"value"]],template:function(n,a){if(1&n){const m=e.RV6();e.j41(0,"div",1)(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),e.EFF(4,"Add New Person"),e.k0s()(),e.j41(5,"mat-card-content")(6,"form",2),e.bIt("ngSubmit",function(){return e.eBV(m),e.Njj(a.onSubmit())}),e.j41(7,"div",3)(8,"mat-form-field",4)(9,"mat-label"),e.EFF(10,"Name"),e.k0s(),e.nrm(11,"input",5),e.DNE(12,A,2,0,"mat-error",6),e.k0s(),e.j41(13,"mat-form-field",4)(14,"mat-label"),e.EFF(15,"Email"),e.k0s(),e.nrm(16,"input",7),e.DNE(17,z,2,0,"mat-error",6)(18,Z,2,0,"mat-error",6),e.k0s(),e.j41(19,"mat-form-field",4)(20,"mat-label"),e.EFF(21,"Role"),e.k0s(),e.j41(22,"mat-select",8),e.DNE(23,K,2,2,"mat-option",9),e.k0s(),e.DNE(24,W,2,0,"mat-error",6),e.k0s(),e.j41(25,"mat-form-field",4)(26,"mat-label"),e.EFF(27,"Phone"),e.k0s(),e.nrm(28,"input",10),e.DNE(29,Q,2,0,"mat-error",6),e.k0s(),e.j41(30,"mat-form-field",4)(31,"mat-label"),e.EFF(32,"Join Date"),e.k0s(),e.nrm(33,"input",11)(34,"mat-datepicker-toggle",12)(35,"mat-datepicker",null,0),e.DNE(37,ee,2,0,"mat-error",6),e.k0s(),e.j41(38,"mat-form-field",4)(39,"mat-label"),e.EFF(40,"Address"),e.k0s(),e.nrm(41,"textarea",13),e.DNE(42,te,2,0,"mat-error",6),e.k0s(),e.j41(43,"mat-form-field",4)(44,"mat-label"),e.EFF(45,"Notes"),e.k0s(),e.nrm(46,"textarea",14),e.k0s()(),e.j41(47,"div",15)(48,"button",16),e.EFF(49,"Cancel"),e.k0s(),e.j41(50,"button",17),e.EFF(51," Submit "),e.k0s()()()()()()}if(2&n){let m,F,C,P,j,g,k;const N=e.sdS(36);e.R7$(6),e.Y8G("formGroup",a.personForm),e.R7$(6),e.Y8G("ngIf",null==(m=a.personForm.get("name"))||null==m.errors?null:m.errors.required),e.R7$(5),e.Y8G("ngIf",null==(F=a.personForm.get("email"))||null==F.errors?null:F.errors.required),e.R7$(),e.Y8G("ngIf",null==(C=a.personForm.get("email"))||null==C.errors?null:C.errors.email),e.R7$(5),e.Y8G("ngForOf",a.roles),e.R7$(),e.Y8G("ngIf",null==(P=a.personForm.get("role"))||null==P.errors?null:P.errors.required),e.R7$(5),e.Y8G("ngIf",null==(j=a.personForm.get("phone"))||null==j.errors?null:j.errors.required),e.R7$(4),e.Y8G("matDatepicker",N),e.R7$(),e.Y8G("for",N),e.R7$(3),e.Y8G("ngIf",null==(g=a.personForm.get("joinDate"))||null==g.errors?null:g.errors.required),e.R7$(5),e.Y8G("ngIf",null==(k=a.personForm.get("address"))||null==k.errors?null:k.errors.required)}},dependencies:[c.MD,c.Sq,c.bT,i.X1,i.qT,i.me,i.BC,i.cb,i.j4,i.JD,d.RG,d.rl,d.nJ,d.TL,d.yw,v.fS,v.fg,y.Ve,y.VO,T.wT,f.X6,f.Vh,f.bZ,f.bU,T.WX,u.Hl,u.$z,p.Hu,p.RN,p.m2,p.MM,p.dh],styles:[".person-form-container[_ngcontent-%COMP%]{padding:20px;max-width:800px;margin:0 auto}.person-form-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:16px;margin-bottom:24px}.person-form-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.person-form-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:16px;margin-top:24px}"]})}return t})();const oe=[{path:"",component:U},{path:"new",component:x},{path:":id",component:J},{path:":id/edit",component:x},{path:":id/payments",component:(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275cmp=e.VBU({type:t,selectors:[["app-payment-history"]],standalone:!0,features:[e.aNF],decls:2,vars:0,template:function(n,a){1&n&&(e.j41(0,"p"),e.EFF(1,"payment-history works!"),e.k0s())}})}return t})()}];let ne=(()=>{class t{static#e=this.\u0275fac=function(n){return new(n||t)};static#t=this.\u0275mod=e.$C({type:t});static#o=this.\u0275inj=e.G2t({imports:[c.MD,h.iI.forChild(oe),s.tP,u.Hl,_.m_,p.Hu]})}return t})()}}]);