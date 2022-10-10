/**
 * Retrieve parameter from request URL, matching by parameter name
 * @param target String
 * @returns {*}
 */
function getParameterByName(target) {
    // Get request URL
    let url = window.location.href;
    // Encode target parameter name to url encoding
    target = target.replace(/[\[\]]/g, "\\$&");

    // Ues regular expression to find matched parameter value
    let regex = new RegExp("[?&]" + target + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';

    // Return the decoded parameter value
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function convertMoviesIntoHyperlinks(csv_movie_string, csv_movieId_string){
    let csv_star_list = csv_movie_string.split(",");
    let csv_starId_list = csv_movieId_string.split(",");
    let result = "";

    for(let i=0; i < csv_star_list.length; ++i){
        result += "<a href=\"single-movie.html?id=" + csv_starId_list[i] + "\">";
        result += csv_star_list[i] +"</a>";
        if(i !== csv_star_list.length-1){
            result += ", ";
        }
    }
    return result;
}

function populateHTMLWithSingleStarData(resultData){
    console.log(resultData);
    let starInformationList = jQuery("#single-star-info-list");
    let htmlString = "";

    htmlString += "<h3>" + resultData["star_name"] + "</h3>";
    htmlString += "<p>Born in " + resultData["star_dob"] + "</p>";
    htmlString += "<p>Stars in " + convertMoviesIntoHyperlinks(resultData["movie_titles"], resultData["movie_ids"]) + "</p>";

    starInformationList.append(htmlString);
}

console.log('About to send GET request to SingleStarServlet');

let starId = getParameterByName('id');

jQuery.ajax({
    dataType: "json",
    method: "GET",
    url: "api/single-star?id=" + starId,
    success: (resultData) => populateHTMLWithSingleStarData(resultData),
    error: (resultData) => console.log(resultData)
});