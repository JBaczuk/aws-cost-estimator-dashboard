import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AwsService } from './aws-service';
import { AwsRegion } from './aws-region';

@Injectable()
export class AwsApiService {

  aws_services: AwsService[];  
  aws_regions: AwsRegion[];
  aws_api_url_prefix = 'https://pricing.us-east-1.amazonaws.com';
  aws_services_idx_url = 'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/index.json';

  constructor(private http: Http) { }

  getServicesArray(): Promise<AwsService[]> {    
    // Make the HTTP request:
    return this.http.get(this.aws_services_idx_url)
      .toPromise()
      .then(response => { return this.convertToArray(response, 'offers') })
      .catch(this.handleError);
  }

  getServices(): Promise<any> {    
    return this.http.get(this.aws_services_idx_url)
      .toPromise()
      .then(response => { return response })
      .catch(this.handleError);
  }

  getServiceRegionsArray(offerCode): Promise<AwsRegion[]> { 
    return this.getServices()
    .then(response => { 
      return this.http.get(this.aws_api_url_prefix + response.json().offers[offerCode].currentRegionIndexUrl)
        .toPromise()
        .then(response => { return this.convertToArray(response, 'regions') });
    });
  }

  getServiceRegions(offerCode): Promise<any> { 
    return this.getServices()
    .then(response => { 
      return this.http.get(this.aws_api_url_prefix + response.json().offers[offerCode].currentRegionIndexUrl)
        .toPromise()
        .then(response => { return response });
    });
  }

  getPricing(url): Promise<any>{
    return this.http.get(this.aws_api_url_prefix + url)
    .toPromise()
    .then(response => { return this.convertToArray(response, 'products') })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  private convertToArray(aws_object, key): any[] {
    // Convert result to an array to be able to use ngFor directive
    return Object.keys(aws_object.json()[key]).map(function(e){
      Object.keys(aws_object.json()[key][e]).forEach(function(k){
        if(typeof aws_object.json()[key][e][k] == "object") {
          aws_object.json()[key][e][k] = Object.keys(aws_object.json()[key][e][k]).map(function(l){
            return aws_object.json()[key][e][k][l];
          });
        }
      });
      return aws_object.json()[key][e];
    });
  }
}