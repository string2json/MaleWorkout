/*
JavaScript混淆代码手动解密辅助脚本
用途：帮助理解xunji61109.js的混淆逻辑
*/

// ============================================
// 方法1: 浏览器控制台解密
// ============================================

/*
使用步骤：
1. 打开浏览器开发者工具（F12）
2. 切换到Console标签
3. 复制下面的代码并执行
4. 查看解密结果
*/

// 复制原始混淆代码到这里
var originalCode = `
// 粘贴xunji61109.js的内容
`;

// 执行混淆代码（注意：这会执行代码）
try {
    eval(originalCode);
    console.log('=== 解密结果 ===');
    console.log('代码执行成功');
    
    // 尝试查看关键变量
    if (typeof modifiedHeaders !== 'undefined') {
        console.log('modifiedHeaders:', modifiedHeaders);
    }
    
} catch (e) {
    console.error('执行错误:', e);
}

// ============================================
// 方法2: 手动分析关键函数
// ============================================

/*
从混淆代码中提取的关键部分：

1. 混淆标识：
   var version_='jsjiami.com.v7';
   
2. 关键函数：
   function b(c,d) { ... }
   
3. 核心逻辑：
   var modifiedHeaders=$request[r(0xe3,'f8gZ')];
   modifiedHeaders[r(0xdd,'vKED')]=r(0xd9,'Iu#s');
   
4. 推测的解密结果：
   r(0xe3,'f8gZ') = 'headers'
   r(0xdd,'vKED') = '某个请求头名称'
   r(0xd9,'Iu#s') = '某个请求头值'
*/

// ============================================
// 方法3: 使用在线工具
// ============================================

/*
推荐工具：

1. deobfuscate.io
   网址: https://deobfuscate.io/
   使用方法：
   - 打开网站
   - 粘贴混淆代码
   - 点击"Deobfuscate"
   - 查看结果

2. jsnice.org
   网址: http://jsnice.org/
   使用方法：
   - 打开网站
   - 粘贴混淆代码
   - 点击"Niceify"
   - 查看结果

3. beautifier.io
   网址: https://beautifier.io/
   使用方法：
   - 打开网站
   - 粘贴混淆代码
   - 点击"Beautify"
   - 查看格式化后的代码
*/

// ============================================
// 方法4: Node.js解密
// ============================================

/*
使用Node.js解密：

1. 安装工具：
   npm install -g js-beautify
   
2. 格式化代码：
   js-beautify xunji61109.js > xunji61109_formatted.js
   
3. 手动分析格式化后的代码
*/

// ============================================
// 解密后的代码推测
// ============================================

/*
基于分析的推测，解密后的代码可能是：

var modifiedHeaders = $request.headers;

// 修改请求头，添加PRO用户标识
modifiedHeaders['X-Custom-Token'] = 'PRO_USER_TOKEN';
modifiedHeaders['X-User-Level'] = 'pro';

// 完成修改
$done({headers: modifiedHeaders});

核心功能：
1. 拦截HTTP请求
2. 修改请求头
3. 添加PRO用户标识
4. 发送修改后的请求
*/

// ============================================
// 学习要点
// ============================================

/*
混淆技术：
1. 变量名混淆：r=b, var q=b
2. 十六进制编码：0xe3, 0xdd, 0xd9
3. RC4加密：pMTJwy函数
4. Base64编码：字符串编码
5. 控制流混淆：复杂的函数调用

解混淆思路：
1. 格式化代码
2. 识别关键函数
3. 手动解密字符串
4. 重构代码逻辑
*/

console.log('=== 解密辅助脚本加载完成 ===');
console.log('请查看注释中的使用方法');
