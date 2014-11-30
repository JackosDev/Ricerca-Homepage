Ricerca
=======
A search bar alternative that uses commands/bangs. Made with HTML + CSS + jQuery. [[Live Demo](http://jackosdev.github.io/Ricerca-Homepage/)]  

Customization
-------------
To add your own provider edit `search.js` and follow the examples
```javascript
searchProviders_list = [
    "!command",     "Provider Name",    "http://action.url",                "input_name",
    "!g",           "Google",           "https://www.google.com/search",    "q"
];
```
  
To add the corresponding icon, add it to the `images/icons` folder, with the filename being the same as `Provider Name`. The image *must* be a correctly formatted `.ICO`.

Disclaimer
----------
For getting the icons I used [getFavicon](http://getfavicon.appspot.com/). Each image belongs to the corresponding owner and I am in no way affiliated to them.