Template.home.events({
  'submit .demo-form': function (e, tpl) {
    e.preventDefault();
    var fullName = tpl.$('.package-name').val();
    var authorName = fullName.split(':')[0];
    var packageName = fullName.split(':')[1];
    var iconPath = Meteor.absoluteUrl(`package/${fullName}`);
    tpl.$('.demo-icon').attr('src', `package/${fullName}`);
    tpl.$('.embed-code').val(`[![Meteor Icon](${iconPath})](https://atmospherejs.com/${authorName}/${packageName}})`).removeClass('hidden');
  }
});
