import {ViewChild, ChangeDetectorRef} from "@angular/core";
import {RadSideDrawerComponent, SideDrawerType} from "nativescript-telerik-ui/sidedrawer/angular";

export class DrawerPage {
   private drawerIsOpen: boolean = false;
   // @ViewChild(RadSideDrawerComponent) protected drawerComponent: RadSideDrawerComponent;
    //بالایی یا پایینی فرقی ندارد قرار است المانی از صفحه را بگیریم
     @ViewChild('drawerComponent') protected drawerComponent: RadSideDrawerComponent;
    protected drawer: SideDrawerType;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    protected getDrawerView() {
    
        this._changeDetectorRef.detectChanges();
       this.drawer = this.drawerComponent.sideDrawer;

 
        
    }

    protected openDrawer() {
        this.drawer.showDrawer();
    }

    protected closeDrawer() {
        this.drawer.closeDrawer();
    }
    protected initDrawer(drawer) {
        this.drawer = drawer;
    }
    protected toggleDrawerState() {
        this.drawerIsOpen = !this.drawerIsOpen;
        this.drawer.toggleDrawerState();
    }

}