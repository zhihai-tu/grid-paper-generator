# 田字格生成器 - GitHub 提交指南

## 📦 项目文件清单

本项目包含以下文件：
- `index.html` - 主页面
- `css/style.css` - 样式文件
- `js/main.js` - JavaScript 核心逻辑
- `README.md` - 项目说明文档
- `.gitignore` - Git 忽略文件配置

## 🚀 提交到 GitHub 的步骤

### 方法一：通过 GitHub 网页上传

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 填写仓库名称：`tianzige-generator`（或你喜欢的名称）
   - 描述：`中文田字格字帖生成器 - 支持拼音默写汉字和汉字默写拼音两种模式，智能拼音识别，标准四线格，A4纸张打印`
   - 选择 Public（公开）或 Private（私有）
   - 不要勾选"Initialize this repository with a README"
   - 点击"Create repository"

2. **上传文件**
   - 在新建的仓库页面，点击"uploading an existing file"
   - 将所有项目文件拖拽到上传区域：
     - index.html
     - css/style.css
     - js/main.js
     - README.md
     - .gitignore
   - 填写提交信息：`Initial commit - 田字格生成器 v1.0.0`
   - 点击"Commit changes"

### 方法二：通过命令行提交（推荐）

1. **安装 Git**（如果还没安装）
   - Windows: 下载 https://git-scm.com/download/win
   - Mac: `brew install git`
   - Linux: `sudo apt-get install git`

2. **配置 Git**（首次使用需要）
   ```bash
   git config --global user.name "你的名字"
   git config --global user.email "your-email@example.com"
   ```

3. **在本地初始化仓库**
   ```bash
   # 进入项目目录
   cd /path/to/your/project
   
   # 初始化 Git 仓库
   git init
   
   # 添加所有文件
   git add .
   
   # 提交到本地仓库
   git commit -m "Initial commit - 田字格生成器 v1.0.0"
   ```

4. **连接到 GitHub 并推送**
   ```bash
   # 连接到远程仓库（替换为你的 GitHub 用户名和仓库名）
   git remote add origin https://github.com/你的用户名/tianzige-generator.git
   
   # 推送到 GitHub
   git branch -M main
   git push -u origin main
   ```

## 🌐 部署到 GitHub Pages

提交代码后，可以免费部署到 GitHub Pages：

1. **启用 GitHub Pages**
   - 进入仓库页面
   - 点击 Settings（设置）
   - 左侧菜单选择 Pages
   - Source 选择：`Deploy from a branch`
   - Branch 选择：`main` 和 `/ (root)`
   - 点击 Save

2. **访问你的网站**
   - 等待 1-2 分钟
   - 访问：`https://你的用户名.github.io/tianzige-generator/`

## 📝 后续更新代码

当你修改代码后，可以这样更新：

```bash
# 查看修改状态
git status

# 添加修改的文件
git add .

# 提交修改
git commit -m "更新说明，例如：优化虚线样式"

# 推送到 GitHub
git push origin main
```

## 🎯 推荐的提交信息规范

- `feat: 添加新功能` - 新功能
- `fix: 修复虚线显示问题` - 修复 bug
- `style: 调整田字格样式` - 样式调整
- `docs: 更新 README` - 文档更新
- `refactor: 重构拼音转换逻辑` - 代码重构

## 💡 常见问题

**Q: 如果上传时提示认证失败？**
A: GitHub 现在需要使用 Personal Access Token 而不是密码。生成方法：
1. GitHub 个人设置 → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. 勾选 `repo` 权限
4. 生成后复制 token，在命令行输入密码时使用这个 token

**Q: 如何设置项目主页？**
A: 在仓库 Settings → General → Website 中填入 GitHub Pages 地址

**Q: 如何添加协作者？**
A: Settings → Collaborators → Add people

## 🔗 有用的链接

- Git 官方文档: https://git-scm.com/doc
- GitHub 指南: https://docs.github.com/cn
- GitHub Pages 文档: https://docs.github.com/cn/pages

---

如有问题，欢迎查阅 GitHub 官方文档或在项目中提 Issue。
