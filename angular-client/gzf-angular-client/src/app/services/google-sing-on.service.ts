import { Injectable, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ScriptService }                             from './script.service';
import { JwtService }             from './jwt.service';

declare var google: any;
export const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client';
export const GOOGLE_PROVIDER = 'GOOGLE';
export const GOOGLE_CLIENT_ID = '';

@Injectable({
              providedIn: 'root'
            })
export class GoogleSingOnService {

  buttonSettings = {
    type: 'standard',// 'icon' | 'standard'
    size: 'medium',// 'small' | 'medium' | 'large'
    text: 'signin_with', // 'signin_with' | 'signup_with'
    shape: 'rectangular', // 'square' | 'circle' | 'pill' | 'rectangular'
    theme: 'outline', // 'outline' | 'filled_blue' | 'filled_black'
    logo_alignment: 'left', //'left' | 'center'
    width: '',
    locale: 'en'
  };
  user: User | null = null;

  constructor(private scriptService: ScriptService,
              private jwtService: JwtService) {
    let user = JSON.parse(localStorage.getItem('user') || 'null');
    this.user = user;
  }

  loadGoogleScript(elementRef: ElementRef,runAfterSignIn: () => void): void {
    this.scriptService.loadScript(
      GOOGLE_PROVIDER,
      GOOGLE_SCRIPT_URL,
      () => {
        this.initGoogleSign(runAfterSignIn);
        this.renderGoogleButton(elementRef);

      }
    );
  }

  initGoogleSign(runAfterSignIn: () => void): void {
    let user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      google.accounts.id.initialize({
                                      client_id: GOOGLE_CLIENT_ID,
                                      auto_select: false,
                                      callback: (data: any) => this.afterSignIn(data,runAfterSignIn),
                                      prompt_parent_id: null,
                                      itp_support: false
                                    });
    }
  }

  afterSignIn(data: any,runAfterSignIn: () => void): void {
    const socialUser = this.createSocialUser(data.credential);
    localStorage.setItem('user', JSON.stringify(socialUser));
    this.user = socialUser;
    runAfterSignIn();
  }

  renderGoogleButton(elementRef: ElementRef): void {
    google.accounts.id.renderButton(elementRef.nativeElement, {
      type: this.buttonSettings.type,
      size: this.buttonSettings.size,
      text: this.buttonSettings.text,
      width: this.buttonSettings.width,
      shape: this.buttonSettings.shape,
      theme: this.buttonSettings.theme,
      logo_alignment: this.buttonSettings.logo_alignment,
      locale: this.buttonSettings.locale
    });
  }

  createSocialUser(idToken: string): User {
    const user: User = new User();
    user.idToken = idToken;
    const payload: any = this.jwtService.decodeJwt(idToken);
    user.id = payload.sub;
    user.name = payload.name;
    user.email = payload.email;
    user.photoUrl = payload.picture;
    user.firstName = payload['given_name'];
    user.lastName = payload['family_name'];
    user.exp = payload['exp'];
    return user;
  }

  getUser(): User | null{
    return this.user
  }

  singOut(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

}

export class User {
  idToken: string;
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  exp: number;

  constructor() {
    this.idToken = '';
    this.id = '';
    this.name = '';
    this.email = '';
    this.photoUrl = '';
    this.firstName = '';
    this.lastName = '';
    this.exp = 0;
  }
}
