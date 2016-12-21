import { Injectable } from '@angular/core';
import { Member } from '../../../../api/philgo-api/v2/member';
import { MEMBER_LOGIN_DATA, SEARCH_QUERY_DATA} from '../../../../api/philgo-api/v2/philgo-api-interface';
import { Router } from '@angular/router';

@Injectable()
export class MemberRoutingService  {
  userInfo = {
    name:''
  };
  
  logged: boolean;
  sessionData = <MEMBER_LOGIN_DATA>{};
  adminroute = <MEMBER_LOGIN_DATA>{};
  isAdmin:boolean = false;
  constructor(
    private router: Router,
    public member: Member
  ) { 
    this.getLogin();
    this.adminroute.id = 'ayson_steven';
    

  }

  getLogin(){
    this.sessionData = this.member.getLoginData();
  }
  checkLoginData( ){
    console.info( ' session service checklogin(()) ** ', this.adminroute.id );

    
      if( ( this.sessionData.id == this.adminroute.id ) ){
        console.log('true')
        return true;
      }
      
      if( this.sessionData && ( this.sessionData.id != this.adminroute.id ) ){
        console.log( 'user', this.adminroute.id )
        // this.router.navigate( [ 'home' ] );
        return;
      }
      
    if( ! this.sessionData ){
      this.router.navigate( [ 'login' ] )
      return
    }
  }

  


  checkAdminLogin(){
  }


  adminData(){
   
      let data        = <SEARCH_QUERY_DATA> {};
          data.fields = "id, name, varchar_1";
          data.from   = "sf_member";
          data.where  = "id='ayson_steven'"
      this.member.search( data, res=>{
        this.adminroute = res.search[0];
        console.info( 'admin search', this.adminroute.id )
     
      }, e=>{
        alert( "error on search: " + e )
      })
    }
  }


