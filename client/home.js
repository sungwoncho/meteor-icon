Template.home.onRendered(function () {
  $('.embed-code').hide();
});

Template.home.events({
  'submit .demo-form': function (e, tpl) {
    e.preventDefault();
    var fullName = tpl.$('.package-name').val();
    var iconPath = Meteor.absoluteUrl(`package/${fullName}`);
    tpl.$('.demo-icon').attr('src', iconPath);
    tpl.$('.embed-code').val(`[![Meteor Icon](${iconPath})](https://\
atmospherejs.com/${fullName.replace(/\:/, '/')})`).show();
  },
  'click .embed-code': function (e, tpl) {
    tpl.$('.embed-code').select();
  }
});
