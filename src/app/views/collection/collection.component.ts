import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import { ActivatedRoute } from '@angular/router';
import { Path } from 'src/app/models/path';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { Collectionnable } from 'src/app/models/collectionnable';
import { Collection } from 'src/app/models/collection';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // Will contain Collection and Collectionnable
  private collection: any[];
  private template: string;
  private displayMissing: boolean;
  private path = [];
  private userId: string;

  constructor( 
    public appData: AppDataService,   
    private titleService: AppTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {    
    this.displayMissing = localStorage.getItem("missingActivated") === "true";
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
        this.appData.getUser(this.userId).take(1).subscribe((user) => {
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
      
      if(this.displayMissing) {
        this.loadMissingCollection();
      } else {
        this.appData.getCollection(this.path, this.userId).subscribe((collection) => {
          this.collection = collection;
        });
      }
    } else {
      this.collection = [];
    }
  }

  /**
   * Load the missing collection
   */
  private loadMissingCollection(){
    this.appData.getCollection(this.path, this.userId).subscribe((collection) => {
      // Keep categories and remove collectionable if it make sens (need a number)
      this.collection = [];
      let lastNumber = 1;
      collection.forEach((item) => {
        if (item instanceof Collection) {
          this.collection.push(item);
        } else if (item instanceof Collectionnable) {
          if (item.getNumber()){
            let number = parseInt(item.getNumber());
            let diff = number - lastNumber;
            if (diff > 0) {
              for (let i = 0; i < diff; ++i) {
                // Create as much as necessary missing items
                let missing = new Collectionnable({
                  name: "?",
                  number: lastNumber++
                }, item.category);
                
                this.collection.push(missing);
              }
            }
            ++lastNumber;
          } else {
            this.collection.push(item);
          }
        }
      });
      
      if (lastNumber > 1) {
        let missing = new Collectionnable({
          name: "?",
          number: "> " + (lastNumber - 1)
        }, null);
        
        this.collection.push(missing);
      }
    });
  }

  /**
   * Build the navigation path and set it to the title
   * @param path String array to build the navigation path
   */
  private buildNavPath(path: string[], user:User): void{
    let navPath: Path[] = [];
    this.appData.getCategories().take(1).subscribe((categories)=> {
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

  onMissingChange(missingActivated: boolean) {
    this.displayMissing = missingActivated;
      this.loadCollection();
  }

}
