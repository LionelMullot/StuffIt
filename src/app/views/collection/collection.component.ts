import { Component, OnInit, ChangeDetectorRef, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { ItemBoxComponent } from 'src/app/components/item-box/item-box.component';
import { AppTitleService } from 'src/app/services/app-title-service.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  constructor( 
    public appData: AppDataService,   
    private titleService: AppTitleService
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Ma collection");
  }

}
