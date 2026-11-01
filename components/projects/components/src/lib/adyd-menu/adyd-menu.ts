import {Component, Inject, input, signal} from '@angular/core';
import {MenuItem} from "../model/menu-item";
import {Router, RouterLink} from "@angular/router";
import {AUTH_SERVICE, AuthService} from "../services/auth-service";

@Component({
    imports: [
        RouterLink
    ],
  selector: 'adyd-menu',
  styleUrl: './adyd-menu.css',
  templateUrl: './adyd-menu.html',
})
export class AdydMenu {
    constructor(private router: Router,
                @Inject(AUTH_SERVICE) private authService: AuthService) {}

    protected menuName = input.required<string>()
    protected menuElements = input.required<MenuItem[]>()
    protected readonly logout = signal<boolean>(false);


    protected handleLogout() {
        this.authService.logout()
    }
}
