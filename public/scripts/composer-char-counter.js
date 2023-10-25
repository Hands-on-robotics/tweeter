$(document).ready(function() {
  
  $('.new-tweet textarea').on('input', function() {
    const maxCharacters = 140;
    const $counter = $('.counter');
    const inputLength = $(this).val().length;
    const characterCounter = maxCharacters - inputLength;

    if (characterCounter < 0) {
      $counter.css('color', 'red');
    } else if (characterCounter >= 0) {
      $counter.css('color', '#545149');
    }
    $counter.text(characterCounter);
  });
});
