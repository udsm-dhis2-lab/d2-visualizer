"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[895],{7895:(U,C,a)=>{a.r(C),a.d(C,{ChartModule:()=>S});var m=a(9808),c=a(4100),T=a(2222),f=a(6962),h=a(4239),u=a(7592),x=a(7489),O=a(8424),n=a(5e3),g=a(4889),l=a(1125),p=a(4449),A=a(508),_=a(3251),M=a(8326);let w=(()=>{class e{constructor(){this.onOpenDrawer=new n.vpe}ngOnInit(){}onTabClick(t){this.onOpenDrawer.emit({language:"json",title:"analyticsTab"===t?"DHIS2 Analytics Configuration":"Chart Configuration",snippet:"analyticsTab"===t?u.C:h.r})}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["iapps-menu"]],outputs:{onOpenDrawer:"onOpenDrawer"},decls:10,vars:0,consts:[["mat-tab-nav-bar",""],["mat-tab-link","",3,"click"]],template:function(t,o){1&t&&(n.TgZ(0,"div"),n.TgZ(1,"nav",0),n.TgZ(2,"a",1),n.NdJ("click",function(){return o.onTabClick("analyticsTab")}),n.TgZ(3,"mat-icon"),n._uU(4,"analytics"),n.qZA(),n._uU(5," \xa0 DHIS2 Analytics Configuration "),n.qZA(),n.TgZ(6,"a",1),n.NdJ("click",function(){return o.onTabClick("chartConfigsTab")}),n.TgZ(7,"mat-icon"),n._uU(8,"vertical_split"),n.qZA(),n._uU(9," \xa0 Chart Configuration "),n.qZA(),n.qZA(),n.qZA())},directives:[_.BU,_.Nj,M.Hw],styles:[""]}),e})(),y=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["iapps-visualization"]],decls:3,vars:0,consts:[[1,"visualization-container"],["id","visualization-container",1,"chart-visualizer"]],template:function(t,o){1&t&&(n.TgZ(0,"div"),n.TgZ(1,"div",0),n._UZ(2,"div",1),n.qZA(),n.qZA())},styles:[".visualization-container[_ngcontent-%COMP%]{padding:10px}.chart-visualizer[_ngcontent-%COMP%]{height:60vh;border:1px solid #ddd}"]}),e})();var d=a(3075),v=a(8966),Z=a(8704);function I(e,r){if(1&e){const t=n.EpF();n.TgZ(0,"div"),n.TgZ(1,"h2",6),n._uU(2),n.TgZ(3,"span",7),n.NdJ("click",function(){return n.CHM(t),n.oxw(2).onClose()}),n._uU(4," cancel "),n.qZA(),n.qZA(),n.qZA()}if(2&e){const t=n.oxw(2);n.xp6(2),n.hij(" ",null==t.sourceCodeConfig?null:t.sourceCodeConfig.title,"")}}function z(e,r){if(1&e){const t=n.EpF();n.TgZ(0,"div",1),n.TgZ(1,"div",2),n.TgZ(2,"div",3),n.YNc(3,I,5,1,"div",4),n.TgZ(4,"mat-dialog-content"),n.TgZ(5,"div"),n.TgZ(6,"div"),n.TgZ(7,"ngx-monaco-editor",5),n.NdJ("ngModelChange",function(i){return n.CHM(t),n.oxw().code=i})("onInit",function(i){return n.CHM(t),n.oxw().onEditorInit(i)}),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA()}if(2&e){const t=n.oxw();n.xp6(3),n.Q6J("ngIf",t.sourceCodeConfig),n.xp6(3),n.Udp("height",t.monacoEditorHeight),n.xp6(1),n.Q6J("options",t.editorOptions)("ngModel",t.code)}}let P=(()=>{class e{constructor(){this.isInfoOpen=!1,this.code="",this.cancel=new n.vpe,this.editorOptions={theme:"vs-white",language:"json"},this.monacoEditorHeight="80vh",this.monacoForm=new d.cw({code:new d.NI("")})}ngOnChanges(t){var o;if(t&&(null==t?void 0:t.sourceCodeConfig)){const s=null===(o=null==t?void 0:t.sourceCodeConfig)||void 0===o?void 0:o.currentValue;this.code=s&&s.snippet?JSON.stringify(s.snippet):""}}ngOnInit(){}onEditorInit(t){setTimeout(()=>{var o;t.getAction("editor.action.formatDocument").run(),null===(o=t.getAction("editor.action.format"))||void 0===o||o.run(),t.focus(),t.getPosition()},100)}onClose(){this.cancel.emit(!1)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["iapps-ngx-drawer"]],inputs:{isInfoOpen:"isInfoOpen",sourceCodeConfig:"sourceCodeConfig",code:"code"},outputs:{cancel:"cancel"},features:[n.TTD],decls:1,vars:1,consts:[["class","info-container mat-elevation-z3",4,"ngIf"],[1,"info-container","mat-elevation-z3"],[1,"d-flex","justify-content-between","align-items-center"],[1,"w-100","source-code-container"],[4,"ngIf"],[1,"my-code-editor",2,"height","100%",3,"options","ngModel","ngModelChange","onInit"],["mat-dialog-title","",1,"text-muted"],[1,"material-icons","cancel",3,"click"]],template:function(t,o){1&t&&n.YNc(0,z,8,5,"div",0),2&t&&n.Q6J("ngIf",o.isInfoOpen)},directives:[m.O5,v.uh,v.xY,Z.PG,d.JJ,d.On],styles:[".info-container[_ngcontent-%COMP%]{position:fixed;right:0;bottom:0;top:46px;width:50vw;background-color:#fff;z-index:500}.sticky[_ngcontent-%COMP%]{position:fixed!important;background-color:#fff!important}.cancel[_ngcontent-%COMP%]{float:right;color:#ff4500}.cancel[_ngcontent-%COMP%]:hover{float:right;color:#ff4500;cursor:pointer}iframe[_ngcontent-%COMP%]{width:100%!important;height:100vh!important;overflow-y:auto!important;padding:0;border:0}.source-code-container[_ngcontent-%COMP%]{margin:15px}.my-code-editor[_ngcontent-%COMP%]   .editor-container[_ngcontent-%COMP%]{height:calc(100vh - 100px)}"]}),e})();function N(e,r){if(1&e){const t=n.EpF();n.TgZ(0,"mat-list-item",7),n.NdJ("click",function(){const s=n.CHM(t).$implicit;return n.oxw().onMenuClick(s)}),n._UZ(1,"img",8),n.TgZ(2,"div",9),n._uU(3),n.qZA(),n.qZA()}if(2&e){const t=r.$implicit;n.Q6J("routerLinkActive","active"),n.xp6(1),n.Q6J("src",t.icon,n.LSH)("alt",t.name),n.xp6(2),n.Oqu(t.name)}}const J=[{path:"",pathMatch:"full",component:(()=>{class e{constructor(t,o){this.router=t,this.activatedRoute=o,this.chartConfigurations=h.r,this.chartConfigs=T.s,this.sourceCodeConfig=null,this.code="",this.isInfoOpen=!1,this.panelOpenState=!1,this.step=0}setStep(t,o){this.step=o,t&&this.router.navigate(["./",x.trim(t)],{queryParams:{ps:o}})}ngOnInit(){this.activatedRoute.queryParams.subscribe(t=>{this.step=+(0,O.s)(t,"ps")})}ngAfterViewInit(){(new f.K).setConfig(this.chartConfigurations).setData(u.C).setId("visualization-container").setType("CHART").draw()}onMenuClick(t){t&&(new f.K).setConfig(this.chartConfigurations).setData(u.C).setId("visualization-container").setType("CHART").setChartType(t.id).draw()}onOpenInfo(){this.isInfoOpen=!this.isInfoOpen}onInfoClose(t){this.isInfoOpen=t||!1}onOpenDrawer(t){this.isInfoOpen=!0,this.sourceCodeConfig=t}}return e.\u0275fac=function(t){return new(t||e)(n.Y36(c.F0),n.Y36(c.gz))},e.\u0275cmp=n.Xpm({type:e,selectors:[["iapps-chart"]],decls:24,vars:6,consts:[[1,"example-container"],["mode","side","opened","","fixedInViewport",""],[3,"expanded","opened","closed"],["mat-subheader",""],[3,"routerLinkActive","click",4,"ngFor","ngForOf"],[3,"onOpenDrawer"],[3,"sourceCodeConfig","isInfoOpen","cancel"],[3,"routerLinkActive","click"],["mat-list-icon","",1,"side-menu-icon",3,"src","alt"],["mat-line",""]],template:function(t,o){1&t&&(n.TgZ(0,"mat-drawer-container",0),n.TgZ(1,"mat-drawer",1),n.TgZ(2,"mat-accordion"),n.TgZ(3,"mat-expansion-panel",2),n.NdJ("opened",function(){return o.panelOpenState=!0})("closed",function(){return o.panelOpenState=!1})("opened",function(){return o.setStep("chart",0)}),n.TgZ(4,"mat-expansion-panel-header"),n.TgZ(5,"mat-panel-title"),n.TgZ(6,"div",3),n._uU(7,"Chart Visualization Module"),n.qZA(),n.qZA(),n.qZA(),n.TgZ(8,"mat-list"),n.YNc(9,N,4,4,"mat-list-item",4),n.qZA(),n.qZA(),n.TgZ(10,"mat-expansion-panel",2),n.NdJ("opened",function(){return o.panelOpenState=!0})("closed",function(){return o.panelOpenState=!1})("opened",function(){return o.setStep("map",1)}),n.TgZ(11,"mat-expansion-panel-header"),n.TgZ(12,"mat-panel-title"),n.TgZ(13,"div",3),n._uU(14,"Map Visualization Module"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(15,"mat-expansion-panel",2),n.NdJ("opened",function(){return o.panelOpenState=!0})("closed",function(){return o.panelOpenState=!1})("opened",function(){return o.setStep("table",2)}),n.TgZ(16,"mat-expansion-panel-header"),n.TgZ(17,"mat-panel-title"),n.TgZ(18,"div",3),n._uU(19,"Table Visualization Module"),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.qZA(),n.TgZ(20,"mat-drawer-content"),n.TgZ(21,"iapps-menu",5),n.NdJ("onOpenDrawer",function(s){return o.onOpenDrawer(s)}),n.qZA(),n._UZ(22,"iapps-visualization"),n.qZA(),n.qZA(),n.TgZ(23,"iapps-ngx-drawer",6),n.NdJ("cancel",function(s){return o.onInfoClose(s)}),n.qZA()),2&t&&(n.xp6(3),n.Q6J("expanded",0===o.step),n.xp6(6),n.Q6J("ngForOf",o.chartConfigs),n.xp6(1),n.Q6J("expanded",1===o.step),n.xp6(5),n.Q6J("expanded",2===o.step),n.xp6(8),n.Q6J("sourceCodeConfig",o.sourceCodeConfig)("isInfoOpen",o.isInfoOpen))},directives:[g.kh,g.jA,l.pp,l.ib,l.yz,l.yK,p.gs,p.i$,m.sg,p.Tg,c.Od,p.Nh,A.X2,g.LW,w,y,P],styles:["mat-drawer-container[_ngcontent-%COMP%]{font-size:.9rem!important;height:95vh;top:48px}mat-drawer-container[_ngcontent-%COMP%]   mat-drawer[_ngcontent-%COMP%]{width:20vw;height:100vh}mat-drawer-container[_ngcontent-%COMP%]   .visualization-card-control[_ngcontent-%COMP%]{padding:10px}mat-drawer-container[_ngcontent-%COMP%]   .side-menu-icon[_ngcontent-%COMP%]{height:20px;width:20px}mat-drawer-container[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{font-size:.9rem;font-weight:500;display:flex;align-items:center}mat-drawer-container[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]:hover{background-color:#eee!important;cursor:pointer!important;font-weight:700!important}.active[_ngcontent-%COMP%]{background-color:#eee!important;cursor:pointer!important;font-weight:700!important}.mat-form-field[_ngcontent-%COMP%] + .mat-form-field[_ngcontent-%COMP%]{margin-left:8px}"]}),e})()}];let D=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[c.Bz.forChild(J)],c.Bz]}),e})();var q=a(2024);let S=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[m.ez,D,q.m,Z.nm.forRoot()]]}),e})()}}]);