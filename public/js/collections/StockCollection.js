$(function () {
  var StockCollection = Backbone.Collection.extend({
    model : StockModel
  });
  window.StockCollection = StockCollection;
});
