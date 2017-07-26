var portfolioPostsBtn = document.getElementById("show-btn");
var postsContainer = document.getElementById("posts-wrap");

//if element is present
if(postsContainer ){

    portfolioPostsBtn.addEventListener("click", function(){

        var myRequest = new XMLHttpRequest();
        //getting a number of posts and making embed stuff available
        myRequest.open('GET', 'http://localhost/guitar-player-zines/wp-json/wp/v2/posts?per_page=4&_embed');
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

        //show/hide posts
        postsContainer.classList.toggle('show-me');

        if (portfolioPostsBtn.textContent === "Show Posts") {
            portfolioPostsBtn.textContent = "Hide Posts";
        } else {
            portfolioPostsBtn.textContent = "Show Posts"
        }

    });
}

//takes the data from above
function createHtml(postsData){
    var myHtmlString = '';

    for(i=0; i < postsData.length ; i++ ){
        //featured image via registered field in functions.php
        var myImg = postsData[i].my_featured_image_src;
        //var imgLink = postsData[i]._links['wp:attachment'][0].href;
        var fullImg = myImg.replace('-260x345.jpg', '.jpg' );

        //Acf custom field (uses plugin to add acf/REST support)
        var testField = postsData[i].acf.test_field;

        myHtmlString += '<div class="col-md-12 data-wrap">';
        myHtmlString += '<div class="col-md-3"><img src="' + myImg + '" class="img-responsive" /></div>';
        myHtmlString +=  '<div class="col-md-9 pull-right">';
        myHtmlString += '<h2>' + postsData[i].title.rendered + '</h2>' + postsData[i].content.rendered + '<br /><a href="' + fullImg + '">View Full Cover</a></div>';

        console.log(fullImg);

        myHtmlString += '</div>';

        //for reference
        //myHtmlString += postsData[i]._links['wp:attachment'][0].href;

    }

    postsContainer .innerHTML = myHtmlString;

}