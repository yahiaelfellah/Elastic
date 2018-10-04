import { Injectable } from '@angular/core';
import { Client} from 'elasticsearch-browser';
import  * as elastic from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private client: Client ;
  constructor() {
    if (!this.client) {this.connect(); }
  }
  private connect() {
    this.client = new Client({
      host : 'http://localhost:9200',
      log : 'trace'
    });
  }
  isAvailable(): any {
    return this.client.ping({
      requestTimeout : Infinity ,
      body : ' Hello '
    });
  }

  CreateIndex(name): any {
    return this.client.create(name);
  }
  // getAllDocumentsWithScroll(_index, _type, _size) {
  //   return this.client.search({
  //     index : _index,
  //     type: _type,
  //     scroll: '1m',
  //     body: {
  //       'size': _size,
  //       'query': {
  //         'match_all': {}
  //       },
  //       'sort': [{ '_uid': {'order': 'asc'}}]
  //     }
  //   });
  // }

  fullTextSearch(_index,_queryText): any {
    return this.client.search({
      index: _index,
      q: _queryText,
      // filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      // body: {
      //   'query': {
      //     'match_phrase_prefix': {
      //       [_field]: _queryText,
      //     }
      //   }
      // },
      // '_source': ['fullname', 'address']
    });
  }

}
