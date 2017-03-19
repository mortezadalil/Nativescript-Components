import { Component, ViewChild, ChangeDetectorRef,ViewContainerRef } from "@angular/core";
import { DrawerPage } from "./pages/drawer.page";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { DialogContent } from './pages/CustomDialogTest/DialogContent.component'
import dialogs = require("ui/dialogs");

@Component({
    selector: 'app',
    //  template: '<page-router-outlet></page-router-outlet>',
    templateUrl: 'app.html'
})
export class AppComponent extends DrawerPage {
    @ViewChild('drawerComponent')
    public drawerComponent: RadSideDrawerComponent;
    ngAfterViewInit(): void {
        //اگر ست تایم اوت نذاریم با جابجایی بین کامپوننت ها به خطا میخوریم
        //انگار ویوها هنوز لود نشده باشند
        setTimeout(() => {
            this.drawer = this.drawerComponent.sideDrawer;
        }, 0)
    }
    constructor(private changeDetectorRef: ChangeDetectorRef,
     private modalService: ModalDialogService,
        private viewContainerRef: ViewContainerRef,
     private routerExtensions: RouterExtensions) {
        super(changeDetectorRef);



    }
    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
    public toggle() {
        this.drawer.toggleDrawerState();
        //el.showDrawer();
        //   this._drawerService.toggleDrawerState();
    }
    menu1() {
        // inputType property can be dialogs.inputType.password or dialogs.inputType.text.
        dialogs.prompt({
            title: "عنوان  معمولی",
            message: "متن پیام",
            okButtonText: "تایید",
            cancelButtonText: "لغو",
            neutralButtonText: "دکمه",
            defaultText: "متن پیش فرض",
            inputType: dialogs.inputType.password
        }).then(r => {
            console.log("Dialog result: " + r.result + ", text: " + r.text);
        });
    }

    menu2() {
        let options: ModalDialogOptions = {
            context: { promptMsg: "این هم دیالوگ کاستوم که یک کامپوننت است." },
            fullscreen: false,
            viewContainerRef: this.viewContainerRef
        };

        this.modalService.showModal(DialogContent, options);
    }
}
