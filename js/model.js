const uniqueID = require("uniqid");

export const state = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    score: 2,
    username: "juliusomo",
  },
  comments: [
    {
      id: uniqueID(),
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      dateCreated: new Date(2023, 2, 18).toISOString(),
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: uniqueID(),
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      dateCreated: new Date(2023, 3, 16).toISOString(),
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: uniqueID(),
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          dateCreated: new Date(2023, 3, 21).toISOString(),
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: uniqueID(),
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          dateCreated: new Date(2023, 3, 26).toISOString(),
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

export const getIndex = function (id, category) {
  if (category && category.includes("reply")) {
    return state.comments.findIndex((comm) => {
      return comm.replies.find((reply) => reply.id === id);
    });
  }

  return state.comments.findIndex((comment) => comment.id === id);
};

const userRep = function (comment, replier) {
  return {
    id: uniqueID(),
    content: comment,
    createdAt: "2 days ago",
    dateCreated: new Date().toISOString(),
    score: state.currentUser.score,
    replyingTo: replier,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: state.currentUser.username,
    },
  };
};
export const insertReply = function (index, data, checkBtn) {
  if (checkBtn === "comment_btn") {
    const repName = state.comments[index].user.username;
    state.comments[index].replies.push(userRep(data[0], repName));
  }

  if (checkBtn !== "comment_btn") {
    const ind = state.comments[index].replies.findIndex(
      (comm) => comm.id === data[1]
    );

    const repName = state.comments[index].replies[ind].user.username;

    state.comments[index].replies.splice(ind + 1, 0, userRep(data[0], repName));
  }

  localStorage.setItem("state", JSON.stringify(state.comments));
};

export const insertUserComment = (text) => {
  state.comments.push({
    id: uniqueID(),
    content: text,
    createdAt: "1 month ago",
    dateCreated: new Date().toISOString(),
    score: state.currentUser.score,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    replies: [],
  });
  localStorage.setItem("state", JSON.stringify(state.comments));
};

export const insertUserUpdate = function (index, data, category) {
  if (category === "comment_update_btn") {
    state.comments[index].content = data[0];
    state.comments.dateCreated = new Date().toISOString();
  }
  if (category === "reply_update_btn") {
    const ind = state.comments[index].replies.findIndex(
      (comm) => comm.id === data[1]
    );
    state.comments[index].replies[ind].content = data[0];
    state.comments[index].replies[ind].dateCreated = new Date().toISOString();
  }
  localStorage.setItem("state", JSON.stringify(state.comments));
};

export const setScore = function (index, data, category) {
  const id = data[1];
  const score = +data[0];

  if (category.includes("reply")) {
    const replyIndex = state.comments[index].replies.findIndex(
      (reply) => reply.id === id
    );
    state.comments[index].replies[replyIndex].score = score;
  } else state.comments[index].score = score;

  localStorage.setItem("state", JSON.stringify(state.comments));
};

export const deleteComment = function (id, index, category) {
  if (category.includes("reply")) {
    const replyIndex = state.comments[index].replies.findIndex(
      (reply) => reply.id === id
    );
    state.comments[index].replies.splice(replyIndex, 1);
  } else state.comments.splice(index, 1);

  localStorage.setItem("state", JSON.stringify(state.comments));
};

if (localStorage.hasOwnProperty("state")) {
  state.comments = JSON.parse(localStorage.getItem("state"));
}
