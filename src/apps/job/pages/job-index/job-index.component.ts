import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhilippineRegion } from  '../../providers/philippine-region'
import { POSTS } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';

declare var Array;

@Component({
  selector: 'app-job-index',
  templateUrl: 'job-index.component.html'
})
export class JobIndexComponent implements OnInit {

  page: number = 1;
  range: number[] = [18, 60];
  searching: boolean = false;
  numbers = Array.from(new Array(20), (x,i) => i+1);
  provinces: Array<string> = [];
  cities = [];
  showCities: boolean = false;
  pages: Array<POSTS> = [];
  condition: string = '';

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
  constructor(private region: PhilippineRegion,
              private post: Post,
              private router: Router,

  ) {
    region.get_province( re => {
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

  search() {
    this.showLoader();
    console.log("search() form has changed. you can search now: data: ", this.query);
    this.condition = '';
    this.pages = [];
    this.page = 1;
    //profession
    if( this.query.sub_category != 'all') this.condition += " AND sub_category = '"+ this.query.sub_category +"'";
    //province
    if( this.query.varchar_2 != 'all') this.condition += " AND varchar_2 = '"+ this.query.varchar_2 +"'";
    //city
    if( this.query.varchar_3 != 'all') this.condition += " AND varchar_3 = '"+ this.query.varchar_3 +"'";
    //work experience
    if( this.query.int_1 != 'all') this.condition += " AND int_1 = '"+ this.query.int_1 +"'";
    //gender
    if( this.query.gender != 'all') this.condition += " AND char_1 = '"+ this.query.gender +"'";
    this.doSearch();
  }

  doSearch() {
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx, sub_category, post_id, text_1,text_2,text_3, int_1, char_1, varchar_2,varchar_3,varchar_6";
    data.from = "sf_post_data";
    data.where = "post_id = 'jobs'" + this.condition;
    data.limit = "5";
    data.orderby = "idx desc";
    data.page = this.page++;
    this.post.debug = true;
    this.post.search( data, re => {
      console.log("search result: ", re);
      this.onSearchComplete( re );
    }, error => alert("error on search: " + error ) );
  }


  onSearchComplete( data ) {
    console.log('onSearchComplete()');
    this.hideLoader();
    this.displayPosts( data );
  }

  displayPosts( page ) {
    console.log( 'success', page );
    if(page.search.length){
      if ( page.page_no == 1 ) this.pages[0] = page;
      else this.pages.push( page );
    }
    else {
      console.log('No More Post');
      this.page--;
    }
  }

  onClickProvince() {
    if( this.query.varchar_2 != 'all') {
      this.query.varchar_3 = this.query.varchar_2;
      this.region.get_cities( this.query.varchar_2, re => {
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

  onClickEdit(idx){
    this.router.navigate(['/job/post', idx]);
  }

  onChange() {
    console.log("onChange() form has changed. you can search now: data: ", this.query);
  }

  onScrollDown () {
    console.log('scrolled down!!');
    this.doSearch();
  }

}
