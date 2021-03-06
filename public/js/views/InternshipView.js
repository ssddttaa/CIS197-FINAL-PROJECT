$(function () {
  var InternshipsView = Backbone.View.extend({
    className: 'internship-container',
    $el: $('#app-container'),
    template: Handlebars.compile($('#internship-template').html()),
    initialize: function () {
      this.listenTo(this.collection, 'add', this.onChange);
      this.listenTo(this.collection, 'remove', this.onChange);
      this.listenTo(this.collection, 'change', this.onChange);
    },

    events: {
      'click .delete-internship': 'deleteInternship',
      'change .company-status': 'changeInternshipStatus'
    },

    onChange: function () {
      var jsonCollection = {
        companies: this.collection.toJSON()
      };
      $.post('http://localhost:3000/internship/update', {
        internships: jsonCollection
      });
      this.render();
    },

    render: function () {
      var html = this.template({internships: this.collection.toJSON()});
      this.$el.html(html);
      setStatuses();
      return this;
    },

    deleteInternship: function (e) {
      this.collection.remove(this.collection.where({name: $(e.target).attr('company-name')}));
    },

    changeInternshipStatus: function (e) {
      var newInternship = new window.InternshipModel({
        name: $(e.target).parent().parent().find('td').eq(0).html(),
        link: $(e.target).parent().parent().find('a').eq(0).attr('href'),
        status: $(e.target).find('option:selected').eq(0).text()
      });

      this.collection.remove(this.collection.where({name: $(e.target).parent().parent().find('button').attr('company-name')}));
      this.collection.add([newInternship]);
    }

  });

  window.InternshipsView = InternshipsView;
});

var setStatuses = function () {
  var renderedInternships = $(document).find('select');
  for (var i = 0; i < renderedInternships.length; i++) {
    if ($(renderedInternships[i]).data('selected') == 'Accepted') {
      console.log('accepted');
      $(renderedInternships[i]).find('.accepted').eq(0).attr('selected', 'selected');
      $(renderedInternships[i]).parent().parent().addClass('accepted-row');
    } else if ($(renderedInternships[i]).data('selected') == 'Pending') {
      console.log('pending');
      $(renderedInternships[i]).find('.pending').eq(0).attr('selected', 'selected');
      $(renderedInternships[i]).parent().parent().addClass('pending-row');
    } else if ($(renderedInternships[i]).data('selected') == 'Rejected') {
      console.log('rejected');
      $(renderedInternships[i]).find('.rejected').eq(0).attr('selected', 'selected');
      $(renderedInternships[i]).parent().parent().addClass('rejected-row');
    }
  }
  console.log('setting statuses');
  console.log($('#logout'));
  $('#logout').click(function () {
    console.log('clicking tho');
    window.location.href = 'http://localhost:3000/login/logout';
  });
};
