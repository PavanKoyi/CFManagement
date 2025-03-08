import{a as Se}from"./chunk-WQO7UOZX.js";import{a as pe,b as ce,c as fe,d as ge,e as _e,f as Me}from"./chunk-KGI4YOJ3.js";import{a as B,c as z,d as U,e as J,f as K,i as Q,k as W,l as ne,m as ae,o as me,r as le,s as se,u as ue,v as de}from"./chunk-CMH7VPW4.js";import{Bb as O,Ea as t,Fa as e,Ga as c,Hb as k,Jb as P,Ka as q,Kb as V,Na as G,Nb as w,P as I,Tc as j,U as b,V as D,Wa as R,Xa as r,Ya as N,Za as A,_c as X,a as F,ad as u,b as x,cd as Y,dd as Z,eb as T,fa as n,ga as f,gd as $,hd as ee,id as te,kd as re,ld as oe,nd as ie,ua as d,vb as L,wa as l}from"./chunk-SBUFGK5X.js";function he(o,a){o&1&&(t(0,"mat-error"),r(1," Name is required "),e())}function ve(o,a){o&1&&(t(0,"mat-error"),r(1," Address is required "),e())}function Ce(o,a){o&1&&(t(0,"mat-error"),r(1," Total rooms is required "),e())}function He(o,a){o&1&&(t(0,"mat-error"),r(1," Must have at least 1 room "),e())}function Ee(o,a){o&1&&(t(0,"mat-error"),r(1," Monthly rent is required "),e())}function Fe(o,a){o&1&&(t(0,"mat-error"),r(1," Monthly rent cannot be negative "),e())}function xe(o,a){o&1&&(t(0,"mat-error"),r(1," Lease start date is required "),e())}function ye(o,a){o&1&&(t(0,"mat-error"),r(1," Lease duration is required "),e())}function Ie(o,a){o&1&&(t(0,"mat-error"),r(1," Lease duration must be at least 1 month "),e())}function be(o,a){o&1&&(t(0,"mat-error"),r(1," Status is required "),e())}var Xe=(()=>{let a=class a{constructor(s,m,i,p){this.fb=s,this.router=m,this.route=i,this.guestHouseService=p,this.isEditMode=!1}ngOnInit(){this.initializeForm(),this.route.params.subscribe(s=>{s.id&&(this.isEditMode=!0,this.guestHouseId=+s.id,this.loadGuestHouseData(this.guestHouseId))})}initializeForm(){this.guestHouseForm=this.fb.group({name:["",u.required],address:["",u.required],totalRooms:["",[u.required,u.min(1)]],monthlyRent:["",[u.required,u.min(0)]],leaseStartDate:["",u.required],leaseDuration:["",[u.required,u.min(1)]],status:["AVAILABLE",u.required]})}loadGuestHouseData(s){let m=this.guestHouseService.getGuestHouse(s);m&&this.guestHouseForm.patchValue({name:m.name,address:m.address,totalRooms:m.totalRooms,monthlyRent:m.monthlyRent,leaseStartDate:m.leaseStartDate,leaseDuration:m.leaseDuration,status:m.status})}onSubmit(){if(this.guestHouseForm.valid){let s=this.guestHouseForm.value;this.isEditMode&&this.guestHouseId?this.guestHouseService.updateGuestHouse(x(F({},s),{id:this.guestHouseId,currentOccupants:0,currentResidents:[],expenses:[]})):this.guestHouseService.addGuestHouse(x(F({},s),{currentOccupants:0,currentResidents:[],expenses:[]})),this.router.navigate(["/guesthouses"])}}};a.\u0275fac=function(m){return new(m||a)(f(oe),f(P),f(k),f(Se))},a.\u0275cmp=I({type:a,selectors:[["app-guest-house-form"]],standalone:!0,features:[T],decls:60,vars:16,consts:[["leaseStartPicker",""],[1,"guesthouse-form-container"],[3,"ngSubmit","formGroup"],[1,"form-section"],["appearance","outline"],["matInput","","formControlName","name"],[4,"ngIf"],["matInput","","formControlName","address","rows","3"],["matInput","","type","number","formControlName","totalRooms"],["matInput","","type","number","formControlName","monthlyRent"],["matInput","","formControlName","leaseStartDate",3,"matDatepicker"],["matSuffix","",3,"for"],["matInput","","type","number","formControlName","leaseDuration"],["formControlName","status"],["value","AVAILABLE"],["value","FULL"],["value","MAINTENANCE"],[1,"form-actions"],["mat-button","","type","button","routerLink","/guesthouses"],["mat-raised-button","","color","primary","type","submit",3,"disabled"]],template:function(m,i){if(m&1){let p=q();t(0,"div",1)(1,"mat-card")(2,"mat-card-header")(3,"mat-card-title"),r(4),e()(),t(5,"mat-card-content")(6,"form",2),G("ngSubmit",function(){return b(p),D(i.onSubmit())}),t(7,"div",3)(8,"mat-form-field",4)(9,"mat-label"),r(10,"Name"),e(),c(11,"input",5),d(12,he,2,0,"mat-error",6),e(),t(13,"mat-form-field",4)(14,"mat-label"),r(15,"Address"),e(),c(16,"textarea",7),d(17,ve,2,0,"mat-error",6),e(),t(18,"mat-form-field",4)(19,"mat-label"),r(20,"Total Rooms"),e(),c(21,"input",8),d(22,Ce,2,0,"mat-error",6)(23,He,2,0,"mat-error",6),e(),t(24,"mat-form-field",4)(25,"mat-label"),r(26,"Monthly Rent"),e(),c(27,"input",9),d(28,Ee,2,0,"mat-error",6)(29,Fe,2,0,"mat-error",6),e(),t(30,"mat-form-field",4)(31,"mat-label"),r(32,"Lease Start Date"),e(),c(33,"input",10)(34,"mat-datepicker-toggle",11)(35,"mat-datepicker",null,0),d(37,xe,2,0,"mat-error",6),e(),t(38,"mat-form-field",4)(39,"mat-label"),r(40,"Lease Duration (months)"),e(),c(41,"input",12),d(42,ye,2,0,"mat-error",6)(43,Ie,2,0,"mat-error",6),e(),t(44,"mat-form-field",4)(45,"mat-label"),r(46,"Status"),e(),t(47,"mat-select",13)(48,"mat-option",14),r(49,"Available"),e(),t(50,"mat-option",15),r(51,"Full"),e(),t(52,"mat-option",16),r(53,"Maintenance"),e()(),d(54,be,2,0,"mat-error",6),e()(),t(55,"div",17)(56,"button",18),r(57,"Cancel"),e(),t(58,"button",19),r(59),e()()()()()()}if(m&2){let p,g,_,M,S,h,v,C,H,E,y=R(36);n(4),N(i.isEditMode?"Edit Accomodation":"Add New Accomodation"),n(2),l("formGroup",i.guestHouseForm),n(6),l("ngIf",(p=i.guestHouseForm.get("name"))==null||p.errors==null?null:p.errors.required),n(5),l("ngIf",(g=i.guestHouseForm.get("address"))==null||g.errors==null?null:g.errors.required),n(5),l("ngIf",(_=i.guestHouseForm.get("totalRooms"))==null||_.errors==null?null:_.errors.required),n(),l("ngIf",(M=i.guestHouseForm.get("totalRooms"))==null||M.errors==null?null:M.errors.min),n(5),l("ngIf",(S=i.guestHouseForm.get("monthlyRent"))==null||S.errors==null?null:S.errors.required),n(),l("ngIf",(h=i.guestHouseForm.get("monthlyRent"))==null||h.errors==null?null:h.errors.min),n(4),l("matDatepicker",y),n(),l("for",y),n(3),l("ngIf",(v=i.guestHouseForm.get("leaseStartDate"))==null||v.errors==null?null:v.errors.required),n(5),l("ngIf",(C=i.guestHouseForm.get("leaseDuration"))==null||C.errors==null?null:C.errors.required),n(),l("ngIf",(H=i.guestHouseForm.get("leaseDuration"))==null||H.errors==null?null:H.errors.min),n(11),l("ngIf",(E=i.guestHouseForm.get("status"))==null||E.errors==null?null:E.errors.required),n(4),l("disabled",!i.guestHouseForm.valid),n(),A(" ",i.isEditMode?"Update":"Save"," ")}},dependencies:[O,L,ie,$,X,ee,Y,Z,te,re,se,le,ne,ae,me,de,ue,ce,pe,j,Me,fe,ge,_e,z,B,W,U,K,Q,J,w,V],styles:[".guesthouse-form-container[_ngcontent-%COMP%]{padding:20px}.guesthouse-form-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{max-width:800px;margin:0 auto}.guesthouse-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin:20px 0}.guesthouse-form-container[_ngcontent-%COMP%]   .form-section[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{width:100%}.guesthouse-form-container[_ngcontent-%COMP%]   .form-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:8px;margin-top:20px}"]});let o=a;return o})();export{Xe as GuestHouseFormComponent};
