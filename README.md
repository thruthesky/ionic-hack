# Ionic Hack

Ionic 2 project hack by JaeHo Song to use Angular2 framework with ionic 2.

## Repository

* We work on master branch. So, Modularity and Refactoring of folders, source files, asessts are highly important because many app will be made upon this single source repository.

## Work Environment

* When you do project, fork http://github.com/thruthesky/ionic-hack and use it.
    * for instance, there is a forked project at http://github.com/withcenter/sonub
    * all sonub developers should clone 'http://github.com/withcenter/sonub'
    * so, when there is any update, you can do pull request.

* Local clone should be 'ionic-hack' to avoid confusion which means, when you work on 'ionic-hack' repository, clone the project with same folder name.
    * work folder: c:/work/www/ionic/ionic-hack

* Test on web
    * ionic serve --address 192.168.26.2 --port 8000
* Test on mobile and web
    * ionic serve -lc



# TODO

* 모듈화 & 컴포넌트 디렉티브 화. 그래서 philgo api 관련된 코드를 직접 작성하는 것이 아니라,
    그냥 directive 를 추가하므로서 글 CRUD, 코멘트 쓰기 CRUD 를 할 수 있도록.
    단, 글 목록은 directive 로 하지 않는다.
* git pull 에서 philgo-api 에서,
    * branch master FETCH_HEAD 에러가 나온다.
    * 해결이 안되면, philgo-api 를 없애고 다시 load 한다.
* 글 쓰기 외에, 글 수정/코멘트쓰기/수정 등을 모두 modal popup 으로 한다.

* improve philgo api uniqid(). it is too simple and may cause problem.

* 게시판 첨부 파일 업로드. post-edit.ts onChangeFile() 에 있는 데로
    data.uploadPostFile( gid, event ) 형식을 값을 받는다.
    이것은 회원 정보에서 사진 업로드 마찬가지로 한다.

* cordova-plugin-transfer 를 philgo api data.ts 에 포함해서
    보다 쉽게 사용 할 수 있도록 한다.
    
* 게시판 글을 보여 줄 때, loader 를 보여 준다. 특히, 캐시가 없을 때, 시간이 걸린다.
* 글 수정을 bootstrap modal 로 한다.
    * 글 수정 후, 원래 글 업데이트.
* 글 삭제.
* 글 추천, 리포트,
* 코멘트 CRUD, vote, report, 사진 업로드.

* 글 작성/수정 페이지에서 사진 업로드/삭제시에 확실하게 loader 를 표시한다.
– form validity.
– Ux for navigating the site. proper buttons on proper place.
for instance, show ‘edit’, ‘delete’ buttons only to those who has permission. and show ‘report’, ‘spam’, ‘like’, ‘dislike’ to those who are not the owner of the user.
– Show proper infomrmation on proper place. For instance) show ‘date of post’, ‘number of comments’, ‘number of likes’, ‘number of views’ on post header part and comment header part.
– Routing on each post and expose the URL of the post so user can share the post. which means, provides URL and let users actually visit the post with the uRL.
– Show 5 comments at the bottom of the post by default and show ‘show more’ button. Once clicked show all the comments.
– Show comment box at the bottom of the post. When enter key clicked, post the comemnt.
– show all the buttons of the post and comment properly.
– Do infinite scroll.
– Do file upload.
– Use bootstrap v4 and use it properly.
– Expose all the data so users can view without login.
– Post search, comment search, search by category, search by user, date, search by fields
– gropu list ( for instance, qna + freetalk forum ), gorup search and all the fields combination search.
– post create/edit: do not reload/move page to show edit form or after edit.
just use a bootstrap modal popup.
* @see 'TODO' list of philgo-api REDME
* apply c:\work\angular\sonub as much as it can be on https://github.com/withcenter/sonub
    * @see angular/sonub/README.md
 
* @done base/user/register 에서 update 를 한다.
    * update 하면서 코드를 정리하고,
    * 모바일 사진 업로드하면서, 파일 업로드 관련 코드를 
        완전히 간결하게 한다.
* /user/profile to show user profile to others.
* @done philgo Member primary photo
    * with firebase auth.
* @done complete templating for RWD design.
    * [loader](https://docs.google.com/document/d/1ZEplms60Dr9U4gMCvqxjMEAbyrH5duPkifEqxuPUiYc/edit#heading=h.dtpu4gybsdzf)
* @deprecated let developers clone https://github.com/withcenter/sonub
    since this, fork out 'https://github.com/thruthesky/ionic-hack' and continue a new project. if there is update, submit full request.

* @depcreated. clould based backend without philgo api. hosting, database with full text search, file storage.



## TODO : BUGS

* ng-boostrap modal was removed although it does not look like an error of bootstrap modal ( it looks like an error of @ionic/app-scripts. there is an issue. ), it is an disturbance to code.

* sharing place holder of formProcess does not work on IE.


````
    <i class="fa fa-gear fa-stack-1x fa-inverse" [class.fa-spin]="process.loader"></i>
````

* [class.fa-spin]="process.loader" is not working when it is changed in other component.



# Installation

* npm install
* ionic plugin add cordova-plugin-camera
* ionic plugin add cordova-plugin-file-transfer
* ionic plugin add phonegap-plugin-push

## Submodule Installation

If you clone a repository which was forked, then you do not need to do 'git submodule update --init'. but may need to do 'git checkout master'.

* git submodule update --init
* git submodule foreach git branch
* git submodule foreach git checkout master


## Packages installed by 'npm install'

You do not need to install these module one by one. these are installed by 'npm install'.

* npm i ng2-file-upload --save
* npm i lodash --save
* npm install angular2-infinite-scroll --save



# Folder Structure

* Since this single repository is used for many apps, this actually has different kinds of app source codes.
* All the source code for each app must be kept inside src/apps folder.
    * For instance, you want to build an app named 'sonub'.
        * put all your code under 'src/apps/sonub' foler and don't touch outside.
        





# Form Submission

* When you submit a form, Use 'share.formProcess'

# Language Translation

There are two language translation pipe. ln and ek.

'ln' uses the language in language-text.ts while 'ek' uses the input of pipe.

````
    {{ ['Register', '회원가입'] | ek }}
````

* The first string is English, and the second string is Korean.






# Locations of Philippines

* @see philgo api.




# history

2016-12-02

fork of withcenter