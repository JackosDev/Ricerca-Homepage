Ricerca
=======
A search bar alternative that uses commands/bangs. Made with HTML + CSS + jQuery.

__Preview:__ [Demo #1](http://jackosdev.github.io/Ricerca-Homepage) - [Demo #2](http://jackosdev.github.io)  
__Download:__ [Latest](https://github.com/JackosDev/Ricerca-Homepage/archive/master.zip) - [Minimal](https://github.com/JackosDev/Ricerca-Homepage/archive/minimal.zip)


Customization
-------------
Open `search.js`. You can edit everythings that's inside the `User Configuration` block without fear.  
You can add search providers _ad infinitum_. Just follow the examples.
```javascript
//  Command,        Provider Name,      Form Action,                        Input name,
searchProviders_list = [
"!d",   "DuckDuckGo",   "https://www.duckduckgo.com",           "q",
"!g",   "Google",       "https://www.google.com/search",        "q",
"!w",   "Wikipedia",    "http://en.wikipedia.org/w/index.php",  "search",
"!y",   "YouTube",      "https://www.youtube.com/results",      "search_query"
];

// Default provider
searchProviders_default = "Google";
```

To add the corresponding icon, add it to the `images/icons` folder, with the filename being the same as `Provider Name` and having `.ICO` as format.

Disclaimer
----------
For getting the icons I used [getFavicon](http://getfavicon.appspot.com/). Each image belongs to the corresponding owner and I am in no way affiliated to them.
