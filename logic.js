<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>CampSecond 校园二手集市</title>
    <style>
        /* 全部UI样式 组员B开发 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Microsoft Yahei", sans-serif;
        }
        body {
            background-color: #f5f7fa;
            color: #333;
        }
        /* 导航栏 */
        .nav-bar {
            height: 60px;
            background-color: #165dff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            color: white;
            box-shadow: 0 2px 8px #00000018;
        }
        .nav-title {
            font-size: 20px;
            font-weight: bold;
        }
        .nav-btn-group button {
            margin-left: 12px;
            padding: 7px 14px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn-white {
            background: #fff;
            color: #165dff;
        }
        .btn-orange {
            background: #ff7d00;
            color: #fff;
        }
        /* 登录弹窗 */
        .mask {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 99;
            display: none;
        }
        .modal {
            width: 420px;
            background: #fff;
            border-radius: 8px;
            padding: 28px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
        }
        .modal h3 {
            text-align: center;
            margin-bottom: 20px;
            color: #165dff;
        }
        .form-item {
            margin-bottom: 15px;
        }
        .form-item label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
        }
        .form-item input, .form-item select, .form-item textarea {
            width: 100%;
            padding: 9px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        .modal-btn {
            width: 100%;
            padding: 10px;
            background: #165dff;
            color: white;
            border: none;
            border-radius: 4px;
            margin-top: 8px;
            cursor: pointer;
        }
        .switch-text {
            text-align: center;
            margin-top: 12px;
            font-size: 14px;
            color: #165dff;
            cursor: pointer;
        }
        /* 首页筛选区 */
        .filter-wrap {
            width: 1200px;
            margin: 20px auto;
            background: #fff;
            padding: 16px;
            border-radius: 6px;
            display: flex;
            gap: 12px;
            align-items: center;
        }
        .filter-wrap input {
            flex: 1;
            padding: 9px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        /* 商品容器 */
        .container {
            width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            padding-bottom: 40px;
        }
        .goods-card {
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px #00000010;
        }
        .card-body {
            padding: 14px;
        }
        .goods-name {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 6px;
        }
        .goods-price {
            color: #f53f3f;
            font-size: 18px;
            font-weight: bold;
        }
        .goods-info {
            font-size: 13px;
            color: #777;
            margin: 8px 0;
        }
        .offline-tag {
            background: #999;
            color: white;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 3px;
        }
        .online-tag {
            background: #00b42a;
            color: white;
            font-size: 12px;
            padding: 2px 6px;
            border-radius: 3px;
        }
        .card-btn {
            width: 100%;
            margin-top:10px;
            padding:6px;
            border: none;
            background: #eee;
            cursor: pointer;
        }
        /* 个人中心页面 */
        .user-page {
            width: 1200px;
            margin: 30px auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            display: none;
        }
        .tab-btn-group {
            display: flex;
            gap:10px;
            margin-bottom:20px;
        }
        .tab-btn {
            padding:8px 16px;
            border:1px solid #165dff;
            background:#fff;
            color:#165dff;
            border-radius:4px;
            cursor:pointer;
        }
        .tab-btn.active {
            background:#165dff;
            color:#fff;
        }
        .tab-content {
            display: none;
        }
        .tab-content.show {
            display: block;
        }
    </style>
</head>
<body>
    <!-- 导航栏 -->
    <div class="nav-bar">
        <div class="nav-title">CampSecond 校园二手集市</div>
        <div class="nav-btn-group">
            <button class="btn-white" id="publishBtn">发布闲置</button>
            <button class="btn-white" id="userCenterBtn">个人中心</button>
            <button class="btn-orange" id="loginBtn">登录/注册</button>
        </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-wrap">
        <input type="text" id="searchInput" placeholder="搜索商品名称/描述">
        <select id="cateSelect">
            <option value="">全部分类</option>
            <option value="数码电子">数码电子</option>
            <option value="教材书籍">教材书籍</option>
            <option value="代步工具">代步工具</option>
            <option value="生活用品">生活用品</option>
            <option value="运动器材">运动器材</option>
            <option value="美妆服饰">美妆服饰</option>
        </select>
        <select id="sortSelect">
            <option value="time">最新发布</option>
            <option value="priceAsc">价格升序</option>
            <option value="priceDesc">价格降序</option>
        </select>
        <button id="filterBtn">筛选查询</button>
    </div>

    <!-- 商品展示容器 -->
    <div class="container" id="goodsContainer"></div>

    <!-- 个人中心页面 -->
    <div class="user-page" id="userPage">
        <div class="tab-btn-group">
            <button class="tab-btn active" data-tab="info">账号信息</button>
            <button class="tab-btn" data-tab="onsale">在售商品</button>
            <button class="tab-btn" data-tab="offsale">已下架商品</button>
            <button class="tab-btn" data-tab="collect">我的收藏</button>
            <button class="tab-btn" data-tab="history">浏览记录</button>
        </div>
        <div class="tab-content show" data-content="info">
            <div class="form-item">
                <label>用户名</label>
                <input id="editName">
            </div>
            <div class="form-item">
                <label>校园学号</label>
                <input id="editId">
            </div>
            <div class="form-item">
                <label>宿舍地址</label>
                <input id="editDorm">
            </div>
            <button class="modal-btn" id="saveUserInfo">保存修改</button>
            <button class="modal-btn" style="background:#f53f3f;margin-top:10px;" id="clearAllData">清空全部本地数据</button>
        </div>
        <div class="tab-content" data-content="onsale" id="onsaleBox"></div>
        <div class="tab-content" data-content="offsale" id="offsaleBox"></div>
        <div class="tab-content" data-content="collect" id="collectBox"></div>
        <div class="tab-content" data-content="history" id="historyBox"></div>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" id="mask"></div>

    <!-- 登录注册弹窗 -->
    <div class="modal" id="loginModal">
        <h3 id="loginModalTitle">用户登录</h3>
        <div class="form-item">
            <label>用户名</label>
            <input id="username">
        </div>
        <div class="form-item">
            <label>校园学号</label>
            <input id="stuId">
        </div>
        <div class="form-item">
            <label>宿舍地址</label>
            <input id="dorm">
        </div>
        <div class="form-item">
            <label>密码</label>
            <input type="password" id="pwd">
        </div>
        <button class="modal-btn" id="loginSubmit">登录</button>
        <div class="switch-text" id="switchLogin">没有账号？去注册</div>
    </div>

    <!-- 发布商品弹窗 -->
    <div class="modal" id="publishModal">
        <h3>发布闲置商品</h3>
        <div class="form-item">
            <label>商品名称</label>
            <input id="goodsName">
        </div>
        <div class="form-item">
            <label>商品分类</label>
            <select id="goodsCate">
                <option value="数码电子">数码电子</option>
                <option value="教材书籍">教材书籍</option>
                <option value="代步工具">代步工具</option>
                <option value="生活用品">生活用品</option>
                <option value="运动器材">运动器材</option>
                <option value="美妆服饰">美妆服饰</option>
            </select>
        </div>
        <div class="form-item">
            <label>原价(元)</label>
            <input type="number" id="originPrice">
        </div>
        <div class="form-item">
            <label>出售价格(元)</label>
            <input type="number" id="sellPrice">
        </div>
        <div class="form-item">
            <label>商品描述</label>
            <textarea id="goodsDesc" rows="4"></textarea>
        </div>
        <button class="modal-btn" id="submitGoods">确认发布</button>
    </div>

<script>
    // 核心业务逻辑 组员C开发
    // 全局数据定义
    const DATA_KEY = {
        user: "camp_user",
        goods: "camp_goods",
        collect: "camp_collect",
        history: "camp_history"
    }
    // 敏感词库
    const badWords = ["赌博", "色情", "外挂", "套现", "枪支", "毒品"]
    let currentUser = null;
    let goodsList = [];
    let collectList = [];
    let historyList = [];

    // 本地存储工具封装
    function storageGet(key) {
        const str = localStorage.getItem(key);
        return str ? JSON.parse(str) : null;
    }
    function storageSet(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    // 初始化加载本地数据
    function initData() {
        currentUser = storageGet(DATA_KEY.user);
        goodsList = storageGet(DATA_KEY.goods) || [];
        collectList = storageGet(DATA_KEY.collect) || [];
        historyList = storageGet(DATA_KEY.history) || [];
        renderNavState();
        renderAllGoods();
    }
    // 刷新导航登录状态
    function renderNavState() {
        const loginBtn = document.getElementById("loginBtn");
        if(currentUser) {
            loginBtn.innerText = "已登录："+currentUser.name;
        }else{
            loginBtn.innerText = "登录/注册";
        }
    }
    // 敏感词过滤
    function checkBadWord(text) {
        return badWords.some(word => text.includes(word));
    }
    // 判断商品是否过期（7天自动下架）
    function isGoodsExpire(timeStr) {
        const createTime = new Date(timeStr).getTime();
        const now = Date.now();
        const diff = now - createTime;
        const sevenDay = 7 * 24 * 60 * 60 * 1000;
        return diff >= sevenDay;
    }
    // 渲染全部商品卡片
    function renderAllGoods(filterData=null) {
        const wrap = document.getElementById("goodsContainer");
        wrap.innerHTML = "";
        let renderList = filterData ? filterData : goodsList;
        renderList.forEach(item => {
            const expire = isGoodsExpire(item.createTime);
            const isCollect = collectList.some(c => c.goodsId === item.id);
            const card = document.createElement("div");
            card.className = "goods-card";
            card.innerHTML = `
                <div class="card-body">
                    <div class="goods-name">${item.name}</div>
                    <div class="goods-price">￥${item.sellPrice}</div>
                    <div class="goods-info">分类：${item.cate}</div>
                    <div>${expire ? `<span class="offline-tag">已过期下架</span>` : `<span class="online-tag">正常在售</span>`}</div>
                    <div class="goods-info">卖家：${item.sellerName}</div>
                    <button class="card-btn collect-btn" data-id="${item.id}">${isCollect ? "取消收藏" : "收藏商品"}</button>
                </div>
            `;
            wrap.appendChild(card);
        })
        bindCollectBtn();
    }
    // 绑定收藏按钮事件
    function bindCollectBtn() {
        document.querySelectorAll(".collect-btn").forEach(btn=>{
            btn.onclick = function() {
                if(!currentUser) {
                    alert("请先登录账号！");
                    openModal("loginModal");
                    return;
                }
                const goodsId = this.dataset.id;
                const existIdx = collectList.findIndex(c=>c.goodsId === goodsId);
                if(existIdx > -1) {
                    collectList.splice(existIdx,1);
                }else{
                    collectList.push({
                        userId: currentUser.id,
                        goodsId: goodsId
                    })
                }
                storageSet(DATA_KEY.collect, collectList);
                renderAllGoods();
            }
        })
    }
    // 打开弹窗
    function openModal(id) {
        document.getElementById("mask").style.display = "block";
        document.getElementById(id).style.display = "block";
    }
    // 关闭弹窗
    function closeAllModal() {
        document.getElementById("mask").style.display = "none";
        document.querySelectorAll(".modal").forEach(m=>m.style.display="none");
    }
    // 生成唯一ID
    function createId() {
        return Date.now() + Math.floor(Math.random()*1000);
    }
    // 登录注册切换
    let isRegister = false;
    document.getElementById("switchLogin").onclick = function() {
        isRegister = !isRegister;
        const title = document.getElementById("loginModalTitle");
        const submitBtn = document.getElementById("loginSubmit");
        const tip = document.getElementById("switchLogin");
        if(isRegister) {
            title.innerText = "用户注册";
            submitBtn.innerText = "完成注册";
            tip.innerText = "已有账号？去登录";
        }else{
            title.innerText = "用户登录";
            submitBtn.innerText = "登录";
            tip.innerText = "没有账号？去注册";
        }
    }
    // 登录/注册提交
    document.getElementById("loginSubmit").onclick = function() {
        const name = document.getElementById("username").value.trim();
        const sid = document.getElementById("stuId").value.trim();
        const dorm = document.getElementById("dorm").value.trim();
        const pwd = document.getElementById("pwd").value.trim();
        if(!name || !sid || !dorm || !pwd) {
            alert("所有输入框不能为空！");
            return;
        }
        if(isRegister) {
            // 注册逻辑
            const userInfo = {
                id: createId(),
                name, stuId:sid, dorm, pwd
            }
            storageSet(DATA_KEY.user, userInfo);
            currentUser = userInfo;
            alert("注册成功，已自动登录！");
        }else{
            // 登录逻辑
            const saveUser = storageGet(DATA_KEY.user);
            if(!saveUser) {
                alert("无此账号，请先注册！");
                return;
            }
            if(saveUser.stuId !== sid || saveUser.pwd !== pwd) {
                alert("学号或密码错误！");
                return;
            }
            currentUser = saveUser;
            alert("登录成功");
        }
        closeAllModal();
        renderNavState();
    }
    // 发布商品
    document.getElementById("submitGoods").onclick = function() {
        if(!currentUser) {
            alert("请先登录！");
            closeAllModal();
            openModal("loginModal");
            return;
        }
        const name = document.getElementById("goodsName").value.trim();
        const cate = document.getElementById("goodsCate").value;
        const origin = Number(document.getElementById("originPrice").value);
        const sell = Number(document.getElementById("sellPrice").value);
        const desc = document.getElementById("goodsDesc").value.trim();
        if(!name || !desc || origin <=0 || sell <=0) {
            alert("商品名称、描述不能为空，价格必须大于0！");
            return;
        }
        if(checkBadWord(name) || checkBadWord(desc)) {
            alert("商品包含违规词汇，禁止发布！");
            return;
        }
        const goods = {
            id: createId(),
            name, cate, originPrice:origin, sellPrice:sell, desc,
            sellerId: currentUser.id,
            sellerName: currentUser.name,
            createTime: new Date().toISOString()
        }
        goodsList.push(goods);
        storageSet(DATA_KEY.goods, goodsList);
        alert("商品发布成功！");
        closeAllModal();
        renderAllGoods();
        // 清空表单
        document.getElementById("goodsName").value = "";
        document.getElementById("originPrice").value = "";
        document.getElementById("sellPrice").value = "";
        document.getElementById("goodsDesc").value = "";
    }
    // 筛选查询
    document.getElementById("filterBtn").onclick = function() {
        const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
        const cate = document.getElementById("cateSelect").value;
        const sort = document.getElementById("sortSelect").value;
        let filter = [...goodsList];
        // 关键词筛选
        if(keyword) {
            filter = filter.filter(item => item.name.toLowerCase().includes(keyword) || item.desc.toLowerCase().includes(keyword))
        }
        // 分类筛选
        if(cate) {
            filter = filter.filter(item => item.cate === cate)
        }
        // 排序
        if(sort === "priceAsc") {
            filter.sort((a,b)=>a.sellPrice - b.sellPrice);
        }else if(sort === "priceDesc") {
            filter.sort((a,b)=>b.sellPrice - a.sellPrice);
        }else{
            filter.sort((a,b)=>new Date(b.createTime) - new Date(a.createTime));
        }
        renderAllGoods(filter);
    }
    // 弹窗打开按钮绑定
    document.getElementById("loginBtn").onclick = ()=>openModal("loginModal");
    document.getElementById("publishingBtn").onclick = ()=>openModal("publishingModal");
    document.getElementById("mask").onclick = closeAllModal;
    // 页面初始化加载数据
    window.onload = initData;
</script>
</body>
</html>
