# Ionic Hack

Ionic 2 project hack by JaeHo Song to use Angular2 framework with ionic 2.


## Work Environment

* When you do project, fork http://github.com/thruthesky/ionic-hack and use it.
    * for instance, there is a forked project at http://github.com/withcenter/sonub
    * all sonub developers should clone 'http://github.com/withcenter/sonub'
    * so, when there is any update, you can do pull request.

* Local clone should be 'ionic-hack' to avoid confusion which means, when you work on 'ionic-hack' repository, clone the project with same folder name.
    * work folder: c:/work/www/ionic/ionic-hack

# TODO

* complete templating for RWD design.
    * [loader](https://docs.google.com/document/d/1ZEplms60Dr9U4gMCvqxjMEAbyrH5duPkifEqxuPUiYc/edit#heading=h.dtpu4gybsdzf)
* @see 'TODO' list of philgo-api REDME
* apply c:\work\angular\sonub as much as it can be on https://github.com/withcenter/sonub
    * @see angular/sonub/README.md
* let developers clone https://github.com/withcenter/sonub
* since this, fork out 'https://github.com/thruthesky/ionic-hack' and continue a new project. if there is update, submit full request.


## TODO : BUGS

* sharing place holder of formProcess does not work on IE.


````
    <i class="fa fa-gear fa-stack-1x fa-inverse" [class.fa-spin]="process.loader"></i>
````

* [class.fa-spin]="process.loader" is not working when it is changed in other component.



# Installation

* npm install


## Submodule Installation

If you clone a repository which was forked, then you do not need to do 'git submodule update --init'. but may need to do 'git checkout master'.

* git submodule update --init
* git submodule foreach git branch
* git submodule foreach git checkout master



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