import plus from "url:../images/icon-plus.svg";
import minus from "url:../images/icon-minus.svg";
import replyImg from "url:../images/icon-reply.svg";
import editImg from "url:../images/icon-edit.svg";
import deleteImg from "url:../images/icon-delete.svg";
import amyrobson_img from "url:../images/avatars/image-amyrobson.webp";
import juliusomo_img from "url:../images/avatars/image-juliusomo.webp";
import maxblagun_img from "url:../images/avatars/image-maxblagun.webp";
import ramsesmiron_img from "url:../images/avatars/image-ramsesmiron.webp";
import { formattedDate } from "./helper.js";

class CommentView {
  _parentEl = document.querySelector(".chatBox");
  _data;
  render(data) {
    this._data = data;

    const markup = this._generateMarkup();
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  _loadImg(comm) {
    if (comm.user.username === "amyrobson") return amyrobson_img;
    if (comm.user.username === "ramsesmiron") return ramsesmiron_img;
    if (comm.user.username === "juliusomo") return juliusomo_img;
    if (comm.user.username === "maxblagun") return maxblagun_img;
  }

  _generateReplyMarkup(replies) {
    return replies
      .map(
        (reply) => `
        <div>
        <div class="comment">
          <div class="comment_text_box">
            <div class="score_cont">
              <img src="${plus}" data-category="reply_score" alt="" id="plus_${
          reply.id
        }" class="plusMinus"/>
              <p class="score_${reply.id}">${reply.score}</p>
              <img src="${minus}" alt="" id="minus_${
          reply.id
        }" class="plusMinus" data-category="reply_score" />
            </div>
            <div>
              <div class="comment_details">
                <img src="${this._loadImg(reply)}" alt="" />
                <div class="you ${
                  reply.user.username === this._data.currentUser.username
                    ? ""
                    : "hide"
                }">you</div>
                <h4 class="name">${reply.user.username}</h4>
                <p class="date_created date_${reply.id}">${formattedDate(
          new Date(reply.dateCreated)
        )}</p>
              </div>
              <p class="text_${reply.id}">
              <span>@${reply.replyingTo}</span> ${reply.content}
              </p>
              <div id="edit_${reply.id}"  class="edit_cont hide">
              <textarea id="update_${reply.id}" cols="30"  rows="3">${
          reply.content
        }</textarea>
              <button data-category="reply_update_btn"  class="update_btn" id="${
                reply.id
              }">UPDATE</button>
            </div>
            </div>
          </div>
          <div class="reply_box">
            <div class="replyCont ${
              reply.user.username == this._data.currentUser.username
                ? "hide"
                : ""
            }" id="${reply.id}">
              <img
              src="${replyImg}"
              alt="" />
              <h4>Reply</h4>
            </div>
            <div id="${reply.id}" data-category="delete_reply" class="delete ${
          reply.user.username == this._data.currentUser.username ? "" : "hide"
        }">
            <h4>Delete</h4>
            <img src="${deleteImg}" alt="" />
            </div>
            <div id="${reply.id}" class="edit ${
          reply.user.username === this._data.currentUser.username ? "" : "hide"
        }">
                <img src="${editImg}" alt="" />
                <h4>Edit</h4>
            </div>
          </div>
        </div>
          <div id="comment_reply_${reply.id}" class="comment_reply_input_box">
          <div>
            <img src="${juliusomo_img}" alt="" />
            <textarea
            class="textarea_${reply.id}"
              placeholder="Add a comment..."
              cols="30"
              rows="5"></textarea>
          </div>
          <button id="${
            reply.id
          }"  data-category="reply_btn" class="comment_reply_btn">REPLY</button>
        </div>
        </div>    
        `
      )
      .join("");
  }

  _generateMarkup() {
    return this._data.comments
      .map(
        (comment) => `
        <div class="comment_box">
        <div class="comment">
          <div class="comment_text_box">
           <div class="score_cont">
              <img src="${plus}" data-category="comment_score" alt="" id="plus_${
          comment.id
        }" class="plusMinus"/>
              <p class="score_${comment.id}">${comment.score}</p>
              <img src="${minus}" alt="" id="minus_${
          comment.id
        }" class="plusMinus" data-category="comment_score" />
            </div>
            <div>
              <div class="comment_details">
                <img src="${this._loadImg(comment)}" alt="" />
                <div class="you ${
                  comment.user.username === this._data.currentUser.username
                    ? ""
                    : "hide"
                }">you</div>
                <h4 class="name">${comment.user.username}</h4>
                <p class="date_created date_${comment.id}">${formattedDate(
          new Date(comment.dateCreated)
        )}</p>
              </div>
              <p class="text_${comment.id}">
              ${comment.content}
              </p>
              <div id="edit_${comment.id}" class="edit_cont hide">
              <textarea id="update_${comment.id}"  cols="30" rows="4">${
          comment.content
        }</textarea>
              <button data-category="comment_update_btn" class="update_btn" id="${
                comment.id
              }">UPDATE</button>
            </div>
            </div>
          </div>
          <div class="reply_box">
            <div id="${comment.id}" class="replyCont ${
          comment.user.username !== this._data.currentUser.username
            ? ""
            : "hide"
        }">
              <img
              src="${replyImg}"
              alt=""/>
              <h4>Reply</h4>
            </div>
            <div  id="${
              comment.id
            }" data-category="delete_comment" class="delete ${
          comment.user.username == this._data.currentUser.username ? "" : "hide"
        }">
            <h4>Delete</h4>
            <img src="${deleteImg}" alt="" />
            </div>
            <div id="${comment.id}" class="edit ${
          comment.user.username === this._data.currentUser.username
            ? ""
            : "hide"
        }">
                <img src="${editImg}" alt="" />
                <h4>Edit</h4>
            </div>
          </div>
        </div>
        <div id="comment_reply_${comment.id}" class="comment_reply_input_box">
          <div>
            <img src="${juliusomo_img}" alt="" />
            <textarea
            class="textarea_${comment.id}"
              placeholder="Add a comment..."
              cols="30"
              rows="5"></textarea>
          </div>
          <button   id="${
            comment.id
          }" data-category="comment_btn" class="comment_reply_btn">REPLY</button>
        </div>
        <div class="comment_reply_box reply replies">${
          comment.replies.length == 0
            ? ""
            : this._generateReplyMarkup(comment.replies)
        }
        </div>
      </div>
    `
      )
      .join("");
  }
}
export default new CommentView();
