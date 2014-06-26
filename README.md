Ricerca
=======
A search bar alternative that uses commands/bangs. Made with HTML + CSS + jQuery. [[Live Demo](http://jackosdev.github.io/Ricerca-Homepage/)]  

Customization
-------------
To add your own provider edit `search.js`
```javascript
regexSearchProviders = [
    (...),
    "Provider Name"
];

regexSearchPatterns = [
    (...),
    "!command" // Provider Name
];
```
`Provider Name` and `!command` *must* match in order (ie. if `Provider Name` is 4th on the list, `!command` also must be 4th).  

Then near the end of the file
```javascript
        (...)
        switch(currentprovider) {
            (...)
            case "Provider Name":
                $("#searchForm").attr("action", "http://url.com/search");
                $("#searchSubmit").attr("name", "searchvar");
                break;
        }
```
`Provider Name` must be the same of the one you specified first in `regexSearchProviders`.  
You might need to replace `http://url.com/search` and `searchvar` to the one corresponding of your search provider, I won't explain how to get those, use Google.  
To add the corresponding icon, add it to the `images` folder, also with the same name you used for `Provider Name`. The extension of the image *must* be `.ICO`.

Disclaimer
----------
For the icons I used [getFavicon](http://getfavicon.appspot.com/).