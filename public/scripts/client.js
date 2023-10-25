
$(document).ready(function() {
  
  // appends all tweets to be rendered
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

  const renderTweets = function(tweets) {
    $('.tweets-container').empty();
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    });
  };
  
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then((response) => {
        renderTweets(response);
      })
      .catch((error) => console.log(error));
  };
  
  loadTweets(); // show tweets when user lands on page
  
  // Post Tweet Route
  $('#tweet-form').on('submit', (event) => {
    event.preventDefault();
    
    const tweetText = $('#tweet-text').val().trim();
    
    if (tweetText.length > 0 && tweetText.length <= 140) {
      $.post({
        method: "POST",
        url: "/tweets",
        data: $('#tweet-form').serialize(),
      })
        .then(() => {
          loadTweets();
          $('#tweet-form')[0].reset();
          $('.counter').text('140');
          $('.error').slideUp();
        });

    } else if (tweetText.length > 140) {
      $('.error p').text(`Your tweet's so packed, it's spilling its luggage! Time to repack?`);
      $('.error').slideDown(450);

      setTimeout(() => {
        $('.error').slideUp();
      }, 10000);

    } else if (tweetText.length < 1) {
      $('.error p').text(`Going for the invisible ink, huh? Let's see some of those characters!`);
      $('.error').slideDown(450);

      setTimeout(() => {
        $('.error').slideUp();
      }, 10000);
    }
  });
  
});
