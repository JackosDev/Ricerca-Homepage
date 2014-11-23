/*
 *  Ricerca Homepage
 *
 *  A little explanation on how this works:
 *    The form has 2 inputs: 1) searchInput, where the user writes his query,
 *    and 2) searchSubmit, a hidden input which contains the cleaned string
 *    without bangs.
 *    When processing the form, searchInput is ignored since it contains
 *    characters unneeded for the user's query and the string stored in
 *    searchSubmit is finally sent.
 *
 *  There may exist better ways for achieving this, but I'm no professional
 *  coder (sorry for spaghetti code) and it seems to work without problems (at
 *  least for me).
 */

$(document).ready(function() {
    /* Search providers list */
    regexSearchProviders = [
        "Google",
        "YouTube",
        "Wikipedia"
    ];

    regexSearchPatterns = [
        "!g",   // Google
        "!y",   // YouTube
        "!w"    // Wikipedia
    ];

    providerCurrent = "none";
	providerInit = 0;
	
    // Initialize
    changeProvider("Google");

    // Build regex string with every search provider. We'll end with something
    // like (!g)|(!y)|(!w)
    var i = 0;
    while (i < regexSearchPatterns.length) {
        if (i == 0)
            regexString = "(" + regexSearchPatterns[i] + ")";   // for the first or only provider
        
        if (i > 0)
            regexString = regexString.concat("|(" + regexSearchPatterns[i] + ")"); // if there's another provider, add it to the pattern
        
        i += 1;
    }

    // Every time there's a keypress, check for new provider
    $("#searchInput").keypress(function() {
        var str = $(this).val();
        var regexPattern = new RegExp(regexString);

        if (regexPattern.test(str)) {
            keyword = regexPattern.exec(str);
            if (keyword != null) {
                var i = 0;
                while (i < regexSearchPatterns.length) {
                    if (keyword[0] == regexSearchPatterns[i])
                        changeProvider(regexSearchProviders[i]);
                    
                    i += 1;
                }
            }
        } else {
            changeProvider("Google");
        }
    });
    
    // Submitting the form
    $("#searchForm").submit(function(e) {
        e.preventDefault();

        var str = $("#searchInput").val();
        var regexPattern = new RegExp(regexString, "g");

        if (regexPattern.test(str)) {
            newstring = str.replace(regexPattern, "");  // clean the string and
            newstring = newstring.replace(/^(\s)/, ""); // remove first whitespace character (if it's found)
        } else {
            newstring = str;
        }
        
        $("#searchSubmit").attr("value", newstring);
        $("#searchForm")[0].submit();
    });
    
});

function changeProvider(providerNew) {
    if (providerNew != providerCurrent) {
        providerCurrent = providerNew;
		if (providerInit == 0) {fadeTime = 0; providerInit = 1;} else {fadeTime = 450;}
        $("#searchIcon").fadeOut(fadeTime, function() {
            $("#searchIcon").attr("src", "images/" + providerCurrent + ".ico");
            $("#searchIcon").fadeIn(fadeTime);
        });
    
        /* Providers */
        switch(providerCurrent) {
            case "Google":
                $("#searchForm").attr("action", "http://google.com/search");
                $("#searchSubmit").attr("name", "q");
                break;
            case "YouTube":
                $("#searchForm").attr("action", "http://youtube.com/results");
                $("#searchSubmit").attr("name", "search_query");
                break;
            case "Wikipedia":
                $("#searchForm").attr("action", "http://en.wikipedia.org/w/index.php");
                $("#searchSubmit").attr("name", "search");
                break;
        }
    }
}
