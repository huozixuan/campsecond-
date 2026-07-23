// goods.js 商品发布、筛选、下架模块
const GoodsModule = {
  // 初始化商品库
  initGoods() {
    if (!localStorage.getItem("goodsList")) {
      localStorage.setItem("goodsList", JSON.stringify([]));
    }
  },

  // 发布商品
  publishGoods(name, price, category, desc) {
    this.initGoods();
    const loginUser = UserModule.getLoginUser();
    if (!loginUser) return { code: -1, msg: "请登录后发布商品" };
    // 非空校验
    if (!name || !price || !category) return { code: -1, msg: "名称、价格、分类不能为空" };
    const goodsList = JSON.parse(localStorage.getItem("goodsList"));
    const newGoods = {
      id: Date.now(),
      name,
      price: Number(price),
      category,
      desc,
      sellerId: loginUser.id,
      sellerName: loginUser.username,
      status: 1, // 1上架 0下架
      createTime: new Date().toLocaleString()
    };
    goodsList.unshift(newGoods);
    localStorage.setItem("goodsList", JSON.stringify(goodsList));
    return { code: 0, msg: "商品发布成功" };
  },

  // 获取全部上架商品
  getOnlineGoods() {
    this.initGoods();
    const list = JSON.parse(localStorage.getItem("goodsList"));
    return list.filter(item => item.status === 1);
  },

  // 根据分类筛选商品
  filterByCategory(type) {
    return this.getOnlineGoods().filter(item => item.category === type);
  },

  // 价格升序/降序排序
  sortGoods(list, sortType = "asc") {
    return list.sort((a, b) => sortType === "asc" ? a.price - b.price : b.price - a.price);
  },

  // 获取单个商品详情
  getGoodsDetail(goodsId) {
    this.initGoods();
    const list = JSON.parse(localStorage.getItem("goodsList"));
    return list.find(item => item.id == goodsId);
  },

  // 卖家下架商品
  offGoods(goodsId) {
    this.initGoods();
    const loginUser = UserModule.getLoginUser();
    const list = JSON.parse(localStorage.getItem("goodsList"));
    const target = list.find(item => item.id == goodsId);
    // 只能下架自己的商品
    if (target.sellerId !== loginUser.id) return { code: -1, msg: "无操作权限" };
    target.status = 0;
    localStorage.setItem("goodsList", JSON.stringify(list));
    return { code: 0, msg: "商品已下架" };
  },

  // 获取当前用户发布的所有商品
  getUserOwnGoods() {
    const loginUser = UserModule.getLoginUser();
    if (!loginUser) return [];
    this.initGoods();
    const list = JSON.parse(localStorage.getItem("goodsList"));
    return list.filter(item => item.sellerId === loginUser.id);
  }
};
