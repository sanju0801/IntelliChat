import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProjectComponent } from './add-or-edit-project/add-or-edit-project.component';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ColDef, RowSelectedEvent } from 'ag-grid-community';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {
  selectedRow: any;
  projectData: any;
  searchProject: any;
  rowSelection: "multiple" | "multiple" = "multiple";
  colDefs: ColDef[] = [
    { field: "select", headerName: "Select", checkboxSelection: true, flex: 1 },
    { field: "title", headerName: "Project Name", filter: 'agTextColumnFilter', flex: 3 },
    { field: "jiraprojectName", headerName: "Jira Project", filter: 'agTextColumnFilter', flex: 3 },
    { field: "description", headerName: "Description", filter: 'agTextColumnFilter', flex: 3 },
    { field: "userstorycount", headerName: "Userstory Count", filter: 'agTextColumnFilter', flex: 3 }
  ];
  paginationPageSizeSelector = [5, 10, 20, 50, 100, 200];

  constructor(private appService: AppService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getProjectData();
  }

  getProjectData() {
    this.appService.getProjectData().subscribe((result: any) => {
      this.projectData = result["response"];
    })
  }

  onRowSelected(event: RowSelectedEvent) {
    const selectedNodes = event.api.getSelectedNodes();
    this.selectedRow = selectedNodes.map(node => node.data);
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddOrEditProjectComponent, {
      data: false
    })
    dialogRef.afterClosed().subscribe(res => {
      const obj = {
        "title": res.projectName,
        "description": res.projectDescription,
        "jiraProjectKey": res.jiraProject.key,
        "jiraProjectName": res.jiraProject.name
      }
      this.appService.createProject(obj).subscribe(result => {
        this.getProjectData();
      })
    })
  }

  onDelete() {
    if (this.selectedRow) {
      this.selectedRow.forEach((element: any) => {
        this.appService.deleteProject(element._id).subscribe(result => {
          this.getProjectData();
        });
      });
    } else {
      alert("Please select a project to delete")
    }
  }

  openUserStory() {
    if (this.selectedRow.length == 1) {
      const path = this.selectedRow[0]._id;
      this.router.navigate(['/userStory'], { queryParams: { path } });
    } else if (this.selectedRow.length > 1) {
      alert("Please select a single project to load")
    } else {
      alert("Please select a project to load")
    }
  }

  downloadPDF() {
    if (this.selectedRow && this.selectedRow.length > 0) {
      const doc = new jsPDF();
      const title = `Projects`;
      doc.setFontSize(10);
      let y = 25;

      // Create an array of promises for all the user story details requests
      const requests = this.selectedRow.map((element: any) => {
        return this.appService.loadProjectDetails(element._id).toPromise().then((result: any) => {
          const projectDetails = result["response"];
          console.log(projectDetails);
          projectDetails.forEach((ele: any) => {
            const formattedData = this.formatJsonData(ele);
            formattedData.forEach(line => {
              if (y > 280) {
                doc.addPage();
                y = 10;
              }
              doc.text(line, 15, y, { maxWidth: 180 });
              y += 8;
            });
          });
        });
      });

      // Wait for all requests to complete
      Promise.all(requests).then(() => {
        doc.save(`${title}.pdf`);
      }).catch(error => {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF.');
      });
    } else {
      alert('Please select a project to download as PDF');
    }
  }

  formatJsonData(data: any): string[] {
    const formatted: string[] = [];
    formatted.push(`Project Name: ${data.projectName}`);
    formatted.push(`Description: ${data.description}`);
    formatted.push(`User Story: ${data.userstory}`);

    formatted.push(`Test Cases:`);
    data.testcases.forEach((testcase: any, index: any) => {
      formatted.push(`    ${index + 1}. TC JIRA: ${testcase.tc_jira}`);
      const testcases = testcase.testcase.split("\n")
      testcases.forEach((tc: any) => {
        formatted.push(`    ${tc}`);
      });
    });

    formatted.push(`Test Scripts:`);
    data.testscripts.forEach((testscript: any, index: any) => {
      formatted.push(`    ${index + 1}. TS JIRA: ${testscript.ts_jira}`);
      formatted.push(`    Language: ${testscript.language}`);
      const testscripts = testscript.testscript.split("\n")
      testscripts.forEach((ts: any) => {
        formatted.push(`    ${ts}`);
      });
    });

    formatted.push(`\n\n\n\n---------------------------\n\n\n\n`);
    return formatted;
  }

  exportToExcel() {
    if (this.selectedRow && this.selectedRow.length > 0) {
      const obj = {
        "projects": this.selectedRow
      }
      this.appService.getProjectdata(obj).subscribe((result: any) => {
        const data = result['response']
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Projects');

        // Export to file
        XLSX.writeFile(wb, 'projects.xlsx');
      })
    } else {
      alert('No projects available to export');
    }
  }
}