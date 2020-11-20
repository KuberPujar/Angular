import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterCeptorService } from '../app/auth-interceptor.service';
import { LoggingInterceptorService } from '../app/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterCeptorService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoggingInterceptorService,
      multi:true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
