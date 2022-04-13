import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../login/login/login.component';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {ShareService} from '../../service/security/share.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  idMember: number;
  currentUser: string;
  role: string;
  isLoggedIn = false;

  constructor(private dialog: MatDialog,
              private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });

  }

  ngOnInit(): void {
    this.loadHeader();
  }


  loadHeader(): void {
    if (this.tokenStorageService.getUser()) {
      // console.log("tại loadHeader: " + this.tokenStorageService.getToken());
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }else {
      this.username = null;
    }
    this.isLoggedIn = this.username != null;
    // console.log(this.tokenStorageService.getUser().token);
    this.getUsernameAccount();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.loadHeader();

    this.router.navigateByUrl("")
  }

  getUsernameAccount(){
    if (this.tokenStorageService.getUser()) {
      this.idMember = this.tokenStorageService.getUser().member.id;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'max-content',
      height: 'max-content'
    });
  }

}
