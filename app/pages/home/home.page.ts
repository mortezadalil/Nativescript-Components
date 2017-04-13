import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef } from "@angular/core";
import { DrawerPage } from "../drawer.page";
import application = require("application");
import * as Toast from 'nativescript-toasts';

import { ScrollView } from "ui/scroll-view";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import * as LocalNotifications from "nativescript-local-notifications";
LocalNotifications.hasPermission();
import Tasks = require("nativescript-tasks");
import { TouchGestureEventData } from "ui/gestures";
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


    cc = 1;//در رابط کاربری نمایش داده میشود
    dd = 1;//در رابط کاربری نمایش داده میشود
    ee = 1;//نمایش داده نمیشود
    ff = 1;//نمایش داده نمیشود
    gg = 1;//نمایش داده نمیشود
    hh = 1;//نمایش داده نمیشود

    ngAfterViewInit(): void {
        //در کلاس والد ویوی دراور را به آبجکت تبدیل میکنیم
        this.getDrawerView();


        //https://github.com/eddyverbruggen/nativescript-local-notifications
        LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            badge: 1,
            groupedMessages: ["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            groupSummary: "Summary of the grouped messages above", //android only
            ongoing: true, // makes the notification ongoing (Android only)
            smallIcon: 'res://heart.png',
            interval: 'minute',
            sound: null, // suppress the default sound
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
        }]).then(
            function () {
                console.log("Notification scheduled");
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
            )


    }

    //نکته مهم
    //اسلایدر را به دو صورت میتوان در متدها گرفت 
    //به کمک ویوچایلد که در متدهای چرخه حیات هم میشد استفاده کرد
    //و راه دوم به کمک ارسال آبجکت المان از ویو به متد مثل مثال زیر
    //راه اول کامنت شده است
    // @ViewChild('slider')
    // sv: ElementRef;
    // let sv = <ScrollView>this.sv.nativeElement;
    //sv.android.setHorizontalScrollBarEnabled(false);
    removeScrollbar(sv: ScrollView,args : TouchGestureEventData) {
     //از قصد الکی دو نوع ورودی گرفتم
     //اولی خود آبجکت را میدهد
     //دومی اطلاعاتی در مورد رویدادی که اتفاق افتاده
     //در دومی ما خود آبجکت هم داریم که به روش زیر آن را بیرون میکشیم
    //var sv1=<ScrollView>args.object;
        if (sv == undefined) {
            console.log("UUUUU");
        } else {
          
            console.log("ScrollBare Created")
            //میتوان از متدها یا پراپرتی های نیتیو خود اندروید یا آی او اس هم استفاده کرد
            //اطلاعات مربوط به این متدها در آدرس زیر است
            //https://docs.nativescript.org/api-reference/classes/_ui_scroll_view_.scrollview.html
            //پراپرتی Android را نگاه کن
            sv.android.setHorizontalScrollBarEnabled(false);
           // sv1.android.setHorizontalScrollBarEnabled(false);
        }

    }
    worker: any;
    arr=[];
    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super(changeDetectorRef);
           for(var i=0;i<100;i++){
            this.arr.push(i);
        }
        this.AndroidActivityEvent();
        this.source = [];
        this.counter = 0;
        for (var i = 0; i < 50; i++) {
            this.source.push({ title: "t" + i, email: "erer" + i + "@gmail.com" });
            this.counter = i;
        }

        this.worker = new Worker('~/workers/worker');

    }

    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }


    isItemVisible: boolean = false;
    loadMoreItems(event) {
        this.isItemVisible = true;
        console.log("loading...." + this.isItemVisible);
        var source = this.source;
        var counter = this.counter;
        var self = this;
        setTimeout(function () {
            //   self.push({ title: "NEW: t" + this.counter, email: "erer" + this.counter + "@gmail.com" })
            for (var i = 0; i < 50; i++) {
                source.push({ title: "NEW: t" + counter, email: "erer" + counter + "@gmail.com" })
                counter = i;
            }
            self.isItemVisible = false;
            console.log("finish loading...." + self.isItemVisible);
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
        var self = this;

        //به جای ست اینتروال از ورکر استفاده کن
        //اول اینو بخون
        //https://uithought.wordpress.com/2013/10/29/html5-web-worker-vs-setinterval/
        //بعد اینو بخون
        //https://www.html5rocks.com/en/tutorials/workers/basics/
        //نوشته که ورکر خوبیش اینه که با ترد رابط کاربری کار نداره و اگر کار سنگین باشه
        //ما خطا یا کندی توی رابط کاربری نمیبینیم
        //روش زیر مولتی ترد هست که مشکل بالا رو حل میکنه
        //https://docs.nativescript.org/angular/core-concepts/multithreading-model.html
        //این سوال را ببین مترونوم ساخته که با وب ورکر کار میکنه
        //https://discourse.nativescript.org/t/use-backend-service-web-worker-for-metronome/375
        //تابع مترونوم موجود در همین صفحه شبیه همان چیزی است که در توضیح بالا گفته
        //اگر بخواهیم سرویسی برای پشت صحنه بنویسیم باید به شکل جاوایی بنویسیم
        //در مورد سرویس اینتنت ایجا را بخوان
        //https://www.nativescript.org/blog/using-android-background-services-in-nativescript?linkId=27714623
        // setInterval(function () {
        //     self.cc++;
        // }, 1 )
        // setInterval(function () {
        //     self.dd++;
        // }, 50 )
        //مثال : 
        //https://github.com/kazemihabib/ns-angular-worker-demo
        //===============================ایجاد بک گراند ورکر
        // this.worker = new Worker('آدرس فایلی که قرار است در ترد دیگر اجرا شود');
        // this.worker.onmessage = (msg) => {
        //      console.log('data ', msg.data);
        // }
        //     //========================================
        //     this.worker.postMessage('hi');
        //در مودر سیگنال آر SingalR
        //https://github.com/NathanaelA/nativescript-signalr

        this.startMetronome()
        // setInterval(function () {
        //     self.ee++;
        // }, 1)
        // setInterval(function () {
        //     self.ff++;
        // }, 5)

        // setInterval(function () {
        //     self.gg++;
        // }, 1)
        // setInterval(function () {
        //     self.hh++;
        // }, 5)



        // let toastOptions1: Toast.ToastOptions =
        //     {
        //         text: "کار نمی کند چون اولا باید از کلاس دراور ارث بری کنیم.",
        //         duration: Toast.DURATION.LONG
        //     };
        // Toast.show(toastOptions1);
        // let toastOptions2: Toast.ToastOptions =
        //     {
        //         text: "ثانیا باید ویوکامپوننت حاوی دراور را در همین کامپوننت بگیریم و به والد بفرستیم",
        //         duration: Toast.DURATION.LONG
        //     };
        // Toast.show(toastOptions2);
        // //کار نمی کند چون اولا باید از کلاس دراور ارث بری کنیم.
        // //ثانیا باید ویوکامپوننت حاوی دراور را در همین کامپوننت بگیریم و به والد بفرستیم
        // if (this.drawer != undefined)
        //     this.drawer.toggleDrawerState();
    }


    startMetronome() {
        var work = this.worker;
        work.postMessage({ param1: "hello", param2: 500 });
        work.onmessage = function (i) {

            if (i.data == 20) {
                console.log("Thread Terminated");
                work.terminate();
                work = undefined;
            } else {
                console.log("Problem : " + i.data);
            }

        }

        work.onerror = function (err) {
            console.log(`An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`);
            console.log(err.message);
        }

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
       //     this.router.navigate(['/settings2', { outlets: { tabOutlet: ['comp1'] } }]);
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
                // Set args.cancel = true to cancel back navigation and do something custom.
            });
        }
    }
}
