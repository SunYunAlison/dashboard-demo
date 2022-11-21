import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Router } from "@angular/router"
import { NgxCaptureService } from "ngx-capture";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  img = '';
  imgBase64: any = '';

  @ViewChild("screen", { static: true }) screen: any;

  dropDownList = [
    { machineName: 'All', machineId: 'All' },
    { machineName: 'machine-1', machineId: '001' },
    { machineName: 'machine-2', machineId: '002' },
    { machineName: 'machine-3', machineId: '003' },
  ]

  selectedMachine: any;
  isFullScreen!: boolean;


  constructor(private router: Router, private ngxCaptureService: NgxCaptureService, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.isFullScreen = !!document.fullscreenElement;
    this.selectedMachine = this.dropDownList[0];
    this.router.navigate(['/dashboard'])
  }

  onScreenChange() {
    this.isFullScreen = !!document.fullscreenElement;
    console.log(this.isFullScreen);
    if (this.isFullScreen) {
      document.exitFullscreen();
      this.isFullScreen = false;
    }
    else {
      document.documentElement.requestFullscreen();
      this.isFullScreen = true
    }
  }

  onScreenCapture() {
    let screen = document.getElementById('screen');
    if (screen) {
      this.ngxCaptureService.getImage(screen, true).pipe(tap(img => {
        this.img = img;
        this.imgBase64 = img;
        const blob = this.DataURIToBlob(this.imgBase64);
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'img');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      ).subscribe();
    }

  }

  DataURIToBlob(dataURI: string) {
    console.log(dataURI);
    const splitDataURI = dataURI.split(",");
    console.log(splitDataURI)
    const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

}
