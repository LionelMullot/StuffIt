import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  private VALIDATION_SUCCESS = 'Saisie correcte';
  private VALIDATION_FAIL = 'Saisie incorrecte';
  public validation = {
    title: null,
    message: null,
    success: null
  };

  public newUser: User = new User(null, {});

  constructor(
    public appData: AppDataService,
    private titleService: AppTitleService) {
    }

  ngOnInit() {
    this.titleService.setTitle('Administration');
    this.titleService.setNavPath([]);
  }

  onSubmit() {
    if (!this.newUser.firstname && !this.newUser.lastname) {
      this.toggleValidation(false, 'Le prénom et le nom sont obligatoire.');
      return;
    }

    if (!this.newUser.firstname) {
      this.toggleValidation(false, 'Le prénom est obligatoire');
      return;
    }

    if (!this.newUser.lastname) {
      this.toggleValidation(false, 'Le nom est obligatoire.');
      return;
    }

    this.appData.addUser(this.newUser.firstname, this.newUser.lastname).then(() => {
      this.toggleValidation(true, `${this.newUser.getName()} a bien été ajouté.e à la liste des utilisateurs.`);
      this.resetForm();
    });
  }

  /**
   * Clear the form
   */
  private resetForm() {
    // Reset user
    this.newUser = new User(null, {});
  }

  /**
   * Toggle validation message
   * @param isValid true if form is valid
   * @param message Information message to display
   */
  toggleValidation(isValid: Boolean, message: string) {
    this.validation.success = isValid;
    this.validation.title = isValid ? this.VALIDATION_SUCCESS : this.VALIDATION_FAIL;
    this.validation.message = message;
  }

}
