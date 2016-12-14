  $(function () {

    var removeExistingViews = function () {
      if (window.searchView) {
        window.searchView.remove();
      }

      if (window.stockView) {
        window.stockView.remove();
      }

      if (window.portfolioView) {
        window.portfolioView.remove();
      }
    };

    var removeStockView = function () {
      if (window.stockView) {
        window.stockView.remove();
      }
    };

    var showingSearchView = false;

    var TickerRouter = Backbone.Router.extend({
      routes: {
        ':symbol'     :    'singleStock',
        'q/'          :    'search',
        'q/:query'    :    'search',
        ''            :    'search'
      },

      search: function (query) {
        client.clearListening();
        // client.listenForPriceUpdates(window.portfolioCollection);
        // client.listenForPriceUpdates(window.searchResultsCollection);

        // Creates the portfolio and search views, renders them,
        // and appends their elements to the #app-container element.
        // It also calls client.updateModels() so prices are up-to-date.
        // **Caution:** when you're calling .append(), make sure to pass it the
        // jQuery object for the view and not just the HTML! Passing in the HTML
        // would create a new DOM node, different from the one the View has.
        // This isn't what we want - we wouldn't be able to listen to events on it!

        var renderPortfolioAndSearch = function () {
          window.portfolioView = new window.PortfolioView({
            collection: window.portfolioCollection
          });
          window.searchView = new window.SearchView({
            collection: window.searchResultsCollection
          });
          window.searchView.render();
          window.portfolioView.render();
          $('#app-container').append(window.searchView.$el);
          $('#app-container').append(window.portfolioView.$el);

        };
        if (!showingSearchView) {
          removeStockView();
          renderPortfolioAndSearch();
          showingSearchView = true;
        }
        window.searchView.setSearchTerm(query);
        var modelsList = [];
        if (query) {
          client.searchStock (query, function (stocks, error) {
            for (var i = 0; i < stocks.length; i++) {
              var stock = stocks[i];
              var stockModel = new window.StockModel({
                price: stock.price,
                symbol: stock.symbol
              });
              modelsList.push(stockModel);
              if (i == stocks.length - 1) {
                window.searchResultsCollection.set(modelsList);
              }
            }
            if (stocks.length == 0) {
              window.searchResultsCollection.set(modelsList);
              window.searchResultsCollection.trigger('change');
            }
          });

        } else if (!query || query == '') {
          removeExistingViews();
          window.searchResultsCollection.set([]);
          window.searchView.setSearchTerm('');
          renderPortfolioAndSearch();
        }


        // TODO: Complete the rest of the search method.
        // Keep in mind that, if there is no query, then you need to set the
        // searchResultsCollection to be empty before rendering and set the search term to ''.
        // If there IS a query, you need to call client.searchStock and set the
        // searchResultsCollection to its results. Then, if the search view is already up,
        // it will auto-update to reflect the new query. Otherwise, you will need to render the
        // portfolio and search views and set the search term to the query.
        // Don't forget to update showingSearchView when you're done rendering/updating,
        // and don't forget to remove the stock view!

      },

      singleStock: function (symbol) {
        removeExistingViews();
        client.clearListening();
        var newStock = new window.StockModel({
          symbol: symbol
        });
        client.listenForPriceUpdates(newStock);
        client.updateModels();
        showingSearchView = false;
        window.stockView = new window.SingleStockView({
          model: newStock
        });
        $('#app-container').append(window.stockView.$el);

        // TODO: Complete this method.
        // Remember that you'll need to do the following:
        // * Create a StockModel with the symbol passed in as an argument.
        // * Use client.listenForPriceUpdates on this newly created model.
        // * Assign window.stockView to be a new StockView backed by the new model,
        //   and append its $el to the div with id app-container.
        // * Use client.updateModels to update the stock price, set showingSearchView,
        //   and render the new view.


      }



    });
    window.TickerRouter = TickerRouter;
  });
