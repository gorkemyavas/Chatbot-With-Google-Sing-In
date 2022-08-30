import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { io, Socket }                                      from 'socket.io-client';
import { DomSanitizer }                                    from '@angular/platform-browser';
import { DefaultEventsMap }                                from 'socket.io/dist/typed-events';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.scss']
           })
export class AppComponent {
  title = 'gzf-angular-client';

}
