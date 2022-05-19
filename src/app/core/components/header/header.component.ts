import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuItems: MenuItem[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.initMenuItems();
  }

  initMenuItems() {
    this.menuItems = [{
      label: 'Αρχική',
      icon: 'pi pi-home',
      routerLink: ['/'],
      routerLinkActiveOptions: { exact: true },
      // visible:  this.auth.isLoggedIn()
      visible:  true
    },
      {
        label: 'Φοιτητής',
        icon: 'pi pi-file-o',
        routerLinkActiveOptions: { exact: false },
        // visible: (this.auth.isLoggedIn() && !this.auth.isReader() && !this.auth.isExternalReader()),
        visible: true,
        items: [
          { label: 'Εγγραφή νέου φοιτητή', icon: 'pi pi-plus-circle', routerLink: '/student/create' },
        ]
      },
      // { label: 'Αναζήτηση', icon: 'pi pi-search', routerLink: '/decisions/search',visible: this.auth.isLoggedIn() },
      // { label: 'Διαχείριση Χρηστών', icon: 'pi pi-users', routerLink: '/users-management',visible: (this.auth.isLoggedIn() && this.auth.isAdmin()) },
    ];
  }

}
