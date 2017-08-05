var app = {
	query: "",
	initialize() {
		$(".buttonContainer").on("click", "button.query", function() {
			app.query = $(this).text()
			app.callAPI();
		});
		$(".addGifInput button").on("click", function(event) {
			event.preventDefault();
			var text = $(".addGifInput input").val();
			if (text === "") return;
			var $button = $(`<button type="button" class="btn btn-primary query">${text}</button>`);
			$(".buttonContainer").append($button);
		});
	},
	callAPI() {
		$.ajax({
	    url: "https://api.giphy.com/v1/gifs/search?q=" +
	        this.query +
	        "&api_key=6e43cda74f874688ae4d01684a876adb&limit=10",
	    method: "GET"
		}).done(function(response) {
		    var data = response.data; // an array
		    app.buildAndDisplayStillImages(data);
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
			$thumbnail
				.append($imgStill)
				.append($imgAnimate)
				.append($caption);
			$(".imageContainer").append($thumbnail);
		}
		$(".thumbnail").on("click", function(){
			$(this).find(".imgStill").toggle();
			$(this).find(".imgAnimate").toggle();
		});
	},
};

$(app.initialize);
