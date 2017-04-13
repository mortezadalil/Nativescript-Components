import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Page} from "../page";
import { SegmentedBar, SegmentedBarItem, SelectedIndexChangedEventData } from 'ui/segmented-bar';
import { GlobalService } from "../../services/global.service";
@Component({
    selector: 'settings-page',
    templateUrl: 'pages/settings/settings.page.html'
})
export class SettingsPage extends Page {
  public color: string;
  	IsPageRoutActive: boolean;

    constructor(private location: Location) {
        super(location);
        		GlobalService.IsPageRoutActive = false;
		this.IsPageRoutActive = GlobalService.IsPageRoutActive;
    }
       onBlue() {
        this.color = "blue";
    }

    onPurple() {
        this.color = "purple";
    }

    onYellow() {
        this.color = "yellow";
    }
}
