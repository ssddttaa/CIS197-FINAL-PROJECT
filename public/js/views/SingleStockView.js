$(function () {
  var SingleStockView = Backbone.View.extend({
    className: 'single-stock',
    template: Handlebars.compile($('#single-stock-template').html()),
    initialize: function () {
      this.listenTo(this.model, 'change', this.onChange);
    },

    onChange: function () {
      this.render();
    },

    render: function () {
      var html = this.template({symbol: this.model.get('symbol'),
                                price: this.model.get('price')});
      this.$el.html(html);
      return this;
    }
  });

  window.SingleStockView = SingleStockView;
});
