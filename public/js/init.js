$(function () {
  window.client = new ClientModel();

  window.portfolioCollection = new StockCollection();
  window.searchResultsCollection = new StockCollection();

  window.router = new TickerRouter();
  Backbone.history.start({pushState: false});
  $.get("http://localhost:3000/internship/retrieve", function(data){
    for(var i = 0 ; i < data.length ; i++){
      var newModel = new StockModel(data[i]);
      window.portfolioCollection.add(newModel);
    }
    console.log("did get request");
    console.log(data);
  });
});
