Template.home.events({
  'submit .demo-form': function (e, tpl) {
    e.preventDefault();
    var fullName = tpl.$('.package-name').val();
    var iconPath = Meteor.absoluteUrl(`package/${fullName}`);
    tpl.$('.demo-icon').attr('src', iconPath);
    var embedCode = `[![Meteor Icon](${iconPath})](https://atmospherejs.com/\
${fullName.split(':')[0]}/${fullName.split(':')[1]})`;
    tpl.$('.embed-code').val(embedCode).removeClass('hidden');
  },
  'click .embed-code': function (e, tpl) {
    tpl.$('.embed-code').select();
  }
});
