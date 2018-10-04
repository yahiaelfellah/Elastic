import {Component , NgModule , OnInit} from '@angular/core';
import {ElasticsearchService} from '../elasticsearch.service';
import {FormGroup} from '@angular/forms';
import {Image, Found } from './photo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent implements OnInit {

  private static readonly  INDEX = 'flickrphotos';
  // private static readonly  TYPE = 'Search';
  isConnected = false;
  status = '';
  form: FormGroup ;
  results: Image ;
  other: Found ;
  private queryText = '';
  private lastKeyPressed = 0 ;
  constructor(private es: ElasticsearchService) {
    this.queryText = '';

  }
  ngOnInit() {
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true ;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
    });
  }

  search($event) {
    if ($event.timeStamp - this.lastKeyPressed > 100) {
      this.queryText = $event.target.value;
      this.es.fullTextSearch(SearchComponent.INDEX, this.queryText)
        .then(
        response => {
          this.other = response.hits.hits;
          this.results = response.hits.hits;
          console.log(response.hits.hits);
        }, error => {
          console.error(error);
        }
      ).then(() => { console.log('Search Completed ! '); });
    }


  }
  address(c) {
    const add = 'http://farm' + c._source.flickr_farm + '.staticflickr.com/' + c._source.flickr_server + '/' + c._source.id + '_' + c._source.flickr_secret + '.jpg';

    return add ;
  }

}
