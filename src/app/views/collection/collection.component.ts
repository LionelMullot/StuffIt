import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import { ActivatedRoute } from '@angular/router';
import { Path } from 'src/app/models/path';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  // Will contain Collection and Collectionnable
  private collection: any[];

  constructor( 
    public appData: AppDataService,   
    private titleService: AppTitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let path = [];
      if (params.path) {
        path = params.path.split("_");
      }      
      this.buildNavPath(path);

      this.appData.getCollection(path).subscribe((collection) => {
        this.collection = collection;
      });
    });
    this.titleService.setTitle("Ma collection");
  }

  private buildNavPath(path: string[]): void{
    let navPath: Path[] = [];
    this.appData.getCategories().subscribe((categories)=> {
      let latestCategory: Category = null;
      navPath.push(new Path("Ma collection", "/collection", null));
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
        let item = new Path(latestCategory.getName(), "/collection", {path:queryParams});
        navPath.push(item);
      })
      this.titleService.setNavPath(navPath);
    })
  }

}
