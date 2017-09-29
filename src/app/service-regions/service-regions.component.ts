import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AwsApiService } from '../aws-api.service';
import { AwsRegion } from '../aws-region';

@Component({
  selector: 'app-service-regions',
  templateUrl: './service-regions.component.html',
  styleUrls: ['./service-regions.component.css'],
  providers: []
})
export class ServiceRegionsComponent implements OnInit {
  offerCode: string;
  regions: AwsRegion[];
  getRegionsUrl: string;
  private sub: any;
  regionSelected: boolean = false;
  region: string;
  awsApiService: AwsApiService;

  constructor(awsApiService: AwsApiService, private route: ActivatedRoute) {
    this.awsApiService = awsApiService;
    // TODO: get all regions for that service
    this.sub = this.route.params.subscribe(params => {
      this.offerCode = params['offerCode']; 
    });
    this.awsApiService.getServiceRegionsArray(this.offerCode).then(response => this.regions = response);
  }

  ngOnInit() {
  }

  handleClick(params) {
    this.regionSelected = true;
    this.region = params.regionCode;
    this.awsApiService.getPricing(params.currentVersionUrl)
    .then(response => console.log(response));
  }

}
