class DeleteView {
  _parentEl = document.querySelector(".chatBox");
  _deleteBtn = document.querySelector(".delete_btn");
  _cancelBtn =  document.querySelector('.cancel_btn')
  addHandlerRender() {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".delete");
      if (!btn) return;
      const deleteBtn = document.querySelector(".delete_btn");
      const modalView = document.querySelector(".modal-view");
      modalView.classList.toggle("hide");
      deleteBtn.setAttribute("data-category", btn.dataset.category);
      deleteBtn.id = btn.id;
    });
  }

  confirmDelete(handler) {
    this._deleteBtn.addEventListener("click", function () {
      const modalView = document.querySelector(".modal-view");
      modalView.classList.toggle("hide");
      handler(this.id, this.dataset.category);
    });
  }

  cancelDelete() {
    this._cancelBtn.addEventListener("click", function () {
      const modalView = document.querySelector(".modal-view");
      modalView.classList.toggle("hide");
    });
  }
}
export default new DeleteView();
