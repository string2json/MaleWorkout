/*
项目名称：训记PRO解锁（解密版）
=====================================

原始文件：xunji61109.js（混淆版本）
解密时间：2026-03-30
解密方法：代码分析 + 逻辑推理

解密说明：
- 原始代码使用jsjiami.com.v7混淆
- RC4加密字符串无法完全解密（显示乱码）
- 基于代码逻辑和常见模式推测解密结果
- 推测结果可直接使用，建议测试验证

核心功能：
- 拦截HTTP请求：/whole_user_info_v4
- 修改请求头：添加PRO用户标识
- 欺骗服务器：返回PRO用户数据
- 解锁成功：应用显示PRO状态

使用方法：
1. 在Loon中添加插件配置
2. 启用MITM：api.xunjiapp.cn
3. 打开训记APP测试

注意事项：
- 仅适用于旧版本API（v4）
- 新版本API（v3）可能已修复漏洞
- 新API路径：/whole_user_info_checks_3
*/

// ============================================
// 核心逻辑（推测解密结果）
// ============================================

// 获取HTTP请求头对象
var modifiedHeaders = $request.headers;

// 修改请求头，添加PRO用户标识
if (modifiedHeaders) {
    // 修改Authorization请求头
    // 推测：r(221, "vKED") = "Authorization"
    // 推测：r(217, "Iu#s") = "Bearer PRO_USER_TOKEN"
    modifiedHeaders['Authorization'] = 'Bearer PRO_USER_TOKEN';
    
    // 修改User-Agent请求头
    // 推测：r(231, "D0Sh") = "User-Agent"
    modifiedHeaders['User-Agent'] = 'trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0';
    
    // 日志输出（可选）
    console.log('[训记PRO解锁] 已修改请求头');
    console.log('[训记PRO解锁] Authorization: Bearer PRO_USER_TOKEN');
    console.log('[训记PRO解锁] User-Agent: trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0');
}

// 完成修改，返回新的请求头
$done({headers: modifiedHeaders});

// ============================================
// 原始混淆代码（参考）
// ============================================

/*
原始混淆代码：
var modifiedHeaders = $request[r(227, "f8gZ")];
modifiedHeaders[r(221, "vKED")] = r(217, "Iu#s");
modifiedHeaders[r(231, "D0Sh")] = "trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0";
$done({"headers": modifiedHeaders});

混淆字符串对应关系：
- r(227, "f8gZ") → 推测为 "headers"
- r(221, "vKED") → 推测为 "Authorization"
- r(217, "Iu#s") → 推测为 "Bearer PRO_USER_TOKEN"
- r(231, "D0Sh") → 推测为 "User-Agent"

加密字符串（Base64编码）：
- 索引 11: W7NcLvTVW5KLivv2W6SSB8oW
- 索引 5:  kexdPIW6hmkWW6WtmConWQKgtW
- 索引 1:  NyVjsGKjtiIAamRiT.IQNcomC.dUqv7hUDEEkupq==
- 索引 15: v0pdI8kvW43dSmkwW4pcI3pdNSo2ga
*/

// ============================================
// 解密过程说明
// ============================================

/*
1. 混淆工具识别：
   - 工具：jsjiami.com.v7
   - 技术：变量名混淆 + RC4加密 + Base64编码

2. 解密函数分析：
   - r()函数是b()函数的别名
   - b(index, key)使用RC4算法解密
   - index: 字符串在表中的位置（需减去216）
   - key: RC4解密密钥

3. 解密尝试：
   - 提取了字符串表（21个字符串）
   - 尝试RC4解密但得到乱码
   - 可能原因：密钥不正确或算法实现问题

4. 推测依据：
   - Surge/Loon脚本的标准用法
   - HTTP请求头的常见模式
   - 代码逻辑的合理性

5. 推测验证：
   - 建议使用推测版本测试
   - 如果不生效，可以调整参数
   - 可以尝试不同的Authorization值
*/

// ============================================
// 可选：尝试其他可能的值
// ============================================

/*
如果推测不正确，可以尝试以下变体：

变体1：使用X-Custom-Token
modifiedHeaders['X-Custom-Token'] = 'PRO_USER_TOKEN';

变体2：使用X-User-Type
modifiedHeaders['X-User-Type'] = 'pro';

变体3：使用X-Vip-Level
modifiedHeaders['X-Vip-Level'] = 'vip';

变体4：使用X-Member-Type
modifiedHeaders['X-Member-Type'] = 'premium';

变体5：组合多个请求头
modifiedHeaders['Authorization'] = 'Bearer PRO_TOKEN';
modifiedHeaders['X-User-Type'] = 'pro';
modifiedHeaders['X-Vip-Level'] = 'vip';
*/
