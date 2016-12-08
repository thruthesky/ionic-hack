import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { Location } from  '../../providers/location'
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';


@Component({
  selector: 'app-job-index',
  templateUrl: 'job-index.component.html',
})
export class JobIndexComponent implements OnInit {


  range: number = 34;
  items: Observable<Array<string>>;
  term = new FormControl();
  search_result = [];
  searching: boolean = false;
  numbers = Array.from(new Array(20), (x,i) => i+1);
  provinces: Array<string> = [];
  cities = [];
  showCities: boolean = false;

  query = {
    sub_category: 'all',
    name: '',
    varchar_2: 'all', //province
    varchar_3: 'all', //city
    int_1: 'all', //work experience
    gender: 'all',
    male: false,
    female: false
  };
  constructor(private location: Location,
              private post: Post
  ) {
    location.get_province( re => {
      this.provinces = re;
    }, e => {
      console.log('error location.get_province::', e);
    });


  }

  ngOnInit() {
    this.search();
  }

  get cityKeys() {
    return Object.keys( this.cities );
  }

  search( $event? ) {
    this.showLoader();
    console.log("search() form has changed. you can search now: data: ", this.query);
    let cond = '';
    //profession
    if( this.query.sub_category != 'all') cond += " AND sub_category = '"+ this.query.sub_category +"'";
    //province
    if( this.query.varchar_2 != 'all') cond += " AND varchar_2 = '"+ this.query.varchar_2 +"'";
    //city
    if( this.query.varchar_3 != 'all') cond += " AND varchar_3 = '"+ this.query.varchar_3 +"'";
    //work experience
    if( this.query.int_1 != 'all') cond += " AND int_1 = '"+ this.query.int_1 +"'";
    //gender
    if( this.query.gender != 'all') cond += " AND char_1 = '"+ this.query.gender +"'";



    this.search_result = [];

    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx, sub_category, post_id, text_1,text_2,text_3, int_1, char_1, varchar_2,varchar_3,varchar_6";
    data.from = "sf_post_data";
    data.where = "post_id = 'jobs'" + cond;
    data.limit = "15";
    data.orderby = "idx desc";
    this.post.search( data, re => {
      console.log("search result: ", re);
      this.onSearchComplete( re );
    }, error => alert("error on search: " + error ) );
  }

  onSearchComplete( re ) {
    console.log('onSearchComplete()');
    this.hideLoader();
    this.displayPosts( re.search );
  }

  displayPosts( data ) {
    console.log( 'success', data );
    for( let post of data ){
      this.search_result.push( post);
    }

    console.log('displayPosts:: ' , this.search_result);
  }

  onClickProvince() {
    if( this.query.varchar_2 != 'all') {
      this.query.varchar_3 = this.query.varchar_2;
      this.location.get_cities( this.query.varchar_2, re => {
        console.log('cities', re);
        if(re) {
          this.cities = re;
          console.log(re);
          this.showCities = true;
        }
      }, e => {
        console.log('error location.get_cities::', e);
      });
    }
    this.search();
  }

  showLoader() {
    this.searching = true;
  }
  hideLoader() {
    this.searching = false;
  }

  onChange() {
    console.log("onChange() form has changed. you can search now: data: ", this.query);
  }

}
