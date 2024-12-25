// подсветка элементов навигации при клике
$(document).ready(function() {
  function activateItem(element) {
      $('.list-group-item').removeClass('active');
      $(element).addClass('active');
  }

  $('.list-group').on('click', '.list-group-item', function() {
      activateItem(this);
  });

  $('.list-group-item:first').addClass('active');
});

// динамическая смена контента в main-content блоке
$(document).ready(function() {
  const navList = $('#nav-list');
  const contentIframe = $('#content-iframe');

  navList.on('click', 'li', function(event) {
      const contentId = $(this).attr('id');
      loadContent(contentId);
  });

  function loadContent(contentId) {
      contentIframe.attr('src', `Wiki_Work/Web-проектирование/${contentId}.html`);
  }

  loadContent('intro');
});