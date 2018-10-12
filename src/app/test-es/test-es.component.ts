import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { ElasticsearchService} from '../elasticsearch.service';
import {FormBuilder , FormGroup} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';


const URL = 'http://localhost:9200/uplaod';
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
  uploader: FileUploader = new FileUploader({url: URL , itemAlias: 'photo'});
  ngOnInit() {
  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
  };
  this.uploader.onCompleteItem = (item: any, response: any , status: any, header: any ) => {
    console.log('file uploaded', item, response, status, header);
    alert('file uploaded successfully');

    };
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
