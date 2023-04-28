class ScoreView {
  _parentEl = document.querySelector(".chatBox");

  addHandlerRender(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".plusMinus");
      if (!btn) return;
      const idCategory = btn.id.split("_");
      const id = idCategory[1];
      const category = idCategory[0];
      const scoreText = document.querySelector(`.score_${id}`);
      if (category === "minus" && +scoreText.textContent < 1) return;
      if (category === "plus") +scoreText.textContent++;
      if (category === "minus") +scoreText.textContent--;
      handler(id, scoreText.textContent, btn.dataset.category);
    });
  }
}

export default new ScoreView();
