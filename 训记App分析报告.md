# 🔍 训记App抓包分析报告

## 📊 基本信息

- **应用名称**: 训记 (trainnote)
- **Bundle ID**: 待确认
- **API域名**: 
  - api.xunjiapp.cn (主要API)
  - trains.xunjiapp.cn (训练数据)
  - eatings.xunjiapp.cn (饮食数据)
  - tupian.xunjiapp.cn (图片/视频资源)

---

## 🔍 发现的API请求

### 1. 用户信息检查
```
URL: https://api.xunjiapp.cn/whole_user_info_checks_3
方法: POST
请求体: {"checksum":"869SZLQ1Kg54Rc2fqX\/wZA=="}
响应: 加密数据 (en_data字段)
```

**关键发现**: 响应数据是加密的！
```json
{
  "success": true,
  "res": {
    "en_data": "hft82ZAFHav5YF7/d4Htfeh8Q2JL65CcKoDVvIdivpqvR13veU9YZ...",
    "_userid": "1774837894888",
    "sign": "5a7f9fe71282e72e3604a694772a5a267ed85cae..."
  }
}
```

### 2. 训练计划检查
```
URL: https://api.xunjiapp.cn/have_universal_plan_v2
方法: POST
请求体: {"datestr":"2026-03-30","cache":{}}
响应: {"success":true,"res":{"pt":{},"tn":{}}}
```

### 3. 策略获取
```
URL: https://api.xunjiapp.cn/fetch_policy
方法: GET
响应: {"success":true,"res":{"id":3446786,"openid":"oFdEg1G7QbJkD4NEVfAmTYZGvaKE","isgrand":true,...}}
```

### 4. 其他API
- `/get_bodyall_limit_gzip` - 获取身体数据
- `/after310/ios` - 版本检查
- `/convertLocalToV3` - 数据转换
- `/personalworkout/fetch/v2` - 个人训练数据
- `/train_sync/pull` - 训练数据同步
- `/challenge_syncs` - 挑战数据同步

---

## ⚠️ 关键发现

### 1. 数据加密 🔒

**最重要的发现**: 用户信息API返回的数据是加密的！

```json
{
  "en_data": "hft82ZAFHav5YF7/d4Htfeh8Q2JL65CcKoDVvIdivpqvR13veU9YZ...",
  "sign": "5a7f9fe71282e72e3604a694772a5a267ed85cae..."
}
```

**这意味着**:
- ❌ 无法直接修改响应数据
- ❌ 无法通过Loon插件修改VIP状态
- ❌ 应用使用端到端加密

### 2. PRO资源访问

发现多个PRO资源请求：
```
/xunjipro/00251201-Barbell-Bench-Press_Chest_withnewxunji.mp4
/xunjipro/barbell-bench-press-bar-2.png
/xunjipro/barbell-bench-press-bar.png
/xunjipro/barbell-bench-press-front.png
```

**这意味着**:
- ✅ PRO资源通过URL路径区分
- ⚠️ 但可能需要服务器端验证

### 3. JWT认证

应用使用JWT Bearer Token认证：
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**JWT解码**:
```json
{
  "openid": "oFdEg1G7QbJkD4NEVfAmTYZGvaKE",
  "iat": 1774831124
}
```

---

## 🚫 为什么无法通过Loon解锁

### 问题1: 数据加密

**最关键的问题**: 用户信息API返回的数据是加密的！

```
请求 → 服务器
服务器 → 加密数据 → 应用
应用 → 解密 → 显示VIP状态
```

**Loon插件的局限性**:
- ✅ 可以拦截请求
- ✅ 可以修改响应
- ❌ **无法解密加密数据**
- ❌ **无法重新加密修改后的数据**

### 问题2: 签名验证

响应中包含签名：
```json
{
  "sign": "5a7f9fe71282e72e3604a694772a5a267ed85cae..."
}
```

**这意味着**:
- 任何修改都会导致签名不匹配
- 应用会验证签名
- 无法伪造响应

### 问题3: 服务器端验证

PRO资源可能需要服务器端验证：
```
请求PRO资源 → 服务器验证VIP状态 → 返回资源或拒绝
```

**即使修改URL也无法绕过服务器验证**。

---

## 📊 对比：训记 vs 私人健身教练

| 特性 | 私人健身教练 | 训记 |
|------|------------|------|
| VIP状态存储 | 本地UserDefaults | 服务器端加密数据 |
| 数据加密 | ❌ 无 | ✅ 有 |
| 签名验证 | ❌ 无 | ✅ 有 |
| 可通过Loon解锁 | ❌ 否 | ❌ 否 |
| 可通过Frida解锁 | ✅ 是 | ❌ 可能需要解密 |

---

## 🎯 结论

### ❌ 无法通过Loon插件解锁

**原因**:
1. **数据加密**: 用户信息API返回加密数据，无法修改
2. **签名验证**: 响应包含签名，无法伪造
3. **服务器验证**: PRO资源需要服务器端验证

### 🔧 可能的解决方案

#### 方案1: Frida Hook（需要越狱）

**理论上可行，但难度很高**:
1. Hook解密函数，获取明文数据
2. 修改VIP状态
3. Hook加密函数，重新加密
4. Hook签名验证，绕过检查

**难点**:
- 需要找到解密函数
- 需要理解加密算法
- 可能使用原生加密库（更难Hook）

#### 方案2: 中间人攻击（复杂）

**理论上可行**:
1. 反编译应用，找到加密密钥
2. 使用密钥解密响应
3. 修改VIP状态
4. 重新加密并签名

**难点**:
- 需要逆向工程
- 密钥可能硬编码在原生代码中
- 可能使用证书绑定

#### 方案3: 修改应用（最复杂）

**最后的选择**:
1. 脱壳（如果有壳）
2. 反编译应用
3. 修改VIP验证逻辑
4. 重新签名安装

**难点**:
- 需要高级逆向技能
- 可能触发完整性检查
- 需要企业证书或越狱

---

## 📝 建议

### 给用户的建议

1. **接受现实**: 训记App使用了更安全的架构，无法简单解锁
2. **考虑付费**: 如果喜欢这个应用，支持开发者
3. **寻找替代**: 寻找其他没有加密的健身应用

### 给开发者的建议

如果想要开发类似应用的安全建议：
1. ✅ 使用端到端加密（训记的做法）
2. ✅ 使用签名验证
3. ✅ 服务器端验证VIP状态
4. ✅ 不要将VIP状态存储在本地

---

## 🔍 技术细节

### 加密数据分析

**en_data字段**:
```
hft82ZAFHav5YF7/d4Htfeh8Q2JL65CcKoDVvIdivpqvR13veU9YZ/Ptm5ObTbHNm3mcp/j1NQuDmxLujmqJMmpDgwfcBoagQ5tXXNTJc93MbNb/1UZsQ/M4LCDkaxi0dcjxYmO5qz3jAFtsddysApZq0PH4NZXV8ljTC5tJ6zAMnaZQxlyjixTMxWqM8L6GAisvyzPD8VbStbeAWKZ8k2WGn90IW6lvBoP+zLTT4ed4uYISC3lPsJSNhLNV1QwL9jaOG07BRGLPXngjioHgTpChgvCJwAT7ZypqRurmYfzJHEcLZHzTkFl7BQ4bKWUQMj6FaoYD0d+OEihCzGOA59OhYm+/wV97g3o7QVrAHOa5cGB4VAnxHeTaBiHa3uVYz4E69xtz2jdRYMc4rQMnzdgBKdkFOzXiQ78Ee+DSDJkuYVDcxdgzBeSPuMI6U9XX
```

**特征**:
- Base64编码
- 长度约400字符
- 可能是AES加密
- 可能包含用户信息、VIP状态等

### 签名分析

**sign字段**:
```
5a7f9fe71282e72e3604a694772a5a267ed85cae309986b1e7baa7d7e900471d...
```

**特征**:
- 64字节十六进制字符串
- 可能是SHA256签名
- 用于验证数据完整性

---

## 📋 总结

**最终结论**: ❌ **无法通过Loon插件解锁训记App的PRO功能**

**原因**:
1. 用户信息API返回加密数据
2. 响应包含签名验证
3. VIP状态存储在服务器端

**建议**:
- 如果需要PRO功能，请考虑付费支持开发者
- 如果想研究逆向工程，可以尝试Frida Hook方案
- 如果寻找替代应用，建议选择没有加密的应用

---

*分析时间: 2026-03-30*
*分析工具: Loon抓包、API分析*
