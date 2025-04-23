import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './shared/login/login.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileUploadComponent } from './main/file-upload/file-upload.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { PromptsComponent } from './main/prompts/prompts.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AddOrEditProjectComponent } from './main/projects/add-or-edit-project/add-or-edit-project.component';
import { AgGridModule } from 'ag-grid-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavMenuComponent,
    HeaderComponent,
    FooterComponent,
    FileUploadComponent,
    ProjectsComponent,
    PromptsComponent,
    LoaderComponent,
    AddOrEditProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    DateTimePickerModule,
    MatIconModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSortModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    AgGridModule,
    MatDatepickerModule,
    NgApexchartsModule,
    CanvasJSAngularChartsModule,
    MatSlideToggleModule
  ],
  providers: [
    AuthGuard,
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
