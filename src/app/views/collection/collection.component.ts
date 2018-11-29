import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import { ActivatedRoute } from '@angular/router';

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
      this.appData.getCollection(path).subscribe((collection) => {
        this.collection = collection;
      });
    });
    this.titleService.setTitle("Ma collection");
  }

}
