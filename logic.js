// 全局商品数组（模拟后台数据）
let goodsList = [
    {name:"高等数学",cate:"书本",originPrice:50,sellPrice:15,desc:"几乎全新"},
    {name:"宿舍台灯",cate:"电器",originPrice:80,sellPrice:30,desc:"LED护眼灯"},
    {name:"收纳箱",cate:"生活用品",originPrice:35,sellPrice:10,desc:"大容量"}
]

// 页面加载完成自动渲染商品
window.onload = function(){
    initData();
    bindEvent();
}

// 渲染商品列表
function initData(list = goodsList){
    const box = document.getElementById("goodsListBox");
    box.innerHTML = "";
    list.forEach(item=>{
        let html = `
            <div class="goods-item">
                <h4>${item.name}</h4>
                <p>分类：${item.cate}</p >
                <p>原价：${item.originPrice}元</p >
                <p>现价：${item.sellPrice}元</p >
                <p>描述：${item.desc}</p >
            </div>
        `
        box.innerHTML += html;
    })
}

// 绑定所有点击事件
function bindEvent(){
    // 登录弹窗
    document.getElementById("loginBtn").onclick = function(){
        document.getElementById("mask").style.display = "block";
        document.getElementById("loginModal").style.display = "block";
    }
    // 发布商品弹窗
    document.getElementById("publishingBtn").onclick = function(){
        document.getElementById("mask").style.display = "block";
        document.getElementById("publishModal").style.display = "block";
    }
    // 查询筛选按钮
    document.getElementById("filterBtn").onclick = filterGoods;
}

// 关闭所有弹窗
function closeAllModal(){
    document.getElementById("mask").style.display = "none";
}

// 商品筛选功能
function filterGoods(){
    let key = document.getElementById("searchInput").value.trim();
    let cate = document.getElementById("cateSelect").value;
    let sort = document.getElementById("sortSelect").value;
    let res = goodsList.filter(item=>{
        let flag1 = key === "" || item.name.includes(key);
        let flag2 = cate === "" || item.cate === cate;
        return flag1 && flag2;
    })
    // 价格排序
    if(sort === "priceAsc"){
        res.sort((a,b)=>a.sellPrice - b.sellPrice);
    }else if(sort === "priceDesc"){
        res.sort((a,b)=>b.sellPrice - a.sellPrice);
    }
    initData(res);
}

// 提交发布商品
function submitGoods(){
    let name = document.getElementById("goodsName").value;
    let op = document.getElementById("originPrice").value;
    let sp = document.getElementById("sellPrice").value;
    let cate = document.getElementById("cate").value;
    let desc = document.getElementById("goodsDesc").value;
    if(!name || !sp){
        alert("商品名称和售价不能为空");
        return;
    }
    goodsList.push({
        name:name,
        cate:cate,
        originPrice:Number(op),
        sellPrice:Number(sp),
        desc:desc
    })
    initData();
    closeAllModal();
    alert("发布成功！");
}
