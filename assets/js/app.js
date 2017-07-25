var app = {
	query: "",
	initialize() {
		$("button").on("click", function(){
			console.log(this);
			app.query = $(this).text()
			app.callAPI();
		});
	},
	callAPI() {
		$.ajax({
	    url: "http://api.giphy.com/v1/gifs/search?q=" +
	        this.query +
	        "&api_key=6e43cda74f874688ae4d01684a876adb&limit=2",
	    method: "GET"
		}).done(function(response) {
		    var data = response.data; // an array
		    console.log(data);
		    app.buildAndDisplayStillImages(data);
		    // this.buildandHideAnimatedImages();
		});
	},
	buildAndDisplayStillImages(data) {
		var query = this.query;
		$(".imageContainer").empty();
		for (imageIndex in data) {
			var image = data[imageIndex];
			var altText = image.slug.split("-");
			altText.pop();
			altText = altText.join(" ");
			var $thumbnail = $(`<div class="thumbnail inline-thumbs"></div>`);
			var $imgStill = $(`<img src="${image.images.fixed_height_still.url}" `
				+ `alt="still ${altText}" title="still: ${altText}" height="200" class="imgStill">`);
			var $imgAnimate = $(`<img src="${image.images.fixed_height.url}" `
				+ `alt="animated: ${altText}" title="animated ${altText}" height="200" style="display: none;" class="imgAnimate">`);
			var $caption = $(`<div class="caption"><p>Rating: ${image.rating.toUpperCase()}</p></div>`);
			// $imgAnimate.hide();
			$thumbnail
				.append($imgStill)
				.append($imgAnimate)
				.append($caption);
			$(".imageContainer").append($thumbnail);
		}
		$(".thumbnail").on("click", function(){
			console.log("You clicked a thumbnail");
			$(this).find(".imgStill").toggle();
			$(this).find(".imgAnimate").toggle();
		});
	},
};

$(app.initialize);

/*
var query = "macaw";
$.ajax({
    url: "http://api.giphy.com/v1/gifs/search?q=" +
        query +
        "&api_key=e4fb7f112ada4534a0c3471353e951c4&limit=10",
    method: "GET"
}).done(function(response) {
	// var data = response.data[0];
    // console.log([data.rating, data.images.fixed_height_still.url, data.images.fixed_height.url]);
    var data = response.data;
    console.log(data);
    $(".thumbnail").each(function(index){
    	var thisData = data[index];
    	$(this).find("img")
    		.attr("src", thisData.images.fixed_height_still.url)
    		.attr("alt", thisData.tags)
    		.attr("data-animate", thisData.images.fixed_height.url)
    		.attr("data-still", thisData.images.fixed_height_still.url);
    	$(this).find(".caption").html("Rating: " + thisData.rating.toUpperCase());
    });
});

$("img").on("click", function(){
	var animateLink = $(this).data("animate");
	var stillLink = $(this).data("still");
	if ($(this).attr("src") === stillLink) $(this).attr("src", animateLink);
	else $(this).attr("src", stillLink)
});
*/
