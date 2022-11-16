$(document).ready(function () {
  getToDoList()

  $('#btnInSearchBar').click(function (e) {
    e.preventDefault()

    let strName = $('#txtName').val()
    if ($(this).hasClass('btn-update')) {
      let strId = $(this).prop('href')
      if (strId == null || strName == null) {
        alert('請輸入欲搜尋的To do。')
        return
      }

      updateToDo(strId, strName)
      $(this)
        .removeProp('href')
        .removeClass('btn-outline-primary')
        .removeClass('btn-update')
        .addClass('btn-outline-success')
        .text('Create')
      return $('#txtName').val('')
    }

    if ($(this).hasClass('btn-search')) {
      if (strName == null) {
        alert('請輸入欲搜尋的To do。')
        return
      }

      getToDoList(strName)
      return $('#txtName').val('')
    }

    createToDo(strName)
    $('#txtName').val('')
  })

  $('#ulALinkList a.dropdown-item').click(function (e) {
    e.preventDefault()

    $('#btnInSearchBar')
      .removeProp('href')
      .removeClass('btn-update')
      .removeClass('btn-outline-primary')

    if ($(this).hasClass('aLink-create')) {
      $('#btnInSearchBar')
        .removeClass('btn-outline-secondary')
        .removeClass('btn-search')
        .addClass('btn-outline-success')
        .text('Create')
      return
    }
    $('#btnInSearchBar')
      .removeClass('btn-outline-success')
      .addClass('btn-outline-secondary')
      .addClass('btn-search')
      .text('Search')
  })

  $(document).on('click', 'input[id*=ckbToDo]', function (e) {
    e.preventDefault()

    let strId = $(this).prop('id').split('_')[1]
    let boolIsChecked = $(this).is(':checked')
    sessionStorage.setItem(
      'divToDoListInfo',
      JSON.stringify({
        id: strId,
        checked: boolIsChecked,
      })
    )
    setIsCheckedOfToDo(strId, boolIsChecked)
  })

  $(document).on('click', 'button[id*=btnUpdate]', function (e) {
    e.preventDefault()

    $('button[id*=btnUpdate]').prop('disabled', false)
    $(this).prop('disabled', true)

    let strId = $(this).prop('id').split('_')[1]

    $('#btnInSearchBar')
      .prop('href', strId)
      .removeClass('btn-outline-success')
      .removeClass('btn-outline-secondary')
      .removeClass('btn-search')
      .addClass('btn-outline-primary')
      .addClass('btn-update')
      .text('Update')

    $('#txtName').val($(this).siblings('label').text().trim())
  })

  $(document).on('click', 'button[id*=btnDelete]', function (e) {
    e.preventDefault()

    let strId = $(this).prop('id').split('_')[1]
    deleteToDo(strId)
  })
})
