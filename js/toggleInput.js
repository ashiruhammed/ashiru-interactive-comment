class ToggleView {
  _parentEl = Array.from(document.querySelectorAll(".comment_reply_input_box"));
  _toggleBtn = Array.from(document.querySelectorAll(".reply_img"));
  _chatBox = document.querySelector(".chatBox");

  addHandlerRender() {
    this._chatBox.addEventListener("click", function (e) {
      const btn = e.target.closest(".replyCont");

      if (!btn) return;

      document
        .querySelector(`#comment_reply_${btn.id}`)
        .classList.toggle("toggle_reply");
      setTimeout(function () {
        document.querySelector(`.textarea_${btn.id}`).focus();
      }, 1);
    });
  }
}

export default new ToggleView();
