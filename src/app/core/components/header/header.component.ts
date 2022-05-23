import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: MenuItem[] = [];

  constructor(private messageService: MessageService,
              public router: Router,
              public auth: AuthService) {
    this.auth.authStatusChanged.subscribe(result => this.initMenuItems());
  }

  ngOnInit(): void {
    this.initMenuItems();
  }

  initMenuItems() {
    this.menuItems = [{
      label: 'Αρχική',
      icon: 'pi pi-home',
      routerLink: ['/'],
      routerLinkActiveOptions: {exact: true},
      visible: this.auth.isLoggedIn()
      // visible:  true
    },
      {
        label: 'Φοιτητής',
        icon: 'pi pi-file-o',
        routerLinkActiveOptions: {exact: false},
        // visible: (this.auth.isLoggedIn() && !this.auth.isReader() && !this.auth.isExternalReader()),
        visible: true,
        items: [
          {label: 'Εγγραφή νέου φοιτητή', icon: 'pi pi-plus-circle', routerLink: 'actions/create'},
        ]
      },
      // { label: 'Αναζήτηση', icon: 'pi pi-search', routerLink: '/decisions/search',visible: this.auth.isLoggedIn() },
      // { label: 'Διαχείριση Χρηστών', icon: 'pi pi-users', routerLink: '/users-management',visible: (this.auth.isLoggedIn() && this.auth.isAdmin()) },
    ];
  }

  logout(): void {
    this.auth.logout();
    this.messageService.add({severity: 'success', detail: 'Αποσυνδεθήκατε'});
    this.router.navigateByUrl('/login');
  }

  login(): void {
    this.router.navigateByUrl('/login');
  }
}
