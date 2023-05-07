import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { housingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filterInput>
      <button class="primary" type="button" (click)="filterResults(filterInput.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location
    *ngFor="let item of filteredLocationList" 
    [housingLocation]="item"
    ></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})


export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  housingService: housingService = inject(housingService);
  constructor() {
    this.housingService.getAllHousingLocations().then( h => this.housingLocationList = h);
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(filter: string) : void{
    if (filter!){
      this.filteredLocationList =  this.housingLocationList;
    }
    this.filteredLocationList = this.housingLocationList
    .filter(h => h?.city?.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) );

  }
}
