import {Component, Inject, input, signal} from '@angular/core';
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
    public  menuElements = input<MenuItem[]>([]);
    public  menuName = signal<string>("User");
    public  logout = input<boolean>(false);


    constructor(
        @Inject(AUTH_SERVICE) private authService: AuthService
    ) {
       this.menuName.set(this.authService.getUser())
    }


}
