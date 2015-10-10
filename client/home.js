Template.home.events({
  'submit .demo': function (e, tpl) {
    e.preventDefault();
    var packageFullName = tpl.$('.package-name').val();
    var authorName = packageFullName.split(':')[0]
    var packageName = packageFullName.split(':')[1]
    tpl.$('.demo-icon').attr('src', `package/${packageFullName}`);
    tpl.$('.embed-code').attr('value', `[![Meteor Icon](package/${packageName})](https://atmospherejs.com/${authorName}/${packageName}})`).removeClass('hidden');
  }
});
