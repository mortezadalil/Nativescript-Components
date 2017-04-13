import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/platform";
import {AppComponent} from "./app.component";
import {SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer/angular";
import {NativeScriptRouterModule, NativeScriptFormsModule} from "nativescript-angular";
import {TNSFontIconModule} from "nativescript-ng2-fonticon";
import {APP_ROUTES} from "./app.routes";
import {DrawerComponent} from "./components/drawer/drawer.component";
import {HomePage} from "./pages/home/home.page";
import {SettingsPage} from "./pages/settings/settings.page";
import {TodoPage} from "./pages/todo/todo.page";
import {TodoListComponent} from "./components/todolist/todo.list.component";
import {ActionBarComponent} from './components/actionBar/actionBar.component'
import {CheckboxComponent} from "./components/checkbox/checkbox.component";
import {StatusPipe} from './pipes/status.pipe';
import {TodosService} from './services/todos.service';
import { DialogContent } from './pages/CustomDialogTest/DialogContent.component'
import { FilePage } from './pages/file/file.page';
import { Comp1Component } from './pages/comp1/comp1.component';
import { Comp2Component } from './pages/comp2/comp2.component';
import { Comp3Component } from './pages/comp3/comp3.component';
import { SettingsPage2 } from "./pages/settings2/settings2.page";



@NgModule({
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        AppComponent,
        HomePage,
        SettingsPage,
        SettingsPage2,       
        TodoPage,
        DrawerComponent,
        ActionBarComponent,
        TodoListComponent,
        CheckboxComponent,
        StatusPipe,
        DialogContent,
        FilePage,
        Comp1Component,
        Comp2Component,
        Comp3Component,
    ],
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(APP_ROUTES),
        TNSFontIconModule.forRoot({
            'fa': 'fonts/font-awesome.css'
        })
    ],
    providers: [
        TodosService,
     
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
      entryComponents: [DialogContent],
})
export class AppModule {
}
