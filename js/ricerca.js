$(document).ready(function() {

// Stolen from jQuery API Documentation, jQuery.getScript() entry
jQuery.MinimoGetScript = function( url, options ) {
    options = $.extend( options || {}, {
        dataType: "script",
        cache: true,
        url: url,
        async: false
    });

    return jQuery.ajax( options );
};

// Load configuration file
$.MinimoGetScript("js/ricerca.config.js");

// Global variables
var ricercaCurrentProvider = "none"
var ricercaFirstRun = 0;

// Constants
var list_columns = Object.freeze({
    COMMAND: 0,
    NAME: 1,
    FORM_ACTION: 2,
    INPUT_NAME: 3,
    SIZE: 4
});

ricercaForm = $("#searchForm");
ricercaUserInput = $("#searchInput");
ricercaSubmitInput = $("#searchSubmit");
ricercaIcon = $("#searchIcon");

// Main
function RicercaMain() {
    ChangeProvider(ricercaDefaultProvider);

    var list_length = ricercaProvidersList.length;

    // Build regex string with every search provider. We'll end with something
    // like (!g)|(!y)|(!w)
    var i;
    for (i = 0; i < list_length; i += list_columns.SIZE) {
        if (i == 0)
            g_regex_list = "(" + ricercaProvidersList[i] + ")";   // for the first or only provider
        if (i > 0)
            g_regex_list = g_regex_list.concat("|(" + ricercaProvidersList[i] + ")"); // if there's another provider, add it to the pattern
    }

    // Every time there's a keypress, check for new provider
    ricercaUserInput.keyup(function() {
        var user_string = $(this).val();
        var regex_pattern = new RegExp(g_regex_list);

        if (regex_pattern.test(user_string)) {
            keyword = regex_pattern.exec(user_string);
            if (keyword != null) {
                for (i = 0; i < list_length; i += 1) {
                    if (keyword[0] == ricercaProvidersList[i * list_columns.SIZE])
                        ChangeProvider(ricercaProvidersList[(i * list_columns.SIZE) + list_columns.NAME]);
                }
            }
        } else {
            ChangeProvider(ricercaDefaultProvider);
        }
    });

    ricercaForm.submit(function(e) {
    // Submitting the form, avoiding default behavior
        e.preventDefault();

        var user_string = ricercaUserInput.val();
        var regex_pattern = new RegExp(g_regex_list, "g");

        if (regex_pattern.test(user_string)) {
            new_string = user_string.replace(regex_pattern, "");  // clean the string and
            new_string = new_string.replace(/^(\s)/, ""); // remove first whitespace character (if it's found)
        } else {
            new_string = user_string;
        }

        ricercaSubmitInput.attr("value", new_string);
        ricercaForm[0].submit();
    });
}

function ChangeProvider(new_provider) {
    if (new_provider != ricercaCurrentProvider) {
        ricercaCurrentProvider = new_provider;

        var fade_time;
    	if (ricercaFirstRun == 0) {
            fade_time = 0;
            ricercaFirstRun = 1;
        } else {
            fade_time = 450;
        }

        var list_length = ricercaProvidersList.length

        var i;
        for (i = 0; i < list_length; i += 1) {
            if (ricercaCurrentProvider == ricercaProvidersList[(i * list_columns.SIZE) + list_columns.NAME]) {
                ricercaIcon.fadeOut(fade_time, function() {
                    //$(this).attr("src", "http://g.etfv.co/" + searchProviders_list[(i * 4) + 2]);
                    $(this).attr("src", "images/icons/" + ricercaCurrentProvider + ".ico");
                    $(this).fadeIn(fade_time);
                });

                ricercaForm.attr("action", ricercaProvidersList[(i * list_columns.SIZE) + list_columns.FORM_ACTION]);
                ricercaSubmitInput.attr("name", ricercaProvidersList[(i * list_columns.SIZE) + list_columns.INPUT_NAME]);
            }
        }
    }
}

RicercaMain();

});
