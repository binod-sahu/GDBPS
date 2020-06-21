import { Component, OnInit, ViewEncapsulation, ViewChild, ChangeDetectorRef } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs/internal/Observable';
import * as geolib from 'geolib';
import { London, user } from '../lib/constants';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locationData: [];
  locationCityData: [];
  filteredData: any

  constructor(
    public restApi: LocationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserBYCity();
    this.getUserByDistance()
  }
 
loadUserBYCity() {
    this.restApi.getUserByCity('London').subscribe((data) => {
      this.locationCityData = data;
      this.cd.markForCheck();
    });
  }

 getDistance = (from, to) => {
  const distanceInMetres = geolib.getDistance(from, to);
  const test = geolib.convertDistance(distanceInMetres, "mi");
  return test
}

getUserByDistance() {
  this.filteredData = this.getUsersWithinDistance(London, 60);
  this.cd.markForCheck();
}

getUsersWithinDistance =  (city, distance) => {
  this.restApi.getUsers().subscribe((data) => {
  this.locationData = data;
  this.filteredData =  this.locationData.filter(({latitude, longitude}) => {
    return this.getDistance(city, {latitude, longitude}) <= distance;
   }).concat(this.locationCityData);
  });
}
}
