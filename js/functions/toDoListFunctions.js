function getToDoList(strName = null) {
  let objPostData = { name: strName }

  $.ajax({
    url: `${JAVA_SERVICE_DOMAIN}/getToDoList`,
    method: METHOD_POST,
    contentType: APPLICATION_JSON,
    // dataType: DATA_TYPE_JSON,
    data: JSON.stringify(objPostData),
    success: function (objToDoRes) {
      let { statusCode, message, toDoList } = objToDoRes
      $('#divToDoList').empty()

      if (statusCode === '500' || message === '發生錯誤，請再嘗試。') {
        alert('發生錯誤，請再嘗試。')
        $('#divToDoList').append('發生錯誤，請再嘗試。')
      } else if (!toDoList || !toDoList.length) {
        $('#divToDoList').append(emptyMessageOfList)
      } else {
        $('#divToDoList').append(`
            <ul class="list-group"></ul>
          `)
        for (toDo of toDoList) {
          $('#divToDoList .list-group').append(`
              <li class="list-group-item d-flex align-items-center gap-1">
                <input class="form-check-input me-1 ckbToDo_${toDo.id}" 
                  type="checkbox" 
                  id="ckbToDo_${toDo.id}"
                  ${toDo.isChecked ? 'checked' : ''} />
                <label class="form-check-label align-middle" for="firstCheckbox">
                  ${toDo.name}
                </label>
                <button id="btnUpdate_${
                  toDo.id
                }" class="btn btn-primary btn-sm ms-auto">
                  Update
                </button>
                <button id="btnDelete_${
                  toDo.id
                }" class="btn btn-danger btn-sm ms-1">
                  Delete
                </button>
              </li>
                `)
        }
      }
    },
    error: function (msg) {
      console.log(msg)
      alert(errorMessageOfAjax)
    },
  })
}

function createToDo(strName) {
  let objPostData = { name: strName }

  $.ajax({
    url: `${JAVA_SERVICE_DOMAIN}/createToDo`,
    method: METHOD_POST,
    contentType: APPLICATION_JSON,
    dataType: DATA_TYPE_JSON,
    data: JSON.stringify(objPostData),
    success: function (objToDoRes) {
      let { statusCode, message, toDoList } = objToDoRes
      $('#divToDoList').empty()

      if (statusCode === '400' || message === '必要參數缺失，請再嘗試。') {
        alert('必要參數缺失，請再嘗試。')
        $('#divToDoList').append('必要參數缺失，請再嘗試。')
      } else if (statusCode === '500' || message === '發生錯誤，請再嘗試。') {
        alert('發生錯誤，請再嘗試。')
        $('#divToDoList').append('發生錯誤，請再嘗試。')
      } else if (!toDoList || !toDoList.length) {
        $('#divToDoList').append(emptyMessageOfList)
      } else {
        $('#divToDoList').append(`
            <ul class="list-group"></ul>
          `)
        for (toDo of toDoList) {
          $('#divToDoList .list-group').append(`
              <li class="list-group-item d-flex align-items-center gap-1">
                <input class="form-check-input me-1 ckbToDo_${toDo.id}" 
                  type="checkbox" 
                  id="ckbToDo_${toDo.id}"
                  ${toDo.isChecked ? 'checked' : ''} />
                <label class="form-check-label align-middle" for="firstCheckbox">
                  ${toDo.name}
                </label>
                <button id="btnUpdate_${
                  toDo.id
                }" class="btn btn-primary btn-sm ms-auto">
                  Update
                </button>
                <button id="btnDelete_${
                  toDo.id
                }" class="btn btn-danger btn-sm ms-1">
                  Delete
                </button>
              </li>
              `)
        }
      }
    },
    error: function (msg) {
      console.log(msg)
      alert(errorMessageOfAjax)
    },
  })
}

function setIsCheckedOfToDo(strId, boolIsChecked) {
  let objPostData = { id: strId, isChecked: boolIsChecked }

  $.ajax({
    url: `${JAVA_SERVICE_DOMAIN}/setIsCheckedOfToDo`,
    method: METHOD_POST,
    contentType: APPLICATION_JSON,
    dataType: DATA_TYPE_JSON,
    data: JSON.stringify(objPostData),
    success: function (objToDoRes) {
      let { statusCode, message, toDoList } = objToDoRes

      if (statusCode === '400' || message === '必要參數缺失，請再嘗試。') {
        alert('必要參數缺失，請再嘗試。')
        $('#divToDoList').html('必要參數缺失，請再嘗試。')
      } else if (statusCode === '500' || message === '發生錯誤，請再嘗試。') {
        alert('發生錯誤，請再嘗試。')
        $('#divToDoList').html('發生錯誤，請再嘗試。')
      } else if (!toDoList || !toDoList.length) {
        $('#divToDoList').html(emptyMessageOfList)
      } else {
        let { id, checked } = JSON.parse(
          sessionStorage.getItem('divToDoListInfo')
        )
        $('#divToDoList').find(`.ckbToDo_${id}`).prop('checked', checked)
      }
    },
    error: function (msg) {
      console.log(msg)
      alert(errorMessageOfAjax)
    },
  })
}

function updateToDo(strId, strName) {
  let objPostData = { id: strId, name: strName }

  $.ajax({
    url: `${JAVA_SERVICE_DOMAIN}/updateToDo`,
    method: METHOD_POST,
    contentType: APPLICATION_JSON,
    dataType: DATA_TYPE_JSON,
    data: JSON.stringify(objPostData),
    success: function (objToDoRes) {
      let { statusCode, message, toDoList } = objToDoRes
      $('#divToDoList').empty()

      if (statusCode === '400' || message === '必要參數缺失，請再嘗試。') {
        alert('必要參數缺失，請再嘗試。')
        $('#divToDoList').append('必要參數缺失，請再嘗試。')
      } else if (statusCode === '500' || message === '發生錯誤，請再嘗試。') {
        alert('發生錯誤，請再嘗試。')
        $('#divToDoList').append('發生錯誤，請再嘗試。')
      } else if (!toDoList || !toDoList.length) {
        $('#divToDoList').append(emptyMessageOfList)
      } else {
        $('#divToDoList').append(`
            <ul class="list-group"></ul>
          `)
        for (toDo of toDoList) {
          $('#divToDoList .list-group').append(`
              <li class="list-group-item d-flex align-items-center gap-1">
                <input class="form-check-input me-1 ckbToDo_${toDo.id}" 
                  type="checkbox" 
                  id="ckbToDo_${toDo.id}"
                  ${toDo.isChecked ? 'checked' : ''} />
                <label class="form-check-label align-middle" for="firstCheckbox">
                  ${toDo.name}
                </label>
                <button id="btnUpdate_${
                  toDo.id
                }" class="btn btn-primary btn-sm ms-auto">
                  Update
                </button>
                <button id="btnDelete_${
                  toDo.id
                }" class="btn btn-danger btn-sm ms-1">
                  Delete
                </button>
              </li>
              `)
        }
      }
    },
    error: function (msg) {
      console.log(msg)
      alert(errorMessageOfAjax)
    },
  })
}

function deleteToDo(strId) {
  let objPostData = { id: strId }

  $.ajax({
    url: `${JAVA_SERVICE_DOMAIN}/deleteToDo`,
    method: METHOD_POST,
    contentType: APPLICATION_JSON,
    dataType: DATA_TYPE_JSON,
    data: JSON.stringify(objPostData),
    success: function (objToDoRes) {
      let { statusCode, message, toDoList } = objToDoRes
      $('#divToDoList').empty()

      if (statusCode === '400' || message === '必要參數缺失，請再嘗試。') {
        alert('必要參數缺失，請再嘗試。')
        $('#divToDoList').append('必要參數缺失，請再嘗試。')
      } else if (statusCode === '500' || message === '發生錯誤，請再嘗試。') {
        alert('發生錯誤，請再嘗試。')
        $('#divToDoList').append('發生錯誤，請再嘗試。')
      } else if (!toDoList || !toDoList.length) {
        $('#divToDoList').append(emptyMessageOfList)
      } else {
        $('#divToDoList').append(`
            <ul class="list-group"></ul>
          `)
        for (toDo of toDoList) {
          $('#divToDoList .list-group').append(`
              <li class="list-group-item d-flex align-items-center gap-1">
                <input class="form-check-input me-1 ckbToDo_${toDo.id}" 
                  type="checkbox" 
                  id="ckbToDo_${toDo.id}" 
                  ${toDo.isChecked ? 'checked' : ''} />
                <label class="form-check-label align-middle" for="firstCheckbox">
                  ${toDo.name}
                </label>
                <button id="btnUpdate_${
                  toDo.id
                }" class="btn btn-primary btn-sm ms-auto">
                  Update
                </button>
                <button id="btnDelete_${
                  toDo.id
                }" class="btn btn-danger btn-sm ms-1">
                  Delete
                </button>
              </li>
              `)
        }
      }
    },
    error: function (msg) {
      console.log(msg)
      alert(errorMessageOfAjax)
    },
  })
}
