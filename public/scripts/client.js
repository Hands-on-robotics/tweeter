/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Functions //
$(document).ready(function() {
  const createTweetElement = function(tweetData) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
    const $tweet = `
    <article class="tweet">
    <header class="tweet-header">
    <img src="${escape(tweetData.user.avatars)}">
    <div class="user-info">
    <div class="username">${escape(tweetData.user.name)}</div>
    <div class="user-tag">${escape(tweetData.user.handle)}</div>
    </div>
    </header>
    <p class="tweet-text">${escape(tweetData.content.text)}</p>
    <footer>
    <span class="date template">${timeago.format(tweetData.created_at)}</span>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </footer>
    </article>`;
    
    return $tweet;
  };
  
  // CODE REVIEW: best practices for preventing code injection
  const renderTweets = function(tweets) {
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
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
  
  // post tweet
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    $('.error');
    
    const tweetText = $('#tweet-text').val();
    
    if (tweetText.length > 0 && tweetText.length < 140) {
      // CODE REVIEW: The form does not clear when successfully submitted
      $.post({
        method: "POST",
        url: "/tweets",
        data: $('#tweet-form').serialize(),
      })
      .then((res) => {
        loadTweets();
        $('#tweet-form')[0].reset();
        $('.error').slideUp();
        });
    } else if (tweetText.length > 140) {
      $('.error p').text('This tweet is too long to post.');
      $('.error').slideDown(450);
    } else if (tweetText.length < 1) {
      $('.error p').text('Would you like to type something first?');
      $('.error').slideDown(450);
    }
  });
  
});