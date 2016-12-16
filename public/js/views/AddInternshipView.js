$(function () {
  var InternshipView = Backbone.View.extend({
    className: 'internship-container',
    $el: $('#app-container'),
    initialize: function () {
      this.addInternshipTemplate = Handlebars.compile($('#add-internship-template').html());
      this.listenTo(this.collection, 'change', this.onChange);
    },

    events: {
      'click .add-Internship': 'addInternship'
    },

    onChange: function () {
      this.renderResults();
    },

    render: function () {
      this.renderResults();
      return this.$el;
    },

    renderResults: function () {
      this.$el.find('.add-internship').remove();
      var resultsHTML = this.addInternshipTemplate({results: this.collection.toJSON()});
      this.$el.append(resultsHTML);
      return this;
    },

    addInternship: function (e) {
      var alertString = '';
      if (!$('#companyName').val()) {
        alertString = alertString + 'Please enter a company name.\n';
      }
      if (!$('#companyLink').val()) {
        alertString = alertString + 'Please enter a URL. \n';
      } else {
        //This regex taken from : http://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
        var httpMatcher = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        var regex = new RegExp(httpMatcher);

        if (!$('#companyLink').val().match(regex)) {
          alertString = alertString + 'Please enter a URL of the form http://www.test.extension \n';
        }
      }

      if (alertString !== '') {
        $('#alert').html('<div class="alert alert-success alert-dismissible">' +
            '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
            '<strong>' + alertString +
            '</div>');
        // alert(alertString);
        return;
      }

      console.log(window.internshipCollection);
      if (!window.internshipCollection.findWhere({name: $('#companyName').val()})) {
        var newModel = new window.InternshipModel({
          name: $('#companyName').val(),
          link: $('#companyLink').val(),
          status: $('#companyStatus').find(':selected').val()
        });
        window.internshipCollection.add(newModel);
      }
    }

  });

  window.InternshipView = InternshipView;
});
