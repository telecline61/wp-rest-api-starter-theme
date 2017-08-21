var postsContainer = document.getElementById("posts-wrap");
var magizineYear = document.getElementById("theYear");
var postOrder = document.getElementById("myOrder");

//if element is present
if(postsContainer ){

    //on page load display the data with default view
    displayOrder();

    //listeners for display options
    postOrder.addEventListener("change", displayOrder);
    magizineYear.addEventListener("change", displayOrder);


    function displayOrder() {

        var myRequest = new XMLHttpRequest();

        //vars for the post filters
        var theYear =   magizineYear.options[magizineYear.selectedIndex].value;
        var theOrder =  postOrder.options[postOrder.selectedIndex].value;
        var theUrl = 'http://christiancline.com/wp-api-testing/wp-json/wp/v2/posts?categories='+ theYear +'&per_page=100&order='+ theOrder +'&_embed';

        //getting a number of posts and making embed stuff available
        myRequest.open('GET',theUrl);
        myRequest.onload = function(){

            if(myRequest.status >= 200 && myRequest.status < 400){
                var data = JSON.parse(myRequest.responseText);

                //run function for the html
                createHtml(data);

            } else {
                console.log("we connected to the server, but it returned an error");
            }
        };

        myRequest.onerror = function(){
            console.log("connection error");
        };

        myRequest.send();
    }
}

//takes the data from above
function createHtml(postsData){

    var myHtmlString = '';

    for(i=0; i < postsData.length ; i++ ){

        //featured image via field registered in functions.php
        var myImg = postsData[i].my_featured_image_src;

        //get the full image for the modal
        var fullImg = myImg.replace('-260x325.jpg', '.jpg' );

        //Acf custom field (uses plugin to add acf/REST support)
        //var testField = postsData[i].acf.test_field;

        myHtmlString += '<div class="col-md-12 data-wrap">';
        myHtmlString += '<div class="col-md-3 img-wrap"><a href="#" data-toggle="modal" data-target="#myModal'+[i]+'"><img src="' + myImg + '" class="img-responsive" /></a></div>';
        myHtmlString +=  '<div class="col-md-9 copy-section">';
        myHtmlString += '<h2 class="mag-title">' + postsData[i].title.rendered + '</h2>' + postsData[i].content.rendered + '<div id="myModal'+[i]+'" class="modal fade"><div class="modal-dialog"><div class="modal-content"><img src="'+ fullImg +'" class="img-responsive" /><div class="modal-body"><img src=""/></div></div></div></div></div>';
        myHtmlString += '</div><div class="clearfix"></div>';
    }

    postsContainer .innerHTML = myHtmlString;

}