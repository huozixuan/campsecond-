// chat.js 商品评论、私信聊天模块
const ChatModule = {
  // 初始化评论库
  initComment() {
    if (!localStorage.getItem("commentList")) {
      localStorage.setItem("commentList", JSON.stringify([]));
    }
  },

  // 商品发表评论
  addComment(goodsId, content) {
    this.initComment();
    const loginUser = UserModule.getLoginUser();
    if (!loginUser) return { code: -1, msg: "登录后才可评论" };
    if (!content.trim()) return { code: -1, msg: "评论内容不能为空" };
    const commentList = JSON.parse(localStorage.getItem("commentList"));
    commentList.push({
      id: Date.now(),
      goodsId,
      userId: loginUser.id,
      userName: loginUser.username,
      content,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("commentList", JSON.stringify(commentList));
    return { code: 0, msg: "评论成功" };
  },

  // 获取某个商品全部评论
  getGoodsComment(goodsId) {
    this.initComment();
    const list = JSON.parse(localStorage.getItem("commentList"));
    return list.filter(item => item.goodsId == goodsId);
  },

  // 初始化私信聊天记录
  initChatMsg() {
    if (!localStorage.getItem("chatMsgList")) {
      localStorage.setItem("chatMsgList", JSON.stringify([]));
    }
  },

  // 发送私信（买家发给卖家）
  sendPrivateMsg(targetUserId, msg) {
    this.initChatMsg();
    const loginUser = UserModule.getLoginUser();
    if (!loginUser) return { code: -1, msg: "请登录" };
    if (!msg.trim()) return { code: -1, msg: "消息不能为空" };
    const msgList = JSON.parse(localStorage.getItem("chatMsgList"));
    msgList.push({
      id: Date.now(),
      sendId: loginUser.id,
      sendName: loginUser.username,
      receiveId: targetUserId,
      content: msg,
      read: false,
      time: new Date().toLocaleString()
    });
    localStorage.setItem("chatMsgList", JSON.stringify(msgList));
    return { code: 0, msg: "消息发送成功" };
  },

  // 获取和某个用户的聊天记录
  getChatWithUser(targetId) {
    this.initChatMsg();
    const loginUser = UserModule.getLoginUser();
    const list = JSON.parse(localStorage.getItem("chatMsgList"));
    // 双向聊天记录
    return list.filter(item =>
      (item.sendId === loginUser.id && item.receiveId == targetId)
      || (item.sendId == targetId && item.receiveId === loginUser.id)
    );
  },

  // 获取当前用户所有未读消息数量
  getUnreadCount() {
    this.initChatMsg();
    const loginUser = UserModule.getLoginUser();
    if (!loginUser) return 0;
    const list = JSON.parse(localStorage.getItem("chatMsgList"));
    return list.filter(item => item.receiveId === loginUser.id && !item.read).length;
  },

  // 标记消息为已读
  readAllMsg(targetId) {
    this.initChatMsg();
    const loginUser = UserModule.getLoginUser();
    const list = JSON.parse(localStorage.getItem("chatMsgList"));
    list.forEach(item => {
      if (item.receiveId === loginUser.id && item.sendId == targetId) {
        item.read = true;
      }
    });
    localStorage.setItem("chatMsgList", JSON.stringify(list));
  }
};
