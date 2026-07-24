# 校园二手闲置项目贡献规范 CONTRIBUTING.md
## 1. 项目简介
本项目为轻量化校园二手闲置展示平台，仅实现商品浏览、关键词搜索、商品发布三大核心功能，技术栈为 HTML + JavaScript，无后端服务器，开箱即用。
仓库地址：https://github.com/huozixuan/campsecond-

## 2. 团队分工规则
1. huozixuan（组长）：首页 index.html 页面、仓库管理、版本发布、文档维护
2. Sunhaoran104：goods.js 商品数据、发布逻辑开发
3. 第三位组员：logic.js 检索过滤、自动化检测、代码评审、功能测试

## 3. 分支开发规范（强制要求）
1. main 为主保护分支，禁止直接 push 代码，所有修改必须走 PR
2. 新增功能分支命名规则：`feature/功能名称`
   - 例：feature/home-page、feature/goods-add、feature/search-filter
3. Bug修复分支命名：`fix/问题描述`
   - 例：fix/price-negative-check

## 4. Issue 使用规范
1. 新增功能必须先新建 Issue，写明需求、负责人、完成标准
2. 程序bug、页面异常单独新建Bug类型Issue，标注复现步骤
3. 代码修复/功能开发完成合并PR后，对应Issue自动关闭

## 5. Pull Request 提交规范
1. 开发完成本地自测，浏览、搜索、发布商品全部功能无异常再提交PR
2. PR标题清晰说明修改内容，例：【新增】商品价格合法性校验
3. PR提交后必须至少一名组员完成代码Review，审核通过才可合并
4. 提交PR会自动触发GitHub Actions ESLint代码检测，检测失败不可合并

## 6. 代码编写规范
1. JavaScript 代码遵循 ESLint 自动校验规则，无语法错误、无未定义变量
2. 变量命名简洁易懂，禁止无注释冗余代码
3. 商品发布表单必须做基础校验：商品名不为空、价格大于0

## 7. 提交规范
单次commit只完成单一功能/单一修复，提交说明简洁清晰，例如：
- feat: 新增商品搜索过滤逻辑
- fix: 修复负数价格可发布商品bug
- docs: 更新CONTRIBUTING协作规范文档
