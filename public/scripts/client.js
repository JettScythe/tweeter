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
    $('#tweets-container').prepend(newTweet);
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const safeText = escape(`${tweet.content.text}`);
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
  </footer>`;
  return $tweet;
};

const createTooLongErrorElement = function() {
  let $error =
  `<span><h3 class="error">&#9888; Please shrink to my arbitrary limits lmao &#9888;</h3></span>`;
  return $error;
};

const createNoCharErrorElement = function() {
  let $error =
  `<span><h3 class="error">&#9888; Ya gotta type somethin'! &#9888;</h3></span>`;
  return $error;
};

const loadTweets = function() {
  $.get("/tweets", function(data) {
    renderTweets(data);
  });
};


$(document).ready(function() {
  $(".to-top").hide();
  loadTweets();
  $("label").toggle();
  $(".new-tweet").hide();
  $(".navDesc").click(function(event) {
    event.preventDefault();
    $("label").toggle();
    $(".new-tweet").slideToggle("slow");
    $("textarea").focus();
  });
  // check how much user has scrolled
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 150) {
      $(".to-top").show();
    } else {
      $(".to-top").hide();
    }
  });
  $(".to-top").click(function(event) {
    $("html").animate({ scrollTop: 0 }, "fast");
  });
 
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    //if tweet is all whitespace or no chars
    if ($("#tweet-text").val().trim().length <= 0) {
      $(".error").slideUp("slow");
      $(".error-area").append(createNoCharErrorElement()).slideDown("slow");
      // if tweet is longer than 140 chars
    } else if ($("#tweet-text").val().length > 140) {
      $(".error").slideUp("slow");
      $(".error-area").append(createTooLongErrorElement()).slideDown("slow");
    } else {
      $.post("/tweets", $(this).serialize()).then(function(data) {
        console.log(data);
        $(".error").slideUp("slow");
        $("#tweet-text").val("");
        $(".counter").val("140");
        loadTweets();
      });
    }
  });
});