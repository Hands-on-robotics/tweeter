/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Functions //

const createTweetElement = function(tweetData) {
  let $tweet = `
    <article class="tweet">
      <header class="tweet-header">
        <img src="${tweetData.user.avatars}">
        <div class="user-info">
          <div class="username">${tweetData.user.name}</div>
          <div class="user-tag">${tweetData.user.handle}</div>
        </div>
      </header>
      <p>${tweetData.content.text}</p>
      <footer>
        <span class="date template">${timeago.format(tweetData.created_at)}</span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </footer>
    </article>`;

  return $tweet;
};

const renderTweets = function(tweets) {
  tweets.forEach((tweet) => {
    $('.tweets-container').prepend(createTweetElement(tweet));
  });
};

const loadTweets = function() {
  $.ajax("/tweets", { method: "GET" })
    .then((response) => {
      renderTweets(response);
    });
};
  
loadTweets();

// Routes //

$('#tweet-form').on('submit', (event) => {
  event.preventDefault();
  const tweetText = $('#tweet-text').val();

  if (tweetText.length > 0 && tweetText.length < 140) {
    // CODE REVIEW: The form does not clear when successfully submitted
    $.post({
      method: "POST",
      url: "/tweets",
      // CODE REVIEW: 
      data: $('#tweet-form').serialize(),
    })
    .then((res) => {
        loadTweets();
        $('#tweet-form')[0].reset();
      });
  } else if (tweetText.length > 140) {
    alert('This tweet is too long to post.');
  } else if (tweetText.length < 1) {
    alert('Would you like to type something first?');
  }
});
