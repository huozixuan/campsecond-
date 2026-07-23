// user.js 用户登录、注册、权限管理模块
const UserModule = {
  // 初始化本地用户库，不存在则创建
  initUserList() {
    if (!localStorage.getItem("userList")) {
      localStorage.setItem("userList", JSON.stringify([]));
    }
  },

  // 用户注册
  register(username, phone, pwd) {
    this.initUserList();
    const userList = JSON.parse(localStorage.getItem("userList"));
    // 格式校验
    if (username.length < 2) return { code: -1, msg: "用户名至少2位" };
    if (!/^1[3-9]\d{9}$/.test(phone)) return { code: -1, msg: "手机号格式错误" };
    if (pwd.length < 6) return { code: -1, msg: "密码不少于6位" };
    // 查重
    const repeat = userList.find(item => item.username === username || item.phone === phone);
    if (repeat) return { code: -1, msg: "用户名/手机号已被注册" };
    // 存入用户
    const newUser = {
      id: Date.now(),
      username,
      phone,
      password: pwd,
      avatar: "",
      createTime: new Date().toLocaleString()
    };
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    return { code: 0, msg: "注册成功" };
  },

  // 用户登录
  login(username, pwd) {
    this.initUserList();
    const userList = JSON.parse(localStorage.getItem("userList"));
    const user = userList.find(item => item.username === username && item.password === pwd);
    if (!user) return { code: -1, msg: "账号或密码错误" };
    // 保存登录状态
    localStorage.setItem("loginUser", JSON.stringify(user));
    return { code: 0, msg: "登录成功", data: user };
  },

  // 获取当前登录用户
  getLoginUser() {
    const userStr = localStorage.getItem("loginUser");
    return userStr ? JSON.parse(userStr) : null;
  },

  // 退出登录
  logout() {
    localStorage.removeItem("loginUser");
  },

  // 权限校验：未登录拦截
  checkLogin() {
    return !!this.getLoginUser();
  },

  // 修改个人昵称
  editNickname(newName) {
    const loginUser = this.getLoginUser();
    if (!loginUser) return { code: -1, msg: "请先登录" };
    const userList = JSON.parse(localStorage.getItem("userList"));
    const target = userList.find(u => u.id === loginUser.id);
    target.username = newName;
    localStorage.setItem("userList", JSON.stringify(userList));
    localStorage.setItem("loginUser", JSON.stringify(target));
    return { code: 0, msg: "修改成功" };
  }
};
