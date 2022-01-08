import $ from 'jquery';


export function translation() {
  // Адаптив окна трансляции
  $(".translation").height($(window).height()-50)
    
  // Заготовка на будущее, адаптив
  $(window).resize(function(){
    $(".translation").height($(window).height()-50)
  })
}

// Если след комментарий будет первый - нужно отчистить чат
let firstComment = true

export function chat() {
  $('.chat').height($('.chat_block').height()-200)
  $('.scroll-panel').height($('.chat_block').height()-230)
  
  // Заготовка на будущее, адаптив
  $(window).resize(function(){
    $('.chat').height($('.chat_block').height()-150)
    $('.scroll-panel').height($('.chat_block').height()-230)
  });
}


export function sendMessage() {
    console.log("click")
  if (firstComment) {
    // Чистим чат
    document.getElementById("scroll-panel").innerHTML = ""
    firstComment = !firstComment
  }
  
  let message = document.getElementById("message").value
  // Если сообщение больше 0 - показываем в чате
  if (message.length > 0) {
    document.getElementById("scroll-panel").innerHTML += 
    `
    <div class="user_comment">
      <div class="avatar">
        <p>${localStorage.getItem("UserName")[0].toUpperCase()}</p>
      </div>
      <div class="content">
        <h2 class="name_user">${localStorage.getItem("UserName")}</h2>
        <p class="comment_user">${message}</p>
      </div>
    </div>
    `

    // Скролл перемещаем в самый низ
    let block = document.getElementById("scroll-panel");
    block.scrollTop = block.scrollHeight;

    // Чистим окно ввода кода пользователем
    document.getElementById("message").value = ""
  }
}


export function loginUser() {
  // Простая функция получение уникального идентификатора
  let Robot = function(){
      this.name = Date.now();
  }
  
  // Если пользователю идентификатор не присваивался - присваиваем и сохраняем
  if (!localStorage.getItem("UserName")) {
    Robot()
    localStorage.setItem("UserName", "id" + this.name)
  }
  
  // Выводим в окно пользователей нас
  document.getElementById("users_name").innerHTML = 
    `<div><p>${localStorage.getItem("UserName")}</p><img src="PNG/delete_user.png" alt="delete user"></div>`
}


export function openChat() {
  document.getElementsByClassName("chat_block")[0].style.display = "block";
  document.getElementsByClassName("chat_block")[0].style.position = "absolute"
  document.getElementsByClassName("chat_block")[0].style.top = 0
  document.getElementsByClassName("chat_block")[0].style.left = 0 
  document.getElementsByClassName("chat_block")[0].style.width = 360
  document.getElementsByClassName("chat_block")[0].style.height = "100%"

  $('.chat').height($('.chat_block').height()-100)
  $('.scroll-panel').height($('.chat_block').height()-150)

  document.getElementsByClassName("chat_block")[0].style.overflow = "hidden"
}


export function closeWindow(param) {
  if (param === "chat") {
    document.getElementsByClassName("chat_block")[0].style.display = "none";
  }
}