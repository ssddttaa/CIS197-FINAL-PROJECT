$(function () {
  var InternshipCollection = Backbone.Collection.extend({
    model: InternshipModel
  });
  window.InternshipCollection = InternshipCollection;
});
