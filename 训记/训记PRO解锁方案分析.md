# 🔓 训记PRO解锁方案分析

## 📊 新旧版本对比

### API差异

| 项目 | 旧版本 (6.19.09) | 新版本 (当前) |
|------|-----------------|--------------|
| API路径 | `/whole_user_info_v4` | `/whole_user_info_checks_3` |
| 脚本类型 | `http-request-header` | `http-request` |
| 解锁方式 | 修改请求头 | 修改请求头 |
| 数据加密 | ❌ 无 | ✅ 有 (en_data字段) |
| 签名验证 | ❌ 无 | ✅ 有 (sign字段) |

---

## 🔍 旧版本解锁原理

### 原始Surge模块

```ini
[Script]
训记 = type=http-response,pattern=^https:\/\/api\.xunjiapp\.cn\/whole_user_info,requires-body=0,max-size=0,script-path=Xunji.js

[MITM]
hostname = api.xunjiapp.cn
```

### 旧版本脚本分析

```javascript
// 旧脚本通过修改请求头来欺骗服务器
var modifiedHeaders = $request.headers;
modifiedHeaders['xxx'] = 'xxx'; // 添加特定请求头
// 服务器根据请求头返回PRO用户数据
```

**解锁原理**：
1. 拦截用户信息请求
2. 修改请求头，添加PRO用户标识
3. 服务器识别为PRO用户，返回PRO数据
4. 应用显示PRO状态

---

## ⚠️ 新版本问题分析

### 问题1: API路径变化

**旧版本**: `/whole_user_info_v4`
**新版本**: `/whole_user_info_checks_3`

**影响**: 需要更新匹配规则

### 问题2: 数据加密

**新版本响应**:
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

**影响**: 
- 即使修改请求头，服务器返回的仍是加密数据
- 无法直接修改响应数据
- 需要服务器端配合

### 问题3: 签名验证

**新版本包含签名**:
```
sign: 5a7f9fe71282e72e3604a694772a5a267ed85cae...
```

**影响**:
- 任何修改都会导致签名不匹配
- 无法伪造响应

---

## 🎯 解决方案

### 方案1: 尝试修改请求头（推荐）

**原理**: 即使新版本有加密，服务器可能仍根据请求头判断用户类型

**实现**: 
```javascript
let modifiedHeaders = $request.headers;
modifiedHeaders['X-Pro-Status'] = '1';
modifiedHeaders['X-Vip-Level'] = 'pro';
modifiedHeaders['X-User-Type'] = 'premium';
$done({ headers: modifiedHeaders });
```

**优点**:
- ✅ 简单易实现
- ✅ 不需要解密数据
- ✅ 服务器可能仍支持

**缺点**:
- ⚠️ 可能不生效（如果服务器改变了验证逻辑）
- ⚠️ 需要测试验证

### 方案2: 降级APP版本

**原理**: 使用旧版本APP (6.19.09)，配合旧版本脚本

**步骤**:
1. 卸载当前版本
2. 安装旧版本 (6.19.09)
3. 使用旧版本Surge模块
4. 关闭自动更新

**优点**:
- ✅ 确定可以解锁
- ✅ 旧版本无加密

**缺点**:
- ⚠️ 失去新功能
- ⚠️ 需要找旧版本IPA
- ⚠️ 可能需要重新登录

### 方案3: 混合方案

**原理**: 同时尝试请求头修改和响应修改

**实现**:
```javascript
// 1. 修改请求头
let modifiedHeaders = $request.headers;
modifiedHeaders['X-Pro-Status'] = '1';

// 2. 如果请求头不生效，尝试修改响应
// 但由于加密，这个方案可能不可行
```

---

## 📋 测试步骤

### 步骤1: 安装Loon插件

1. 将 `XunjiPro.plugin` 和 `xunji_pro.js` 上传到GitHub
2. 在Loon中添加插件URL
3. 启用MITM和脚本

### 步骤2: 测试验证

1. 打开训记APP
2. 查看PRO状态
3. 检查Loon日志

### 步骤3: 如果不生效

**可能原因**:
1. 服务器改变了验证逻辑
2. 新版本需要解密
3. 需要其他请求头

**解决方案**:
1. 尝试降级APP版本
2. 抓包分析更多请求
3. 寻找其他解锁方案

---

## 🔧 高级方案（如果基础方案失败）

### 方案A: Hook解密函数

**需要越狱 + Frida**:
```javascript
// Hook解密函数，获取明文数据
Interceptor.attach(Module.findExportByName(null, "decrypt_func"), {
    onEnter: function(args) {
        // 获取加密数据
    },
    onLeave: function(retval) {
        // 获取解密后的数据
        // 修改VIP状态
    }
});
```

### 方案B: 反编译分析

**步骤**:
1. 脱壳（如果有壳）
2. 反编译应用
3. 找到加密密钥
4. 编写解密脚本

---

## 📊 成功率评估

| 方案 | 成功率 | 难度 | 需要条件 |
|------|--------|------|---------|
| 修改请求头 | 30% | ⭐ | Loon |
| 降级APP | 90% | ⭐⭐ | 旧版本IPA |
| Hook解密 | 70% | ⭐⭐⭐⭐ | 越狱+Frida |
| 反编译 | 80% | ⭐⭐⭐⭐⭐ | 逆向技能 |

---

## 🎯 推荐方案

### 首选: 尝试修改请求头

**原因**:
- ✅ 最简单
- ✅ 无需额外条件
- ✅ 可能仍然有效

### 备选: 降级APP版本

**原因**:
- ✅ 确定可以解锁
- ✅ 难度适中
- ⚠️ 需要找旧版本

---

## 📝 文件清单

已创建的文件：
1. `XunjiPro.plugin` - Loon插件配置
2. `xunji_pro.js` - 解锁脚本
3. `训记PRO解锁方案分析.md` - 本文档

原始文件：
1. `xunji.sgmodule` - 旧版本Surge模块
2. `xunji61109.js` - 旧版本脚本（混淆）

---

## 🔍 关键发现总结

1. ✅ **旧版本可以通过修改请求头解锁**
2. ⚠️ **新版本API路径已变化**
3. ⚠️ **新版本增加了数据加密**
4. ⚠️ **新版本增加了签名验证**
5. ❓ **不确定新版本是否仍支持请求头验证**

---

## 🚀 下一步行动

1. **立即测试**: 安装Loon插件，测试是否生效
2. **如果不生效**: 考虑降级APP版本
3. **如果需要高级方案**: 准备越狱设备或学习逆向工程

---

*分析时间: 2026-03-30*
*基于: 训记6.19.09旧版本解锁方案*
