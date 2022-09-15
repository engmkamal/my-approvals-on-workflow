import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'portal-approvalflow',
  templateUrl: './approvalflow.component.html',
  styleUrls: ['./approvalflow.component.scss'],
})
export class ApprovalflowComponent implements OnInit {

  sapOperationalSupportWFPath = 'assets/sapOperationalSupport_28052022.jpg';
  
  iFrameUrl: SafeResourceUrl;
  displayIFrame = false;

  //content!:SafeHtml;
  
  constructor(
    private sanitizer: DomSanitizer,
    private _httpClient: HttpClient
  ) {
    this.iFrameUrl = '';
    
    // const path = 'assets/sapOperationalSupport.html';

    // this._httpClient.get(path, {responseType: "text"}).subscribe(
    //   data => {
    //   this.content = this.sanitizer.bypassSecurityTrustHtml(data);
    //   });
  }

  ngOnInit(): void {    
    console.log("");
  }

  onOpenIFrame(): void{
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('./getstarted');
    this.displayIFrame = true;
  }
}
