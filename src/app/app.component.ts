import { Component, ViewContainerRef } from '@angular/core';
import { LoginDialogService } from './services/login-dialog.service';
import { AuthService } from './services/auth.service';
import { routes } from './app.module';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
    title = 'Turku Nepal Associations Ry';
    navigationTabs: any = routes;

    // We can insect the service in the constructor of component and access through out the component
    constructor(public authService: AuthService,
                private loginDialogService: LoginDialogService,
                private viewContainerRef: ViewContainerRef) {
    }

    login() {
        this.loginDialogService.open(this.viewContainerRef).subscribe();
    }

    logout() {
        this.authService.logout();
    }
}
