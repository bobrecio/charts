function Read() {
    //alert('Reading...');

    var listName = getQSParam("listname") || "DummyData";
    var url = _spPageContextInfo.webAbsoluteUrl;

    var listPath = url + "/Lists/" + listName;
    var listLink = "Link to list: <a href='" + listPath + "'>" + listPath + "</a>";

    $("#listURL").html(listLink);

    getListItems(listName, url, function (data) {
        var items = data.d.results;

        // Add all the new items
        for (var i = 0; i < items.length; i++) {
            alert(items[i].Title + ":" + items[i].Id);
        }
    }, function (data) {
        alert("Ooops, an error occured. Please try again");
    });
}

function getListItems(listName, siteurl, success, failure) {
    $.ajax({
        url: siteurl + "/_api/web/lists/getbytitle('" + listName + "')/items",
        method: "GET",
        headers: {
            "Accept": "application/json; odata=verbose"
        },
        success: function (data) {
            //alert("Success");
            onSuccess(data.d.results);
        },
        error: function (data) {
            alert("Oh no! It failed.");
            onFailure(data);
        }
    });
}

function onSuccess(json) {

    var thisTable = "<table id='dataTable'>";
    var thisRow = "";
    var thisCell = "";

    // create the header row
    thisTable += "<tr>";
    for (var key in json[0]) {

        if (typeof (json[0][key]) != 'object') {
            thisTable += "<th>" + key + "</th>";
        }

    }
    thisTable += "</tr>";

    // fill the cells
    for (var i = 0; i < json.length; i++) {
        // ref: Object.keys[json[i]]
        console.log(json[i]);

        thisRow = "<tr>";

        for (var key in json[i]) {
            if (typeof (json[i][key]) != 'object') {
                thisRow += "<td>" + json[i][key] + "</td>";
            }
        }

        thisRow += "</tr>";
        thisTable += thisRow;
    }
    thisTable += "</table>";

    $("#dataArea").html(thisTable);
}

function getQSParam(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&amp;");
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}