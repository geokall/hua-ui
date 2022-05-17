// import { SharedModule } from './../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MainContainerComponent } from './components/main-container/main-container.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {HeaderComponent} from "./components/header/header.component";

@NgModule({
  declarations: [
    HeaderComponent,
    // MainContainerComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MenubarModule,
    ButtonModule,
    ToastModule,
    // SharedModule
  ],
  exports: [
    HeaderComponent,
    // MainContainerComponent
  ]
})
export class CoreModule { }
