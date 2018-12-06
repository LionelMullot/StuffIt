import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import { ActivatedRoute } from '@angular/router';
import { Path } from 'src/app/models/path';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // Will contain Collection and Collectionnable
  private collection: any[];
  private template: string;
  private path = [];
  private userId: string;

  constructor( 
    public appData: AppDataService,   
    private titleService: AppTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.appData.userEmitter.subscribe(() => {
      this.loadCollection();
    })
    this.route.queryParams.subscribe(params => {
      if (params.path) {
        this.path = params.path.split("_");
      } else {
        this.path = [];
      }
      if (params.user) {
        this.userId = params.user;
        this.appData.getUser(this.userId).subscribe((user) => {
          this.titleService.setTitle("Collection de " + user.firstname);
          this.buildNavPath(this.path, user);
        })
      } else {
        this.userId = null;
      }  
      this.buildNavPath(this.path, null);
      this.loadCollection();
    });
    this.titleService.setTitle("Ma collection");
  }

  /**
   * Load the collection
   */
  private loadCollection(){
    if(this.userId || this.appData.getCurrentUser()) {
      this.appData.getCollection(this.path, this.userId).subscribe((collection) => {
        this.collection = collection;
      });
    } else {
      this.collection = [];
    }
  }

  /**
   * Build the navigation path and set it to the title
   * @param path String array to build the navigation path
   */
  private buildNavPath(path: string[], user:User): void{
    let navPath: Path[] = [];
    this.appData.getCategories().subscribe((categories)=> {
      let latestCategory: Category = null;
      if(user) {
        navPath.push(new Path("Collection de " + user.firstname, "/collection", {user: user.id}));
      } else {
        navPath.push(new Path("Ma collection", "/collection", null));
      }
      path.forEach((pathId, pathIndex) => {
        if (latestCategory) {
          categories = latestCategory.children;
        }
        latestCategory = categories.find((category) => {
          return category.id === pathId;
        })
        let queryParams = path.reduce((acc, value, index) => {
          if (index > pathIndex) {
            return acc;
          } else {
            return acc + "_" + value;
          }
        })
        let userId = user ? user.id : null;
        let item = new Path(latestCategory.getName(), "/collection", {path:queryParams, user: userId});
        navPath.push(item);
      })
      this.titleService.setNavPath(navPath);
    })
  }

  onTemplateChange(template: string){
    this.template = template;
  }

}
