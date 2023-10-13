$(document).ready(function() {
  const $textarea = $('.new-tweet textarea');

  $textarea.on('input', function() {
    const $counter = $('.counter');
    const inputLength = $(this).val().length;
    const maxCharacters = 140;
    const characterCounter = maxCharacters - inputLength;

    if (characterCounter < 0) {
      $counter.css('color', 'red');
    } else if (characterCounter >= 0) {
      $counter.css('color', '#545149');
    }
    $counter.text(characterCounter);
  });
});
