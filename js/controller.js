import ToggleView from "./toggleInput.js";
import commentView from "./commentView.js";
import * as model from "./model.js";
import scoreView from "./scoreView.js";
import replyView from "./replyView.js";
import newCommentView from "./newCommentView.js";
import editView from "./editView.js";
import deleteView from "./deleteView.js";

const renderComment = function () {
  commentView.render(model.state);
};

const controlClickedReply = function (id, category) {
  const index = model.getIndex(id, category);
  const text = replyView.getText(id);
  if (!text) return;
  model.insertReply(index, [text, id], category);
  commentView.render(model.state);
};

const controlUserComment = function () {
  model.insertUserComment(newCommentView.getCurrentUserText());
  commentView.render(model.state);
};

const controlUpdate = function (id, category) {
  const index = model.getIndex(id, category);
  const text = editView.getEditText(id);
  if (!text) return;
  model.insertUserUpdate(index, [text, id], category);
  editView.insertText(id);
};

const controlScore = function (id, score, category) {
  const index = model.getIndex(id, category);

  model.setScore(index, [score, id], category);
};

const controlDelete = (id, category) => {
  const index = model.getIndex(id, category);
  model.deleteComment(id, index, category);
  commentView.render(model.state);
};

const init = function () {
  ToggleView.addHandlerRender();
  renderComment();
  replyView.addHandlerRender(controlClickedReply);
  newCommentView.addHandlerRender(controlUserComment);
  editView.showEditView();
  editView.addHandlerRender(controlUpdate);
  scoreView.addHandlerRender(controlScore);
  deleteView.addHandlerRender();
  deleteView.confirmDelete(controlDelete);
  deleteView.cancelDelete();
};

init();
