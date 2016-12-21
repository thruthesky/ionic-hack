import { Injectable } from '@angular/core';
import { POST_DATA } from '../../../../api/philgo-api/v2/philgo-api-interface'
interface subject{
  idx:number;
  name:string;
}
@Injectable()
export class DataService {
  subject_index;
  activeCheck:boolean;

  question_data = <POST_DATA>{
    idx: ''
  }
  question_index;

  subject_data = <POST_DATA>{
    idx: ''
  };
  
  playerStats={
    subject:null,
    name: null,
    score: null,
    total_questions: null
  }
  categoryIDX:number;

  subjectIDX:subject = <subject>{};

  constructor() { }

  check_status( isActive ){
      if( isActive == 'true') {
        return true;
      }
      else return false;
  }
}
