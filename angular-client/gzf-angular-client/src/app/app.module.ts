import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }                                                                       from './app-routing.module';
import { AppComponent }                                                                           from './app.component';
import { FormsModule }                                                                            from '@angular/forms';
import { LoginComponent }                                                                         from './login/login.component';
import { HomeComponent }                                                                          from './home/home.component';
import { BrowserAnimationsModule }                                                                from '@angular/platform-browser/animations';
import { MatButtonModule }                                                                        from '@angular/material/button';
import { MatIconModule }                                                                          from '@angular/material/icon';
import { ScrollBottomDirective } from './directives/scroll-bottom.directive';

@NgModule({
            declarations: [
              AppComponent,
              LoginComponent,
              HomeComponent,
              ScrollBottomDirective,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              FormsModule,
              BrowserAnimationsModule,
              MatButtonModule,
              MatIconModule
            ],
            providers: [

            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
