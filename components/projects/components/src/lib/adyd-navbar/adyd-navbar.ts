import {Component, Inject, signal} from '@angular/core';
import {AdydMenu} from "../adyd-menu/adyd-menu";
import {MenuItem} from "../model/menu-item";
import {AUTH_SERVICE, AuthService} from "../services/auth-service";

@Component({
    imports: [
        AdydMenu
    ],
  selector: 'adyd-navbar',
  styleUrl: './adyd-navbar.css',
  templateUrl: './adyd-navbar.html',
})
export class AdydNavbar {
    protected  menuElements = signal<MenuItem[]>([]);
    protected  menuName = signal<string>("User");


    constructor(
        @Inject(AUTH_SERVICE) private authService: AuthService
    ) {
       this.menuName.set(this.authService.getUser())
    }


}
