import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { MainModule } from './main/main.module';
import { UsuarioModule } from './usuario/usuario.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guard/auth.guard';
import { TokenInjectionService } from './services/tokenInjection/token-injection.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    UsuarioModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInjectionService,
      multi: true, // Isso permite que vários interceptadores sejam executados em ordem
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
