import { Component, ChangeDetectorRef, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { DrawerPage } from "../drawer.page";
import application = require("application");
import * as Toast from 'nativescript-toasts';
import { RouterExtensions } from "nativescript-angular/router";

import { ScrollView } from "ui/scroll-view";
import { RadSideDrawerComponent, SideDrawerType } from 'nativescript-telerik-ui/sidedrawer/angular';
import { TabView, SelectedIndexChangedEventData } from "ui/tab-view";
let sampleText = "NativeScript is a free and open source framework for building native iOS and Android apps using JavaScript and CSS. NativeScript renders UIs with the native platform’s rendering engine—no WebViews—resulting in native-like performance and UX.NativeScript provides a best-of-both-worlds development experience. Our cross-platform JavaScript modules give you the convenience of writing iOS and Android apps from a single JavaScript codebase, while our runtimes give you the power of accessing native APIs, SDKs, and frameworks when you need them—all without needing to open Xcode or Android Studio. NativeScript was created and is supported by Telerik.\n\n\n NativeScript doesn’t require Angular, but it’s even better when you use it. You can fully reuse skills and code from the web to build beautiful, high performance native mobile apps without web views. NativeScript features deep integration with Angular 2, the latest and greatest (and fastest) Angular framework. Open source and backed by Telerik.";


@Component({
    selector: 'file-page',
    templateUrl: 'pages/file/file.page.html'
})
export class FilePage  {


    constructor(private changeDetectorRef: ChangeDetectorRef,  private routerExtensions: RouterExtensions) {
      

    }

 public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
   @ViewChild("tabview") tab: ElementRef;

    public tabindex: number;
    public content: string;
    public tabView: TabView;

    ngOnInit() {
        this.tabindex = 3;
        this.content = sampleText;
        this.tabView = this.tab.nativeElement;

        this.tabView.on("selectedIndexChanged", (args: SelectedIndexChangedEventData) => {
            console.log("old index: " + args.oldIndex);
            console.log("new index: " + args.newIndex);
        });
    }
    onLoaded(tv:TabView){
  if (tv == undefined) {
            console.log("UUUUU");
        } else {
            tv.android.setHorizontalScrollBarEnabled(false);
        }
    }
}
