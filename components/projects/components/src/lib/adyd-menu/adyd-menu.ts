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
    public menuName = input.required<string>();
    public menuElements = input.required<MenuItem[]>();
    public logout = input.required<boolean>();

    // Control local del estado abierto/cerrado con Signals
    protected isOpen = signal<boolean>(false);

    constructor(
        private router: Router,
        @Inject(AUTH_SERVICE) private authService: AuthService
    ) {}

    protected toggleMenu() {
        this.isOpen.update(value => !value);
    }

    protected close() {
        this.isOpen.set(false);
    }

    protected handleLogout() {
        this.close();
        this.authService.logout();
    }
}
