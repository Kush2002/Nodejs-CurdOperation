const hideAlert = () => {
  const el = $('.alert');
  if (el) el.remove();
};

export const showAlert = (type, msg) => {
  hideAlert();

  const markup = `<div class="alert alert-success ${type}">${msg}</div>`;
  $('body').prepend(markup);

  setTimeout(hideAlert, 1000);
};
