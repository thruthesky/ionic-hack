# Language Translation



There are two language translation pipe. ln and ek.

* 'ln' uses the language in language-text.ts while 'ek' uses the input of pipe.

* 'ek' is for English or Korean.

````
    {{ 'fourm' | ln }}
    {{ ['Register', '회원가입'] | ek }}
````

* 'ek' gets two parameters. The first string is English, and the second string is Korean.


* You can use it on template expression.

````

<latest-component
    [title] = " ['Discussion', '자유게시판'] | ek "
></latest-component>

````