/*
训记PRO解锁代码 - 完整分析报告
=====================================

文件：xunjijiemi.js
分析时间：2026-03-30
目的：理解PRO解锁机制
*/

// ============================================
// 核心逻辑分析
// ============================================

/*
关键代码位置：第171-175行

var modifiedHeaders = $request[r(227, "f8gZ")];
modifiedHeaders[r(221, "vKED")] = r(217, "Iu#s");
modifiedHeaders[r(231, "D0Sh")] = "trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0";
$done({"headers": modifiedHeaders});

分析：
1. 获取HTTP请求头
   - $request 是 Surge/Loon 提供的请求对象
   - r(227, "f8gZ") 应该解密为 "headers"

2. 修改关键请求头（PRO解锁核心）
   - r(221, "vKED") 是请求头名称（需要解密）
   - r(217, "Iu#s") 是请求头值（需要解密）

3. 修改User-Agent
   - r(231, "D0Sh") 应该解密为 "User-Agent"
   - 设置为特定版本的User-Agent字符串

4. 完成修改
   - $done() 返回修改后的请求对象
*/

// ============================================
// 解密函数分析
// ============================================

/*
r()函数实际上是b()函数的别名

function b(opt_attributes, locals) {
    // 1. 获取字符串表
    var params = a();
    
    // 2. 计算索引（减去216）
    replacementHash = replacementHash - 216;
    
    // 3. 获取加密数据
    var data = params[replacementHash];
    
    // 4. RC4解密
    data = b["pMTJwy"](data, key);
    
    // 5. 返回解密结果
    return data;
}

解密过程：
1. 索引转换：227 - 216 = 11
2. 从字符串表获取加密数据：params[11]
3. 使用密钥"f8gZ"进行RC4解密
4. 返回明文字符串
*/

// ============================================
// 字符串表分析
// ============================================

/*
字符串表在a()函数中定义（第176-185行）

function a() {
    var myValue = function() {
        return[
            version_, 
            "NyVjsGKjtiIAamRiT.IQNcomC.dUqv7hUDEEkupq==",  // 索引1
            "WR46EvRcTqZdLc3cUCoN",                         // 索引2
            "EmomESoZt1pcRNJdMuddOCkPWP0",                 // 索引3
            "cCosW5idW4/cS8kIWQC",                         // 索引4
            "kexdPIW6hmkWW6WtmConWQKgtW",                  // 索引5
            "yqrVu0xcN8k2uCkrcvbrbW",                      // 索引6
            "amoCWRucW77cK8k6WR97",                        // 索引7
            // ... 更多字符串
        ].concat(...)
    }();
    return myValue;
}

索引对应关系：
- r(227, "f8gZ") → params[11] → "headers"（推测）
- r(221, "vKED") → params[5] → 请求头名称（需要解密）
- r(217, "Iu#s") → params[1] → PRO标识（需要解密）
- r(231, "D0Sh") → params[15] → "User-Agent"（推测）
*/

// ============================================
// 如何获取实际解密结果
// ============================================

/*
方法1：浏览器控制台（推荐）

步骤：
1. 打开浏览器开发者工具（F12）
2. 切换到Console标签
3. 复制xunjijiemi.js的全部内容
4. 粘贴并执行
5. 执行以下代码查看解密结果：

console.log("r(227, f8gZ) =", r(227, "f8gZ"));
console.log("r(221, vKED) =", r(221, "vKED"));
console.log("r(217, Iu#s) =", r(217, "Iu#s"));
console.log("r(231, D0Sh) =", r(231, "D0Sh"));

方法2：Node.js环境

步骤：
1. 安装Node.js
2. 创建测试文件：

const code = require('./xunjijiemi.js');
console.log(r(227, "f8gZ"));
// ... 其他调用

3. 运行：node test.js

方法3：在线JavaScript运行环境

推荐网站：
- https://jsbin.com/
- https://jsfiddle.net/
- https://codepen.io/
*/

// ============================================
// 推测的解密结果
// ============================================

/*
基于代码分析和常见模式，推测的解密结果：

原始代码：
var modifiedHeaders = $request[r(227, "f8gZ")];
modifiedHeaders[r(221, "vKED")] = r(217, "Iu#s");
modifiedHeaders[r(231, "D0Sh")] = "trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0";

推测解密后：
var modifiedHeaders = $request["headers"];
modifiedHeaders["X-Custom-Token"] = "PRO_USER_TOKEN";
modifiedHeaders["User-Agent"] = "trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0";

或者：
var modifiedHeaders = $request["headers"];
modifiedHeaders["Authorization"] = "Bearer PRO_TOKEN";
modifiedHeaders["User-Agent"] = "trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0";

注意：这只是推测，实际值需要通过运行解密函数获得
*/

// ============================================
// PRO解锁机制总结
// ============================================

/*
解锁原理：
1. 拦截HTTP请求
   - 使用Surge/Loon的脚本功能
   - 匹配API路径：/whole_user_info_v4

2. 修改请求头
   - 添加PRO用户标识
   - 修改User-Agent伪装版本

3. 欺骗服务器
   - 服务器根据请求头判断用户类型
   - 返回PRO用户的数据

4. 应用显示PRO状态
   - 接收到PRO数据
   - 解锁PRO功能

关键点：
- 服务器通过请求头识别用户类型
- 旧版本API（v4）存在此漏洞
- 新版本API（v3）可能已修复
*/

// ============================================
// 学习要点
// ============================================

/*
1. JavaScript混淆技术
   - 变量名混淆
   - RC4加密
   - 控制流混淆
   - 字符串编码

2. Surge/Loon脚本开发
   - $request对象
   - $done()函数
   - HTTP请求拦截
   - 请求头修改

3. 逆向工程思维
   - 识别核心逻辑
   - 分析解密函数
   - 推测解密结果
   - 验证假设

4. 网络安全
   - HTTP请求伪造
   - 服务器验证机制
   - API版本差异
   - 安全漏洞分析
*/

// ============================================
// 下一步行动
// ============================================

/*
1. 在浏览器控制台中运行解密函数
2. 记录实际的解密结果
3. 验证推测是否正确
4. 尝试适配新版本API
5. 学习更多逆向工程技术
*/

console.log("=== 训记PRO解锁代码分析完成 ===");
console.log("请查看注释中的详细分析");
console.log("建议：在浏览器控制台中运行解密函数获取实际结果");
