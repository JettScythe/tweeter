$(document).ready(function() {
  $("textarea").on('input', function() {
    const totalChars = $(this).val().length;
    const counter = $(this).parent().children('div').children('output');
    const remaining = 140 - totalChars;
    if (remaining <= 0) {
      counter.text(remaining).css('color', 'red')
    }
    if (remaining > 0) {
      counter.text(remaining).css('color', '#545149')
    }
  })
});