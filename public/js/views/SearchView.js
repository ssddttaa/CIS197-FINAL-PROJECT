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

    // Debounce delays a function from actually running until it hasn't been called for X milliseconds.
    // This is super handy for functions like search that are called on keypress, since you wait until
    // the user has typed in their actual query before hitting the server.
    search: _.debounce(function () {
      window.router.navigate('q/' + $('.search').val(), {trigger : true});
    }, 200),

    // Set the search term manually and focus the search input.
    setSearchTerm: function (term) {
      console.log(term);
      this.$el.find('.search').val(term).focus();
    },

    addStock: function (e) {
      console.log(window.portfolioCollection);
      if (!window.portfolioCollection.findWhere({name: $('#companyName').val()})) {
        var newModel = new window.StockModel({
          name: $('#companyName').val(),
          link: $('#companyLink').val(),
          status: $('#companyStatus').find(":selected").val()
        });
        window.portfolioCollection.add(newModel);
      }
    }

  });

  window.SearchView = SearchView;
});
