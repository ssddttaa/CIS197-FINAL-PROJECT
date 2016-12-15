$(function () {
  var SearchView = Backbone.View.extend({
    className: 'search-container',
    $el      : $('#app-container'),
    initialize: function () {
      this.searchBarTemplate = Handlebars.compile($('#search-bar-template').html());
      this.searchResultsTemplate = Handlebars.compile($('#search-results-template').html());
      this.listenTo(this.collection, 'change', this.onChange);
    },

    events: {
      keyup : 'search',
      'click .add-stock' : 'addStock'
    },

    onChange: function () {
      this.renderResults();
    },

    render: function () {
      var searchBarHTML = this.searchBarTemplate();
      // this.$el.append(searchBarHTML);
      this.renderResults();
      return this.$el;
    },

    renderResults: function () {
      this.$el.find('.search-results').remove();
      var resultsHTML = this.searchResultsTemplate({results: this.collection.toJSON()});
      this.$el.append(resultsHTML);
      return this;
    },

    addStock: function (e) {
      console.log(window.internshipCollection);
      if (!window.internshipCollection.findWhere({name: $('#companyName').val()})) {
        var newModel = new window.InternshipModel({
          name: $('#companyName').val(),
          link: $('#companyLink').val(),
          status: $('#companyStatus').find(":selected").val()
        });
        window.internshipCollection.add(newModel);
      }
    }

  });

  window.SearchView = SearchView;
});
