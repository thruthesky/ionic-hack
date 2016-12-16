import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhilippineRegion } from  '../../providers/philippine-region'
import { POSTS } from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Member, MEMBER_LOGIN } from '../../../../api/philgo-api/v2/member';
import { Post, SEARCH_QUERY_DATA } from '../../../../api/philgo-api/v2/post';
import * as _ from 'lodash';

declare var Array;

@Component({
  selector: 'app-job-index',
  templateUrl: 'job-index.component.html'
})
export class JobIndexComponent implements OnInit {

  login: MEMBER_LOGIN = null;
  page: number = 1;
  range: number[] = [18, 60];
  searching: boolean = false;
  numbers = Array.from(new Array(20), (x,i) => i+1);

  //variables used in range
  minAge: number = 18;
  maxAge: number = 60;
  minAgeRange = Array.from(new Array( this.maxAge - this.minAge), (x,i) => i+1);
  maxAgeRange = this.minAgeRange;
  minAgeSelected: number = this.minAge;
  maxAgeSelected: number = this.maxAge;
  betweenAge: number = this.minAge -1;

  today = new Date();
  currentYear = this.today.getFullYear();

  moreButton = [];

  provinces: Array<string> = [];
  cities = [];
  showCities: boolean = false;
  pages: Array<POSTS> = [];
  condition: string = '';
  urlDefault: string = "assets/img/anonymous.gif";
  urlPhoto: string = this.urlDefault;
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

  searchBy: { location?, profession?, more? } = {};

  // searchByLocation:boolean = false;
  // searchByProfession:boolean = false;
  // searchByAdvance:boolean = false;

  constructor(private region: PhilippineRegion,
              private post: Post,
              private router: Router,
              private member: Member

  ) {

    // this.login = this.member.getLoginData();
    member.getLogin( x => this.login = x );

    region.get_province( re => {
      this.provinces = re;
    }, e => {
      //console.log('error location.get_province::', e);
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
    //console.log("search() form has changed. you can search now: data: ", this.query);
    this.condition = '';
    this.pages = [];
    this.page = 1;

    let min = this.currentYear-this.minAgeSelected;
    let max = this.currentYear-this.maxAgeSelected;
    //ageRange
    this.condition+= " AND int_2 <= '"+ min +"'"; //min age
    this.condition+= " AND int_2 >= '"+ max +"'"; //max age
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
    //name
    if( this.query.name ) this.condition += " AND text_1 LIKE '%"+ this.query.name +"%'";


    this.debounceDoSearch();
    //this.doSearch();
  }

  private debounceDoSearch = _.debounce( () => this.doSearch(), 1000);

  doSearch() {
    console.log('###############doSearch###############');
    let data = <SEARCH_QUERY_DATA> {};
    data.fields = "idx,idx_member,gid,sub_category,post_id,text_1,text_2,text_3,int_1,int_2,int_3,int_4,char_1,varchar_1,varchar_2,varchar_3,varchar_4,varchar_6";
    data.from = "sf_post_data";
    data.where = "post_id = 'jobs' AND idx_parent=0" + this.condition;
    data.limit = "5";
    data.orderby = "idx desc";
    data.page = this.page++;
    data.post = 1;
    //this.post.debug = true;
    this.post.search( data, re => {
      console.log("search result: ", re);
      this.onSearchComplete( re );
    }, error => alert("error on search: " + error ) );
  }

  onClickLocation() {

  }


  onSearchComplete( data ) {
    //console.log('onSearchComplete()');
    this.hideLoader();
    this.displayPosts( data );
  }

  displayPosts( page ) {
    //console.log( 'success', page );
    if(page.search.length){
      this.pages.push(page);
      /*if ( page.page_no == 1 ) this.pages[0] = page;
      else this.pages.push( page );*/
    }
    else {
      //console.log('No More Post');
      this.page--;
    }
  }

  onClickProvince() {
    if( this.query.varchar_2 != 'all') {
      this.query.varchar_3 = this.query.varchar_2;
      this.region.get_cities( this.query.varchar_2, re => {
        //console.log('cities', re);
        if(re) {
          this.cities = re;
          //console.log(re);
          this.showCities = true;
        }
      }, e => {
        //console.log('error location.get_cities::', e);
      });
    }
    else {
      this.query.varchar_3 = 'all';
      this.showCities = false;
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

  onClickDelete( post ) {
    let re = confirm("Are you sure you want to delete this post?");
    if ( re ) {
      this.post.delete( post.idx, re => {
            //console.log('delete: re: ', re);
          },
          error => alert("delete error: " + error )
      );
    }
    else {
      //console.log('delete Was Canceled');
    }
  }

  onChange() {
      this.search();
  }

  minRangeChange(){
    this.betweenAge = this.minAgeSelected - 1;
    this.maxAgeRange = this.getRange( this.minAgeSelected, this.maxAge);
    this.search();
  }
  maxRangeChange(){
    this.minAgeRange = this.getRange( this.minAge, this.maxAgeSelected);
    this.search();
  }
  getRange(min , max) {
    return Array.from(new Array( max - min), (x,i) => i+1);
  }

}
