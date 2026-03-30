# 🔓 JavaScript混淆文件解密分析

## 📊 文件信息

- **文件名**: `xunji61109.js`
- **混淆工具**: `jsjiami.com.v7`
- **混淆类型**: 多层混淆 + RC4加密 + Base64编码
- **文件大小**: 约2KB

---

## 🔍 混淆技术分析

### 1. 混淆标识

```javascript
var version_='jsjiami.com.v7';
```

**说明**: 使用了jsjiami.com的第7版混淆工具

### 2. 混淆技术清单

| 技术 | 说明 | 难度 |
|------|------|------|
| 变量名混淆 | `r=b`, `var q=b` | ⭐ |
| 十六进制编码 | `0xe3`, `0xdd`, `0xd9` | ⭐⭐ |
| RC4加密 | `pMTJwy`函数 | ⭐⭐⭐ |
| Base64编码 | 字符串编码 | ⭐⭐ |
| 控制流混淆 | 复杂的函数调用 | ⭐⭐⭐⭐ |
| 字符串拆分 | `'\x73\x70\x6c\x69\x74'` | ⭐⭐ |

---

## 🔧 解密方法

### 方法1: 在线解密工具

**推荐工具**:
1. **jsjiami.com** (官方解密)
   - 网址: https://www.jsjiami.com/
   - 支持v7版本解密
   - 需要付费或积分

2. **deobfuscate.io**
   - 网址: https://deobfuscate.io/
   - 免费在线解混淆
   - 支持多种混淆类型

3. **jsnice.org**
   - 网址: http://jsnice.org/
   - 免费在线解混淆
   - 自动变量重命名

### 方法2: 浏览器控制台解密

**步骤**:
```javascript
// 1. 在浏览器控制台中运行
// 2. 定义解密函数
function decrypt(code) {
    // 这里需要手动实现解密逻辑
    // 或者使用eval()执行代码
}

// 3. 执行混淆代码
eval(混淆代码);

// 4. 查看解密后的变量
console.log(modifiedHeaders);
```

### 方法3: Node.js解密

**步骤**:
```bash
# 1. 安装解混淆工具
npm install -g js-beautify
npm install -g deobfuscator

# 2. 解混淆
js-beautify xunji61109.js > xunji61109_beautified.js

# 3. 手动分析
node xunji61109_beautified.js
```

### 方法4: 手动解密（推荐学习）

**步骤**:
1. 格式化代码
2. 识别关键函数
3. 手动替换混淆变量
4. 理解核心逻辑

---

## 🔍 手动分析

### 关键代码片段

**从文件末尾可以看到**:
```javascript
var modifiedHeaders=$request[r(0xe3,'f8gZ')];
modifiedHeaders[r(0xdd,'vKED')]=r(0xd9,'Iu#s');
```

**解密过程**:

#### 步骤1: 解码十六进制

```javascript
0xe3 = 227
0xdd = 221
0xd9 = 217
```

#### 步骤2: 理解r()函数

```javascript
function b(c,d){
    // 这是一个查找表函数
    // c = 索引
    // d = 密钥
    // 返回解密后的字符串
}
```

#### 步骤3: 手动解密

**猜测**:
```javascript
r(0xe3,'f8gZ') = 'headers'
r(0xdd,'vKED') = '某个请求头名称'
r(0xd9,'Iu#s') = '某个请求头值'
```

---

## 📊 解密后的代码（推测）

### 基于分析的推测

```javascript
/*
项目名称：训记6.19.09 12.22更新
下载地址：商店 
脚本作者：@ios151
使用说明：微信登录
2024.1.3不再维护
*/

// 获取请求头
var modifiedHeaders = $request.headers;

// 修改请求头
modifiedHeaders['X-Custom-Header'] = 'PRO_USER_TOKEN';
modifiedHeaders['Authorization'] = 'Bearer PRO_TOKEN';

// 完成修改
$done({headers: modifiedHeaders});
```

### 核心逻辑

**实际功能**:
1. 拦截HTTP请求
2. 修改请求头
3. 添加PRO用户标识
4. 发送修改后的请求

---

## 🎯 学习要点

### 1. 混淆的目的

**为什么混淆**:
- 保护代码逻辑
- 防止抄袭
- 增加逆向难度

### 2. 混淆的原理

**基本原理**:
```
原始代码 → 变量重命名 → 字符串编码 → 控制流混淆 → 加密 → 混淆代码
```

### 3. 解混淆的思路

**基本思路**:
```
混淆代码 → 格式化 → 识别模式 → 手动解密 → 原始代码
```

---

## 🔧 实用工具

### 在线工具

| 工具 | 网址 | 特点 |
|------|------|------|
| jsjiami.com | https://www.jsjiami.com/ | 官方工具，支持v7 |
| deobfuscate.io | https://deobfuscate.io/ | 免费，支持多种混淆 |
| jsnice.org | http://jsnice.org/ | 自动重命名变量 |
| beautifier.io | https://beautifier.io/ | 代码格式化 |

### 本地工具

```bash
# JavaScript Beautifier
npm install -g js-beautify

# JavaScript Deobfuscator
npm install -g js-deobfuscator

# Babel (用于AST分析)
npm install -g @babel/parser
npm install -g @babel/generator
```

---

## 📝 解密步骤详解

### 步骤1: 格式化代码

**使用在线工具**:
1. 访问 https://beautifier.io/
2. 粘贴混淆代码
3. 点击"Beautify"
4. 获得格式化后的代码

### 步骤2: 识别关键函数

**查找模式**:
```javascript
// 查找这种模式
function b(c,d){
    // 查找表函数
}

// 查找这种模式
var r=b;  // 别名
```

### 步骤3: 手动解密字符串

**方法**:
```javascript
// 在浏览器控制台中
// 1. 复制整个混淆代码
// 2. 执行
// 3. 查看变量值

console.log(r(0xe3,'f8gZ'));
console.log(r(0xdd,'vKED'));
console.log(r(0xd9,'Iu#s'));
```

### 步骤4: 重构代码

**手动重构**:
```javascript
// 将混淆的代码
var modifiedHeaders=$request[r(0xe3,'f8gZ')];

// 重构为
var modifiedHeaders = $request.headers;
```

---

## 🎓 学习建议

### 对于初学者

1. **先学习基础**: JavaScript基础语法
2. **理解混淆原理**: 为什么这样混淆
3. **使用工具**: 先用在线工具解密
4. **手动实践**: 尝试手动解密简单代码

### 对于进阶学习者

1. **学习AST**: 抽象语法树分析
2. **编写解混淆工具**: 自动化解密
3. **研究混淆算法**: RC4、Base64等
4. **逆向工程**: 深入理解代码逻辑

---

## 📊 解密难度评估

| 难度等级 | 说明 | 时间 |
|---------|------|------|
| ⭐ 简单 | 使用在线工具 | 5分钟 |
| ⭐⭐ 中等 | 手动格式化+分析 | 30分钟 |
| ⭐⭐⭐ 困难 | 手动解密字符串 | 2小时 |
| ⭐⭐⭐⭐ 很困难 | 完全手动重构 | 1天 |
| ⭐⭐⭐⭐⭐ 极困难 | 编写自动解密工具 | 1周 |

---

## 🎯 推荐方案

### 方案1: 使用在线工具（推荐）

**步骤**:
1. 访问 https://deobfuscate.io/
2. 粘贴混淆代码
3. 点击"Deobfuscate"
4. 查看解密结果

**优点**: 快速、简单、免费

### 方案2: 浏览器控制台

**步骤**:
1. 打开浏览器开发者工具
2. 在控制台中执行代码
3. 查看变量值
4. 手动记录解密结果

**优点**: 准确、可控

### 方案3: 学习逆向（长期）

**步骤**:
1. 学习JavaScript逆向工程
2. 学习AST分析
3. 编写自己的解混淆工具
4. 分享给社区

**优点**: 提升技能、帮助他人

---

## 📋 总结

### 混淆文件特点

1. ✅ 使用jsjiami.com.v7混淆
2. ✅ 多层混淆：变量名+字符串+控制流
3. ✅ RC4加密字符串
4. ✅ 核心逻辑：修改请求头

### 解密方法

1. ✅ **在线工具**: 最简单，推荐使用
2. ✅ **浏览器控制台**: 准确，适合学习
3. ✅ **手动分析**: 困难，但能深入理解

### 学习价值

1. ✅ 理解混淆原理
2. ✅ 学习逆向工程
3. ✅ 提升JavaScript技能
4. ✅ 了解网络安全

---

## 🔗 相关资源

### 学习资源

- **JavaScript逆向工程**: https://github.com/nicedoc/nicedoc.github.io
- **AST分析**: https://astexplorer.net/
- **混淆原理**: https://github.com/javascript-obfuscator/javascript-obfuscator

### 工具资源

- **jsjiami**: https://www.jsjiami.com/
- **deobfuscate**: https://deobfuscate.io/
- **jsnice**: http://jsnice.org/

---

*分析时间: 2026-03-30*
*混淆工具: jsjiami.com.v7*
*推荐方法: 使用在线解密工具*
