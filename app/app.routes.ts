import { Comp3Component } from './pages/comp3/comp3.component';
import { Comp2Component } from './pages/comp2/comp2.component';
import { Comp1Component } from './pages/comp1/comp1.component';
import { SettingsPage } from "./pages/settings/settings.page";
import { TodoPage } from "./pages/todo/todo.page";
import { HomePage } from "./pages/home/home.page";
import { FilePage } from "./pages/file/file.page";
import { SettingsPage2 } from "./pages/settings2/settings2.page";


//https://www.thepolyglotdeveloper.com/2017/03/nested-routing-in-a-nativescript-angular-application/
export const APP_ROUTES = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    { path: "home", component: HomePage },
    { path: "file", component: FilePage },

    { path: "todo", component: TodoPage },
    { path: "settings", component: SettingsPage },

    { path: "settings2", component: SettingsPage2, children: [
            { path: "comp1", component: Comp1Component, outlet: 'tabOutlet' },
            { path: "comp2", component: Comp2Component, outlet: 'tabOutlet' },
            { path: "comp3", component: Comp3Component, outlet: 'tabOutlet' },
    ]},


];
