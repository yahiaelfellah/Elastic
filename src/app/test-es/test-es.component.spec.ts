import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEsComponent } from './test-es.component';

describe('TestEsComponent', () => {
  let component: TestEsComponent;
  let fixture: ComponentFixture<TestEsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestEsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestEsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
