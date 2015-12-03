function getEmbedCode(fullName, iconPath) {
  var base = `[![Meteor Icon](${iconPath})](https://atmospherejs.com/`;
  if (fullName.split(':')[1]) {
    return base.concat(`${fullName.replace(/\:/, '/')}`);
  } else {
    return base.concat(`meteor/${fullName.split(':')[0]})`);
  }
}

Template.home.onRendered(function () {
  $('.embed-code').hide();
});

Template.home.events({
  'submit .demo-form': function (e, tpl) {
    e.preventDefault();
    var fullName = tpl.$('.package-name').val();
    var iconPath = Meteor.absoluteUrl(`package/${fullName}`);
    tpl.$('.demo-icon').attr('src', iconPath);
    tpl.$('.embed-code').val(getEmbedCode(fullName, iconPath)).show();
  },
  'click .embed-code': function (e, tpl) {
    tpl.$('.embed-code').select();
  }
});
