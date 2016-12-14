$(function () {
  var PortfolioView = Backbone.View.extend({
    className: 'portfolio-container',
    $el       : $('#app-container'),
    template: Handlebars.compile($('#portfolio-template').html()),
    initialize: function () {
      this.listenTo(this.collection, 'add', this.onChange);
      this.listenTo(this.collection, 'remove', this.onChange);
      this.listenTo(this.collection, 'change', this.onChange);
    },

    events: {
      'click .delete-stock' : 'deleteStock'
    },

    onChange: function () {
      var jsonCollection = {
        "companies" : this.collection.toJSON()
      };
      $.post("http://localhost:3000/internship/update", {
          internships : jsonCollection
      });
      this.render();
    },

    render: function () {
      var html = this.template({stocks: this.collection.toJSON()});
      this.$el.html(html);
      return this;
    },

    deleteStock: function (e) {
      this.collection.remove(this.collection.where({name: $(e.target).attr('symbol')}));
    }

  });

  window.PortfolioView = PortfolioView;
});
