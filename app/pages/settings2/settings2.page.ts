import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Page } from "../page";
import { Router } from "@angular/router";
import { SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData } from 'ui/segmented-bar';
import { GlobalService } from "../../services/global.service";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
import * as application from "application";

@Component({
    selector: 'settings-page2',
    templateUrl: 'pages/settings2/settings2.page.html'
})
export class SettingsPage2 extends Page {
    public color: string;
    IsPageRoutActive: boolean;

    constructor(private location: Location, private router: Router) {
        super(location);
        GlobalService.IsPageRoutActive = false;
        this.IsPageRoutActive = GlobalService.IsPageRoutActive;
        this.router.navigate(['/settings2', { outlets: { tabOutlet: ['comp1'] } }]);
        this.AndroidActivityEvent();
    }


    changeRoute(i) {

        this.router.navigate(['/settings2', { outlets: { tabOutlet: ['comp' + i] } }]);
    }

    public goBack() {
        this.location.back();
    }
    ngOnInit() {

    }


    private AndroidActivityEvent() {
        var self = this.router;
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
                console.log(self.url);
                if (self.url.toString().indexOf("comp1") < 0) {
                args.cancel = true;// to cancel back navigation and do something custom.
                    self.navigate(['/settings2', { outlets: { tabOutlet: ['comp1'] } }]);
                }
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);

            });
        }
    }

}
