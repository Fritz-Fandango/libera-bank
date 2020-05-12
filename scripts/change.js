function makeChange () {

  $.ajax('/makechange', {
    method: 'PUT',
    data: {
      amount: $('#deposit').val()
    },
    complete: function () {
      cancel()
      location.reload()
    }
  })
}
