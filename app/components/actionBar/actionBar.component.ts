import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { RouterExtensions } from "nativescript-angular/router";

import { DialogContent } from '../../pages/CustomDialogTest/DialogContent.component';

import dialogs = require("ui/dialogs");
@Component({
	selector: 'myActionBar',
	moduleId: module.id,
	templateUrl: './actionBar.component.html',
	styleUrls: ['./actionBar.component.css']

})

export class ActionBarComponent {
	@Input()
	hasDrawer = true;
	@Input()
	IsMainPage = true;
	@Output()
	toggleTap = new EventEmitter();
	@Output()
	menue3Tap = new EventEmitter();

	constructor(private modalService: ModalDialogService, private routerExtensions: RouterExtensions,
		private viewContainerRef: ViewContainerRef) { }
	toggle() {
		this.toggleTap.emit();
	}
	ngOnInit() { }
	public goBack() {
		// در صفحه اصلی کاربرد ندارد ولی در پیج های بعدی به درد میخورد
		this.routerExtensions.backToPreviousPage();
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
	menu3() {
		this.menue3Tap.emit();
	}
}