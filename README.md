Ricerca
=======
A search bar alternative that uses commands/bangs. Made with HTML + CSS + jQuery.

__Preview:__ [Demo #1](http://jackosdev.github.io/Ricerca-Homepage) - [Demo #2](http://jackosdev.github.io)  
__Download:__ [Latest](https://github.com/JackosDev/Ricerca-Homepage/archive/master.zip) - [Minimal](https://github.com/JackosDev/Ricerca-Homepage/tree/minimal)


Customization
-------------
Open `ricerca.config.js`. Edit everythings that's inside.  
You can add search providers _ad infinitum_. Just follow the examples.
```javascript
ricercaProvidersList = [
// Command, Page name,      Form action,                            Input name
    "!d",   "DuckDuckGo",   "https://www.duckduckgo.com",           "q",
    "!g",   "Google",       "https://www.google.com/search",        "q",
    "!w",   "Wikipedia",    "http://en.wikipedia.org/w/index.php",  "search",
    "!y",   "YouTube",      "https://www.youtube.com/results",      "search_query"
];

ricercaDefaultProvider = "Google";
```

To add the corresponding icon, add it to the `images/icons` folder, with the filename being the same as `Provider Name` and having `.ICO` as format.

Disclaimer
----------
For getting the icons I used [getFavicon](http://getfavicon.appspot.com/). Each image belongs to the corresponding owner and I am in no way affiliated to them.

License
-------
Copyright © 2016 -- JackosDev @ github
This work is free. You can redistribute it and/or modify it under the
terms of the Do What The Fuck You Want To Public License, Version 2,
as published by Sam Hocevar. See http://www.wtfpl.net/ for more details.
