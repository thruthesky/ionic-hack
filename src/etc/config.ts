declare let navigator;
let language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
               navigator.language ||   // All browsers
               navigator.userLanguage; // IE <= 10

let lang = language.substr( 0, 2 );
if ( lang != 'ko' ) lang = 'en';
export let Config = {
    name: 'Sonub',
    language: lang,
    urlPhilgoServer: 'http://test.philgo.com/index.php' // For test server.
    // urlPhilgoServer: 'https://www.philgo.com/index.php' // For real server.
}
