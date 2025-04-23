import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../../app.service';


@Component({
  selector: 'app-add-or-edit-project',
  templateUrl: './add-or-edit-project.component.html',
  styleUrls: ['./add-or-edit-project.component.scss']
})
export class AddOrEditProjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddOrEditProjectComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private appService: AppService) { }

  projectForm!: FormGroup;
  selectedValue!: number;
  isDisable = false;
  selectedProject: any;
  projects: any;

  ngOnInit(): void {
    this.getProjectData();
    this.projectForm = new FormGroup({
      "projectName": new FormControl("", Validators.required),
      "jiraProject": new FormControl("", Validators.required),
      "projectDescription": new FormControl("", Validators.required)      
    }); 
  }

  getProjectData() {
    this.appService.fetchJiraProject().subscribe((result: any)=> {
      this.projects = result;
    })
  }

  onProjectChange(event: any) {
    this.isDisable = false;
    this.selectedProject = event.value;
  }

  onSubmit() {
    this.dialogRef.close(this.projectForm.value);
  }

  onClose() {
    this.dialogRef.close();
  }

}
