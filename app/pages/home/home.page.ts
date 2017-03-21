import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { DrawerPage } from "../drawer.page";
import application = require("application");
import * as Toast from 'nativescript-toasts';

import { ScrollView } from "ui/scroll-view";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';



//import { DrawerService } from '../../services/drawer.service';
// import { EventData } from 'data/observable';

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
    .white{
     background-color:white;
    }
    .yellow{
             background-color:yellow;
    }

    `]
})
export class HomePage extends DrawerPage implements AfterViewInit {


    currentSlide: number = 1;

    source: Array<any>;
    private counter: number;

    ngAfterViewInit(): void {
        //در کلاس والد ویوی دراور را به آبجکت تبدیل میکنیم
        this.getDrawerView();
    }

    //نکته مهم
    //اسلایدر را به دو صورت میتوان در متدها گرفت 
    //به کمک ویوچایلد که در متدهای چرخه حیات هم میشد استفاده کرد
    //و راه دوم به کمک ارسال آبجکت المان از ویو به متد مثل مثال زیر
    //راه اول کامنت شده است
    // @ViewChild('slider')
    // sv: ElementRef;
    removeScrollbar(sv: ScrollView) {
        // let sv = <ScrollView>this.sv.nativeElement;
        //sv.android.setHorizontalScrollBarEnabled(false);
        if (sv == undefined) {
            console.log("UUUUU");
        } else {
            console.log("ScrollBare Created")
            //میتوان از متدها یا پراپرتی های نیتیو خود اندروید یا آی او اس هم استفاده کرد
            //اطلاعات مربوط به این متدها در آدرس زیر است
            //https://docs.nativescript.org/api-reference/classes/_ui_scroll_view_.scrollview.html
            //پراپرتی Android را نگاه کن
            sv.android.setHorizontalScrollBarEnabled(false);
        }

    }

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
        this.AndroidActivityEvent();
        this.source = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.source.push({ title: "t" + i, email: "erer" + i + "@gmail.com" });
            this.counter = i;
        }

    }
   
    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }
 

    isItemVisible: boolean = false;
    loadMoreItems(event) {
        this.isItemVisible = true;
        console.log( "loading...."+this.isItemVisible);
        var source = this.source;
        var counter = this.counter;
        var self=this;
        setTimeout(function () {
            //   self.push({ title: "NEW: t" + this.counter, email: "erer" + this.counter + "@gmail.com" })
            for (var i = 0; i < 50; i++) {
                source.push({ title: "NEW: t" + counter, email: "erer" + counter + "@gmail.com" })
                counter = i;
            }
        self.isItemVisible = false;
             console.log("finish loading...."+self.isItemVisible);          
        }, 3000);

    }


    onLoaded(event) {
        //  console.log("onLoaded") 
    }
    onItemLoading(event) {
        //  console.log("onItemLoading")
    
    }
    onItemTap(event) {
        this.counter += 1;
        this.source.push({ title: "NEW: t" + this.counter, email: "erer" + this.counter + "@gmail.com" })

        console.log("Tap" + event.index)
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

    OpenDrawer() {

        let toastOptions1: Toast.ToastOptions =
            {
                text: "کار نمی کند چون اولا باید از کلاس دراور ارث بری کنیم.",
                duration: Toast.DURATION.LONG
            };
        Toast.show(toastOptions1);
        let toastOptions2: Toast.ToastOptions =
            {
                text: "ثانیا باید ویوکامپوننت حاوی دراور را در همین کامپوننت بگیریم و به والد بفرستیم",
                duration: Toast.DURATION.LONG
            };
        Toast.show(toastOptions2);
        //کار نمی کند چون اولا باید از کلاس دراور ارث بری کنیم.
        //ثانیا باید ویوکامپوننت حاوی دراور را در همین کامپوننت بگیریم و به والد بفرستیم
        if (this.drawer != undefined)
            this.drawer.toggleDrawerState();
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
                // setTimeout(() => {
                //     this.drawer = this.drawerComponent.sideDrawer;//در والد این فیلد وجود دارد
                //     let sv = <ScrollView>this.sv.nativeElement;
                //     sv.android.setHorizontalScrollBarEnabled(false);
                // }, 10)
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
                // Set args.cancel = true to cancel back navigation and do something custom.
            });
        }
    }
}
