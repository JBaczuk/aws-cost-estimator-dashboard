import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRegionsComponent } from './service-regions.component';

describe('ServiceRegionsComponent', () => {
  let component: ServiceRegionsComponent;
  let fixture: ComponentFixture<ServiceRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
