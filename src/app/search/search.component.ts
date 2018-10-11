import {Component , NgModule , OnInit} from '@angular/core';
import {ElasticsearchService} from '../elasticsearch.service';
import {FormGroup} from '@angular/forms';
import {Image, Found } from './photo';
import {ModalServiceService} from '../modal-service.service';


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
  modalService: ModalServiceService;
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
  log(f)  {
    console.log(f);
  }
  search($event) {
    if ($event.timeStamp - this.lastKeyPressed > 100) {
      this.queryText = $event.target.value;
      this.es.fullTextSearch(SearchComponent.INDEX, this.queryText)
        .then(
        response => {
          this.other = response.hits.hits.length;
          this.results = response.hits.hits;
          console.log(response.hits.hits);
        }, error => {
          console.error(error);
        }
      ).then(() => { console.log('Search Completed ! '); });
    }


  }
  getType(c) {
    return c._source.type;
  }
  getTags(c) {
    const a: string = c._source.tags[0];
    const tab = a.toString().substr(1, (a.length - 2)).split(',');
    const tags = tab.splice(0, tab.length - 3);
    const updated = tab.splice(tab.length - 2, 2);
    return tags;
  }
  address(c) {
    const add = 'http://farm' + c._source.flickr_farm + '.staticflickr.com/' + c._source.flickr_server + '/' + c._source.id + '_' + c._source.flickr_secret + '.jpg';

    return add ;
  }
  empty(a: string) {
    return a.length ? a : 'no Tags' ;
  }
  openModal(id: string) {
    this.modalService.open(id);
    console.log('open');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
