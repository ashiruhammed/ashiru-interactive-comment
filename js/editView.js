import { formattedDate } from "./helper.js";

class EditView {
  _parentEl = document.querySelector(".chatBox");

  _toggler(btn) {
    const editCont = document.querySelector(`#edit_${btn.id}`);
    document.querySelector(`.text_${btn.id}`).classList.toggle("hide");
    editCont.classList.toggle("hide");
  }
  showEditView() {
    this._parentEl.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".edit");

        if (!btn) return;
        this._toggler(btn);
      }.bind(this)
    );
  }

  addHandlerRender(handler) {
    this._parentEl.addEventListener(
      "click",
      function (e) {
        const updateBtn = e.target.closest(".update_btn");
        if (!updateBtn) return;
        this._toggler(updateBtn);
        handler(updateBtn.id, updateBtn.dataset.category);
      }.bind(this)
    );
  }

  getEditText(id) {
    return document.querySelector(`#update_${id}`).value;
  }

  insertText(id) {
    document.querySelector(`.text_${id}`).textContent = this.getEditText(id);
    document.querySelector(`.date_${id}`).textContent = formattedDate(
      new Date()
    );
  }
}
export default new EditView();
