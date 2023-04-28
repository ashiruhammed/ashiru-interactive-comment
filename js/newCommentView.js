class NewCommentView {
  _btn = document.querySelector(".user_comment_button");
  _usertext = document.querySelector(".user_comment_text");

  addHandlerRender(handler) {
    this._btn.addEventListener(
      "click",
      function () {
        handler();
        this._usertext.value = "";
      }.bind(this)
    );
  }
  getCurrentUserText() {
    return this._usertext.value;
  }
}

export default new NewCommentView();
