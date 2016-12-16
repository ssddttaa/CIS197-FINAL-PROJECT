$(function () {
  window.internshipCollection = new InternshipCollection();

  Backbone.history.start({pushState: false});
  $.get('http://localhost:3000/internship/retrieve', function (data) {
    for (var i = 0; i < data.length; i++) {
      var newModel = new InternshipModel(data[i]);
      window.internshipCollection.add(newModel);
    }
    console.log('did get request');
    console.log(data);
  });

  window.internshipView = new window.InternshipsView({
    collection: window.internshipCollection
  });
  window.addInternshipView = new window.InternshipView({
    collection: window.internshipCollection
  });
  window.addInternshipView.render();
  window.internshipView.render();

  $('#app-container').append(window.addInternshipView.$el);
  $('#app-container').append(window.internshipView.$el);
});
