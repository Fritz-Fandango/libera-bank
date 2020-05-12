const addButton = document.querySelector('input.add');
const emptyButton = document.querySelector('input.empty');

addButton.addEventListener('click', edit);
emptyButton.addEventListener('click', del);

function edit () {
  $('.view').hide()
  $('.edit').show().css('display', 'inline-block')
}

function cancel () {
  $('.view').show()
  $('.edit').hide()
}

function save () {
  $.ajax('/addtill', {
    method: 'PUT',
    data: {
      pennies: parseInt($('#pennies').val(), 10),
      nickles: parseInt($('#nickles').val(), 10),
      dimes: parseInt($('#dimes').val(), 10),
      quarters: parseInt($('#quarters').val(), 10)
    },
    complete: function () {
      cancel()
      location.reload()
    }
  })
}

function del () {
  $.ajax('/emptytill', {
    method: 'DELETE',
    complete: function () {
      location = '/'
    }
  })
}