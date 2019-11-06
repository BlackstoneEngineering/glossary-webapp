---
---
function select_glossary(term) {
    var glossary_info;
    for (var i=0; i<_glossary.data.length; i++) {
        if (_glossary.data[i].name == term) {
            glossary_info = _glossary.data[i];
        };
    };
    if (!glossary_info) return;

    // Display instructions if not already shown
    if($('#glossary-instructions').css('display') == 'none'){
        $('#glossary-instructions').fadeIn();
    }

    // Load terms to their divs
    var name			= glossary_info.name;
    var deffinition		= glossary_info.deffinition;
    var notes 			= glossary_info.notes;
    var cross_reference = glossary_info.crossreference;
    $("#term").html(name)
    $("#deffinition").html(deffinition)

    $("#notes").html(notes)
    $("#references").html(cross_reference)
};

var _glossary = {
	data:[
		{% for thing in site.data.update %} 
		{
			"name": "{{thing.name}}", 
			"deffinition": "{{thing.deffinition}}",
			"notes": {%if thing.deffinition == nil%}
					 	"None",
					 {%else%}
						"{{thing.notes}}", 
					 {%endif%}
			"crossreference": {%if thing.crossreference == nil%}
							 	"None",
							 {%else%}
								"{{thing.crossreference}}", 
							 {%endif%}
		},
  		{% endfor %}
 	],

	getValue: "name",

	list: {
		match: {
			enabled: true
		},
		sort:{
			enabled:true
		},
		maxNumberOfElements: 8,

		showAnimation: {
			type: "slide",
			time: 300
		},
		hideAnimation: {
			type: "slide",
			time: 300
		},
		onChooseEvent: function(){
            select_glossary($("#glossary-search").val());
		}
	},

	theme: "round"

};

$("#glossary-search").easyAutocomplete(_glossary);

// Check ?term=... and get sht done
var params = [];
var hashes = window.location.href.replace(/#.+/,'').slice(window.location.href.indexOf('?') + 1).split('&');
for(var i = 0; i < hashes.length; i++)
{
    var hash = hashes[i].split('=');
    params[hash[0]] = hash[1];
};

if (typeof params['term'] != 'undefined') {
    $("#glossary-search").val(params['term']);
    select_glossary(params['term']);
};
