(function(window, document, undefined) {
  _.templateSettings = {
    escape: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
  };

  var coursesTemplate = document.getElementsByClassName('courses-template')[0];
  var renderCourses = _.template(coursesTemplate.innerHTML);
  var results = document.getElementsByClassName('results')[0];

  var input = document.getElementsByTagName('input')[0];
  var prevQuery = null;

  input.addEventListener('keyup', _.debounce(function(event) {
    var query = input.value;

    // only update results if search string changed
    if (query === prevQuery) {
      return;
    }

    prevQuery = query;

    if (!query) {
      // clear results
      results.innerHTML = '';
      return;
    }

    // query for new results
    var request = new XMLHttpRequest();
    request.addEventListener('load', function() {
      if (request.status === 200) {
        var courses = JSON.parse(request.responseText);
        results.innerHTML = renderCourses({courses: courses});
      }
    });

    request.open('GET', '/search?query=' + encodeURIComponent(query), true);
    request.send();
  }, 200));
})(this, this.document);
