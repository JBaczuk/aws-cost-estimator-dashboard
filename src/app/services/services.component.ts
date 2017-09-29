import { Component, OnInit } from '@angular/core';
import { AwsApiService } from '../aws-api.service';
import { AwsService } from '../aws-service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  providers: [AwsApiService],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  aws_services: AwsService[];

  constructor(awsApiService: AwsApiService, private router: Router ) { 
    awsApiService.getServicesArray().then(response => this.aws_services = response);
  }

  ngOnInit() {
    
  }

  handleClick(params) {
    this.router.navigate(['/service-regions', params.offerCode]);
  }

}
