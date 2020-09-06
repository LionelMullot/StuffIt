import { Component, OnInit } from '@angular/core';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import { AppDataService } from 'src/app/services/app-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public user = {
    mail: "",
    password: ""
  }
  public error: string;

  constructor(
    private titleService: AppTitleService,
    private appData: AppDataService,
    protected router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Connexion");
    this.titleService.setNavPath([]);
  }

  onSubmit() {
    if(!this.user.mail) {
      this.error = "Un mail est requis.";
      return;
    }

    if(!this.user.password) {
      this.error = "Un mot de passe est requis.";
      return;
    }

    this.appData.signInWithEmailAndPassword(this.user.mail, this.user.password).then(() => {
      // redirect to collection page
      this.router.navigate(['/collection']);
    }).catch((error)=> {
      var errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        this.error = "Mot de passe incorrect.";
      } else if (errorCode === 'user-not-found') {
        this.error = "Mail incorrect.";
      } else {
        this.error = "Combinaison mail / mot de passe incorrect";
      }
    });

  }

}
