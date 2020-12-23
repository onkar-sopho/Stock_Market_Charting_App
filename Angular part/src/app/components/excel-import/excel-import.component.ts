import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import { ExcelSummary } from './excel-summary';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.css']
})
export class ExcelImportComponent implements OnInit {

  currentFileUpload: File;
  selectedFiles: FileList;
  progress: {percentage: number} = {percentage: 0};
  selectedFile = null;
  changeImage = false;

  dataUploaded: boolean;
  excelSummary: ExcelSummary;

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
    this.excelSummary = new ExcelSummary();
    this.dataUploaded = false;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    
    // Upload the excel data
    this.excelService.uploadFile(this.currentFileUpload).subscribe(event => {
      console.log(event);
      this.selectedFiles = undefined;
    }); 
  
  }

  viewSummary() {
    // Get the summary of records from backend
    this.excelService.getSummary().subscribe(data => {
      this.excelSummary = data;
      console.log(this.excelSummary);
      this.dataUploaded = true;
    })  

  }

  change($event) {
    this.changeImage = true;
  }

  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}
