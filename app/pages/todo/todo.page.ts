import {Component, ChangeDetectorRef} from "@angular/core";
import {DrawerPage} from "../drawer.page";

@Component({
    selector: 'todo-page',
    templateUrl: 'pages/todo/todo.page.html',
})
export class TodoPage extends DrawerPage {
arr=[];
    constructor(private changeDetectorRef:ChangeDetectorRef) {
        super(changeDetectorRef);
        for(var i=0;i<100;i++){
            this.arr.push(i);
        }
    }
}
