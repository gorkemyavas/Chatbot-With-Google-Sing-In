import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router }                                                                     from '@angular/router';
import { GoogleSingOnService }                                                        from '../services/google-sing-on.service';

declare var google: any;

@Component({
             selector: 'app-login',
             templateUrl: './login.component.html',
             styleUrls: ['./login.component.scss']
           })
export class LoginComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('googleButton') googleButton: ElementRef;

  constructor(public googleSingOnService: GoogleSingOnService,
              private cdr: ChangeDetectorRef,
              private router: Router) {
    googleSingOnService.cdr = cdr;
  }

  ngOnInit(): void {

  }

  logout() {
    this.googleSingOnService.singOut();
    this.googleSingOnService.loadGoogleScript(this.googleButton,() => {
    });
  }

  ngAfterViewInit(): void {
    if (!this.googleSingOnService.getUser()) {
      this.googleSingOnService.loadGoogleScript(this.googleButton, () => {
        this.navigate();
      });
    }
  }

  navigate(): void {
    this.router.navigateByUrl('/')
        .then(() => {
          this.cdr?.detectChanges();
        });
  }

}
