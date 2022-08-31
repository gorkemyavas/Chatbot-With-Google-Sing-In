import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Socket, io }                                                                     from 'socket.io-client';
import { DefaultEventsMap }                                                       from 'socket.io/dist/typed-events';
import { GoogleSingOnService }                                                    from '../services/google-sing-on.service';
import { Router }                                                                 from '@angular/router';

@Component({
             selector: 'app-home',
             templateUrl: './home.component.html',
             styleUrls: ['./home.component.scss']
           })
export class HomeComponent implements OnInit, OnDestroy {
  messages: any[] = [];
  message: string = '';
  socket?: Socket<DefaultEventsMap, DefaultEventsMap>;
  socketIds: any[] = [];
  selectedSocket: string = '';
  // @ts-ignore
  @ViewChild('messageBox') messageBox: ElementRef;

  constructor(public googleSingOnService: GoogleSingOnService,
              private router: Router,
              private ngZone: NgZone) {
    if (!this.googleSingOnService.user) {
      this.router.navigateByUrl('/login')
          .then(() => {
          });
    } else {
      this.socket = io('ws://localhost:3000', { transports: ['websocket'] });
      this.socket.emit('name', this.googleSingOnService.user.name);
      this.socket.on('message', (data) => {
        this.ngZone.run(() => {
          this.messages.push(JSON.parse(data));
        })
      });

      this.socket.emit('serverList');
      this.socket.on('serverList', (data) => {
        this.ngZone.run(() => {
          this.socketIds = [];
          data = JSON.parse(data);
          console.log(data);
          Object.keys(data)
                .forEach(key => {
                  if (key === this.socket?.id) {
                    return;
                  }
                  let value = data[key];
                  this.socketIds.push(
                    {
                      id: key,
                      data: value
                    }
                  );
                });
          if (this.socketIds.length > 0) {
            this.selectedSocket = this.socketIds[0].id;
          }
        });
      });

    }

  }

  ngOnInit(): void {
  }

  sendMessage(): void {
    console.log(this.selectedSocket);
    let data = {
      to: this.selectedSocket,
      message: this.message
    };
    this.socket?.emit('send', JSON.stringify(data));
    this.messages.push(
      {
        message: this.message,
        from: {
          id: this.socket?.id,
          name: this.googleSingOnService.user?.name
        }
      }
    );
    this.message = '';
  }

  logout() {
    this.googleSingOnService.singOut();
    this.router.navigateByUrl('/login')
        .then(() => {
        });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
    this.socket = undefined;
  }
}
