import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { DrawerPage } from "../drawer.page";
import application = require("application");
import { ScrollView } from "ui/scroll-view";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { DrawerService } from '../../services/drawer.service';

// https://docs.nativescript.org/angular/code-samples/ui/scroll-view.html اسکرول اسلایدر
// https://gist.github.com/NathanWalker/e8f4f7c42af04fc725764a9867936e3d دراور
@Component({
    selector: 'home-page',
    templateUrl: 'pages/home/home.page.html',
    styles: [`
  .PersianBold{
        background-color:gray;
        font-weight: bold;
        font-family:iransans-bold;
        font-size:20;
        color:white;
        text-align:center;
    }
      .PersianLight{
        background-color:yellow;
        font-weight: bold;
        font-family:iransans-light;
        font-size:20;
        color:gray;
        text-align:center;
    }
    .Box1{
        background-color:red;
    }
     .Box2{
       background-color:yellow;
    }

    `]
})
export class HomePage extends DrawerPage implements AfterViewInit {

    currentSlide: number = 1;

    @ViewChild('slider')
    sv: ElementRef;

    @ViewChild('drawerComponent')
    public drawerComponent: RadSideDrawerComponent;
    private _drawer: SideDrawerType;

    ngAfterViewInit(): void {
        //اگر ست تایم اوت نذاریم با جابجایی بین کامپوننت ها به خطا میخوریم
        //انگار ویوها هنوز لود نشده باشند
        setTimeout(() => {
            this._drawer = this.drawerComponent.sideDrawer;
            let sv = <ScrollView>this.sv.nativeElement;
            sv.android.setHorizontalScrollBarEnabled(false);
        }, 0)
    }

    constructor(private changeDetectorRef: ChangeDetectorRef, private _drawerService: DrawerService) {
        super(changeDetectorRef);
        this.AndroidActivityEvent();

    }
    public toggle() {
        this._drawer.toggleDrawerState();
        //el.showDrawer();
        //   this._drawerService.toggleDrawerState();
    }

    private tap(input: string) {

        switch (input) {
            case 'next':
                this.currentSlide++;
                break;
            case 'prev':
                this.currentSlide--;
                break;
            default:
                break;
        }


        if (this.currentSlide > 3) this.currentSlide = 3;
        if (this.currentSlide < 1) this.currentSlide = 1;

    }
    private AndroidActivityEvent() {
        if (application.android) {
            application.android.on(application.AndroidApplication.activityCreatedEvent, function (args: application.AndroidActivityBundleEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
            });

            application.android.on(application.AndroidApplication.activityDestroyedEvent, function (args: application.AndroidActivityEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            application.android.on(application.AndroidApplication.activityStartedEvent, function (args: application.AndroidActivityEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            application.android.on(application.AndroidApplication.activityPausedEvent, function (args: application.AndroidActivityEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            application.android.on(application.AndroidApplication.activityResumedEvent, function (args: application.AndroidActivityEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            application.android.on(application.AndroidApplication.activityStoppedEvent, function (args: application.AndroidActivityEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            application.android.on(application.AndroidApplication.saveActivityStateEvent, function (args: application.AndroidActivityBundleEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity + ", Bundle: " + args.bundle);
            });

            application.android.on(application.AndroidApplication.activityResultEvent, function (args: application.AndroidActivityResultEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity +
                    ", requestCode: " + args.requestCode + ", resultCode: " + args.resultCode + ", Intent: " + args.intent);
            });

            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args: application.AndroidActivityBackPressedEventData) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
                // Set args.cancel = true to cancel back navigation and do something custom.
            });
        }
    }


}
