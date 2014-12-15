/*
 *  Ricerca Homepage
 *
 *  A little explanation on how this works:
 *    The form (searchForm) has 2 inputs: 1) searchInput, where the user writes
 *    his query, and 2) searchSubmit, a hidden input which contains the cleaned
 *    string without bangs.
 *    When processing the form, searchInput is ignored since it contains
 *    characters unneeded for the user's query and the string stored in
 *    searchSubmit is finally sent.
 *
 *  There may exist better ways for achieving this, but I'm no professional
 *  coder (sorry for spaghetti code) and it seems to work without problems (at
 *  least for me).
 */

$(document).ready(function() {
    /* -- BEGIN: User Configuration -- */

    // Search providers list
    // Command, Provider Name,  Form Action,                            Input name,
    searchProviders_list = [
        "!d",   "DuckDuckGo",   "https://www.duckduckgo.com",           "q",
        "!g",   "Google",       "https://www.google.com/search",        "q",
        "!w",   "Wikipedia",    "http://en.wikipedia.org/w/index.php",  "search",
        "!y",   "YouTube",      "https://www.youtube.com/results",      "search_query"
    ];

    // Default provider
    searchProviders_default = "Google";

    /* -- END: User Configuration -- */

    // Initialize
    g_current_provider = "none";
    g_provider_init = 0;

    changeProvider(searchProviders_default);

    // Build regex string with every search provider. We'll end with something
    // like (!g)|(!y)|(!w)
    var i = 0;
    for (i = 0; i < searchProviders_list.length; i += 4) {
        if (i == 0)
            g_regex_list = "(" + searchProviders_list[i] + ")";   // for the first or only provider

        if (i > 0)
            g_regex_list = g_regex_list.concat("|(" + searchProviders_list[i] + ")"); // if there's another provider, add it to the pattern
    }

    // Every time there's a keypress, check for new provider
    $("#searchInput").keyup(function() {
        var user_string = $(this).val();
        var regex_pattern = new RegExp(g_regex_list);

        if (regex_pattern.test(user_string)) {
            keyword = regex_pattern.exec(user_string);
            if (keyword != null) {
                for (i = 0; i < searchProviders_list.length; i += 1) {
                    if (keyword[0] == searchProviders_list[i * 4])
                        changeProvider(searchProviders_list[(i * 4) + 1]);
                }
            }
        } else {
            changeProvider(searchProviders_default);
        }
    });

    $("#searchForm").submit(function(e) {
    // Submitting the form, avoiding default behavior
        e.preventDefault();

        var user_string = $("#searchInput").val();
        var regex_pattern = new RegExp(g_regex_list, "g");

        if (regex_pattern.test(user_string)) {
            new_string = user_string.replace(regex_pattern, "");  // clean the string and
            new_string = new_string.replace(/^(\s)/, ""); // remove first whitespace character (if it's found)
        } else {
            new_string = user_string;
        }

        $("#searchSubmit").attr("value", new_string);
        $("#searchForm")[0].submit();
    });

});

function changeProvider(new_provider) {
    if (new_provider != g_current_provider) {
        g_current_provider = new_provider;
        //console.log("New provider: " + g_current_provider);
		if (g_provider_init == 0) {fade_time = 0; g_provider_init = 1;} else {fade_time = 450;}

        for (i = 0; i < searchProviders_list.length; i += 1) {
            if (g_current_provider == searchProviders_list[(i * 4) + 1]) {
                $("#searchIcon").fadeOut(fade_time, function() {
                    //$(this).attr("src", "http://g.etfv.co/" + searchProviders_list[(i * 4) + 2]);
                    $(this).attr("src", "images/icons/" + g_current_provider + ".ico");
                    $(this).fadeIn(fade_time);
                });

                $("#searchForm").attr("action", searchProviders_list[(i * 4) + 2]);
                $("#searchSubmit").attr("name", searchProviders_list[(i * 4) + 3]);
            }
        }
    }
}
