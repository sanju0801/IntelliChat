import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ColDef, RowSelectedEvent } from 'ag-grid-community';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
  pageSizeOptions: any = [10, 20, 30, 50];
  progress: any;
  message = '';
  isLoading!: boolean;
  tableViewData: any;
  fileToUpload!: File;
  isShowSideNav = true;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['documentName', 'date', 'status', 'actions'];
  searchQuery: any;
  projects: any;
  isDisable = true;
  selectedProject: any;
  selectedRow: any;
  selectedProjectName: any;
  colDefs: ColDef[] = [
    { field: "select", headerName: "Select", checkboxSelection: true, flex: 1 },
    { field: "document", headerName: "Document Name", flex: 4 },
    { field: "projectName", headerName: "Project Name", filter: 'agTextColumnFilter', flex: 2 },
    { field: "date", headerName: "Date", filter: 'agTextColumnFilter', flex: 2 },
    { field: "status", headerName: "Status", filter: 'agTextColumnFilter', flex: 1 },
  ];
  paginationPageSizeSelector = [5, 10, 20, 50, 100, 200];
  
  constructor(private appService: AppService) { }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  ngOnInit() {
    this.appService.sideNavData.subscribe(res => {
      if (res === "") {
        this.isShowSideNav = true;
      }
      if (res === true) {
        this.isShowSideNav = true;
      } else if (res === false) {
        this.isShowSideNav = false;
      }
    });
    this.getTabelData();
    this.getProjectData();
    console.log(this.selectedProject);
  }

  getTabelData() {
    this.appService.getFileList().subscribe(result => {
      this.tableViewData = result;
    })
  }

  onRowSelected(event: RowSelectedEvent) {
    this.selectedRow = event.node.data;
  }

  getProjectData() {
    this.appService.getProjectData().subscribe((result: any)=> {
      this.projects = result["response"];
    })
  }

  onProjectChange(event: any) {
    this.isDisable = false;    
    this.selectedProjectName = event.value;
  }

  onFileSelected(event: any) {
    this.isLoading = true;
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);
    const projectName = this.selectedProjectName;
    this.appService.uploadFile(formData, projectName).subscribe(() => {
      this.isLoading = false;
      this.getTabelData();
      this.isDisable = true;
    })
  }

  chunked() {    
    if(this.selectedRow) {
      this.isLoading = true;
      this.appService.runIngest(this.selectedRow.projectName, this.selectedRow.document).subscribe(() => {
        this.getTabelData();
        this.isLoading = false;
      });
    } else {
      alert("Please select document to ingest")
    }
  }

  download() {
    if(this.selectedRow) {
      this.appService.downloadFile(this.selectedRow.projectName, this.selectedRow.document).subscribe({
        next: (blob) => {
          if (blob.size > 0) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = this.selectedRow.document;
            link.click();
          } else {
            console.error('Received empty file');
          }
        },
        error: (error) => {
          console.error('Error downloading file:', error);
        }
      });
    } else {
      alert("Please select a document to download")
    }    
  }
}
