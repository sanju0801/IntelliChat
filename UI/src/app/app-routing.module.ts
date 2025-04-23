import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './main/file-upload/file-upload.component';
import { PromptsComponent } from './main/prompts/prompts.component';
import { LoginComponent } from '././shared/login/login.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'askMe', component: PromptsComponent, canActivate: [AuthGuard] },
  { path: 'fileUpload', component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
