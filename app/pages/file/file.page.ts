import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { DrawerPage } from "../drawer.page";
import application = require("application");
import * as Toast from 'nativescript-toasts';
import { RouterExtensions } from "nativescript-angular/router";

import { ScrollView } from "ui/scroll-view";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';

@Component({
    selector: 'file-page',
    template: `

           <FlexboxLayout  flexDirection="row-reverse" class="drawer-link"
                 orientation="horizontal"
                 [nsRouterLink]="['/home']">
        <Label class="fa" text="{{'fa-home' | fonticon}}"></Label>
                 
        <Label class="text" text="صفحه اصلی" margin-right="50"></Label>
  
           <Label class="m-5" text="Back if in't first page'" color="#8C489F" (tap)="goBack()"></Label>


    `,

})
export class FilePage  {


    constructor(private changeDetectorRef: ChangeDetectorRef,  private routerExtensions: RouterExtensions) {
      

    }

 public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
  
}
