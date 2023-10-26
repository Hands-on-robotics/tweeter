// $(document).ready(function() {
  
//   $('.new-tweet textarea').on('input', function() {
//     const maxCharacters = 140;
//     const counter = $('.counter');
//     const inputLength = $(this).val().length;
//     const characterCounter = maxCharacters - inputLength;

//     if (characterCounter < 0) {
//       counter.addClass('counter-error');
//     } else if (characterCounter >= 0) {
//       counter.removeClass('counter-error');
//     }
//     counter.text(characterCounter);
//   });
// });

$(document).ready(function () {
  $(".new-tweet textarea").on("input", function () {
    const maxLength = 140;
    const textArea = $(this);
    const currentLength = textArea.val().length;
    const remainingChar = maxLength - currentLength;
    const counter = textArea.parent().find(".counter");
    
    counter.text(remainingChar);

    if (remainingChar < 0) {
      counter.addClass("counter-error");
    } else {
      counter.removeClass("counter-error");
    }
  });
});
