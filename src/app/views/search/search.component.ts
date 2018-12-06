import { Component, OnInit } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  // Will contain Collection and Collectionnable in two categories : user & my collection
  private collections = [
     {
       key: "Utilisateurs",
       collection: []
     }, 
     {
       key: "Ma collection",
       collection: []
     }
  ];
  private template: string;
  private keyword: string;

  constructor(
    private appData: AppDataService,
    private titleService: AppTitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Recherche");
    this.titleService.setNavPath([]);
  }
  
  onTemplateChange(template: string){
    this.template = template;
  }

  onTextChange(){
    if(this.keyword) {
      this.search(this.keyword);
    } else {
      this.collections[0].collection = [];
    }
  }

  search(keyword: string) {
    /*if (this.appData.getCurrentUser()) {
      this.appData.searchInCollection("Pandemic").subscribe((collection) => {
        this.collections[0].collection = collection;
      });
    }*/
    // Search users
    this.appData.searchUsers(keyword).subscribe((users) => {
      this.collections[0].collection = users;
    });
  }

}
