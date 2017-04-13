import { Component } from "@angular/core";

@Component({
    selector: 'app',
    template: '<page-router-outlet></page-router-outlet>',
  //چون روت به شکل پیج است نمیتوان یک تمپلیت لی اوت اینجا تعریف کرد
  //چون روت به صورت پیجی باعث حفظ اکتیویتی در استک میشود و دکمه بک معنی دارد
  //اگر این را داخل یک استک لی اوت بگذاریم مشکل حل میشود
  //اگر در روت کلمه پیچ را نگذاریم میتوانیم در همینجا لی اوت هم اضافه کنیم اما
  //مشکل این است که دیگر در استک چیزی باقی نمیماند و هر چای برنامه
  //دکمه بک را بزنیم از برنامه خارج میوشویم
})
export class AppComponent {

   
}
