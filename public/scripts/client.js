/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
// loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const newTweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(newTweet)
  }
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeText = escape(`${tweet.content.text}`)
  const newTime = timeago.format(tweet.created_at);
  let $tweet = 
  `<article class="tweet" >
  <header>
    <!-- avatar & username -->
    <div class="user">
      <span><img src="${tweet.user.avatars}"></span>
      <span>${tweet.user.name}</span>
    </div>
    <span class="handle">${tweet.user.handle}</span>
  </header>
  <!-- content of tweet -->
  <h5>${safeText}</h5>
  <footer>
    <!-- time since posted & bookmark, retweet, like icons -->
    <span class="time">${newTime}</span>
    <div class="tweet-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
    </div> 
  </footer>`
return $tweet;
}

const loadTweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
}



$(document).ready(function() {
  loadTweets();
    $("#new-tweet-form").submit(function(event) {
      event.preventDefault();
      if ($("#tweet-text").val().length <= 0) {
        alert("Ya gotta type somethin'!")
      } else if ($("#tweet-text").val().length >= 140) {
        alert("Too many characters. Please shrink to my arbitrary limits lmao")
      } else {
        $.post("/tweets", $(this).serialize()).then(function( data ) {
            $("#tweet-text").val("")
            $(".counter").val("140")
            loadTweets();
        });
      }
    });
});