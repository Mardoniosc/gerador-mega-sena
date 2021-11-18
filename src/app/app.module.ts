import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BolaComponent } from './components/bola/bola.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

@NgModule({
  declarations: [AppComponent, BolaComponent, DetalhesComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
