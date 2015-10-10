Template.home.events({
  'submit .demo': function (e, tpl) {
    e.preventDefault();
    var packageName = tpl.$('.package-name').val();
    tpl.$('.demo-icon').attr('src', `package/${packageName}`);
    tpl.$('.embed-code').attr('value', `[![Build Status](package/${packageName})](package/${packageName})`).removeClass('hidden');
  }
})
