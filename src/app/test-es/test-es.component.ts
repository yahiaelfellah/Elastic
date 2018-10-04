import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ElasticsearchService} from '../elasticsearch.service';
import {FormBuilder , FormGroup} from '@angular/forms';


@Component({
  selector: 'app-test-es',
  templateUrl: './test-es.component.html',
  styleUrls: ['./test-es.component.css']
})
export class TestEsComponent implements OnInit {
  isConnected = false ;
  status: string ;
  form: FormGroup ;

  constructor(private fbuilder: FormBuilder, private es: ElasticsearchService, private cd: ChangeDetectorRef) {
    this.isConnected = false ;
    this.form = fbuilder.group({
      index: '',
    });
  }

  ngOnInit() {

  }
  onSubmit(value) {
    this.es.CreateIndex({index: value.index } ).then(
      result => {
      console.log(result);
      alert('Index added');
      }, error => {
        console.log(error);
        alert('Something went wrong check logs');
    }
    ) ; }
    onClick(value) {
    console.log(value); }


}
