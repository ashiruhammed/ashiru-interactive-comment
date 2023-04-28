class ReplyView {
  _parentEl = document.querySelector(".chatBox");

  addHandlerRender(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".comment_reply_btn");
      if (!btn) return;

      document
        .querySelector(`#comment_reply_${e.target.id}`)
        .classList.toggle("toggle_reply");

      handler(btn.id, btn.dataset.category, btn.dataset.identifier);
    });
  }

  getText(id) {
    return document.querySelector(`.textarea_${id}`).value;
  }
}

export default new ReplyView();
