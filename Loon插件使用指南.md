# Loon插件使用完整指南

## 📋 目录
1. [插件文件说明](#插件文件说明)
2. [安装方法](#安装方法)
3. [配置步骤](#配置步骤)
4. [测试验证](#测试验证)
5. [常见问题](#常见问题)
6. [高级配置](#高级配置)

---

## 📦 插件文件说明

### 标准Loon插件包含两个文件：

#### 1. `.plugin` 文件（配置文件）
这是插件的主配置文件，包含：
- 插件元信息（名称、描述、作者等）
- Script规则（定义要拦截的URL和对应的脚本）
- MITM配置（中间人攻击的主机名）

**文件位置**: `MaleWorkout.plugin`

#### 2. `.js` 文件（脚本文件）
这是实际执行修改的JavaScript脚本，负责：
- 拦截HTTP响应
- 修改JSON数据
- 返回修改后的内容

**文件位置**: `maleworkout.js`

---

## 🚀 安装方法

### 方法1: 在线安装（推荐）

#### 步骤1: 上传文件到GitHub
1. 创建GitHub仓库（如：`MaleWorkout-Plugin`）
2. 上传两个文件：
   - `MaleWorkout.plugin`
   - `maleworkout.js`
3. 获取Raw链接：
   ```
   https://raw.githubusercontent.com/你的用户名/MaleWorkout-Plugin/main/MaleWorkout.plugin
   ```

#### 步骤2: 在Loon中安装
1. 打开Loon应用
2. 进入：**配置** → **插件**
3. 点击右上角 **+** 号
4. 选择 **URL**
5. 粘贴插件的Raw链接
6. 点击 **安装**

### 方法2: 本地安装

#### 步骤1: 传输文件到iOS设备
使用以下任一方法：
- **AirDrop**: 将文件发送到iOS设备
- **iCloud**: 上传到iCloud Drive
- **邮件**: 发送邮件给自己并下载附件

#### 步骤2: 在Loon中导入
1. 打开Loon应用
2. 进入：**配置** → **插件**
3. 点击右上角 **+** 号
4. 选择 **文件**
5. 找到并选择 `.plugin` 文件
6. 点击 **导入**

---

## ⚙️ 配置步骤

### 步骤1: 启用插件
1. 在Loon中：**配置** → **插件**
2. 找到 `MaleWorkout健身解锁`
3. 打开右侧的 **开关**
4. 插件应该显示为 **已启用** 状态

### 步骤2: 配置MITM（中间人攻击）

#### 2.1 安装Loon证书
1. 在Loon中：**配置** → **MITM**
2. 点击 **安装证书**
3. 系统会提示下载配置描述文件
4. 允许下载

#### 2.2 信任证书
1. 打开iOS **设置**
2. 进入：**通用** → **关于本机** → **证书信任设置**
3. 找到 `Loon` 证书
4. 打开右侧的 **开关**
5. 系统会提示警告，点击 **继续**

#### 2.3 验证证书
1. 返回Loon
2. 进入：**配置** → **MITM**
3. 证书状态应显示为 **已信任** ✓

### 步骤3: 添加主机名
1. 在Loon中：**配置** → **MITM**
2. 点击 **添加主机名**
3. 输入：`api.maleworkout.com`
4. 点击 **确定**
5. 再添加：`*.maleworkout.com`

### 步骤4: 启用Loon
1. 在Loon首页
2. 打开顶部的 **总开关**
3. 选择一个节点（任意节点即可）
4. 状态应显示为 **已连接**

---

## ✅ 测试验证

### 测试步骤：

#### 1. 清除应用数据（重要！）
```
设置 → 通用 → iPhone存储空间 → MaleWorkout → 删除应用
重新从App Store安装MaleWorkout
```

#### 2. 打开Loon日志
1. 在Loon中：**工具** → **日志**
2. 清空日志
3. 保持日志页面打开

#### 3. 打开MaleWorkout应用
1. 启动MaleWorkout
2. 观察Loon日志输出

#### 4. 检查拦截日志
应该看到类似的日志：
```
[MaleWorkout] Intercepted: https://api.maleworkout.com/api/user/profile
[MaleWorkout] Modified response successfully
```

#### 5. 验证功能解锁
在MaleWorkout应用中检查：
- Pro功能是否可用
- VIP标识是否显示
- 高级训练计划是否解锁
- 广告是否消失

---

## ❓ 常见问题

### 问题1: 插件不生效，没有拦截到请求

**解决方案**:
```
1. 检查MITM证书是否已信任
   设置 → 通用 → 关于本机 → 证书信任设置

2. 检查主机名是否正确
   Loon → 配置 → MITM → 确认包含 api.maleworkout.com

3. 检查插件是否已启用
   Loon → 配置 → 插件 → 确认开关已打开

4. 检查Loon是否已连接
   Loon首页 → 确认总开关已打开
```

### 问题2: 应用闪退或无法打开

**解决方案**:
```
1. 可能是API地址不正确
   需要抓包确认实际的API地址

2. 可能是响应格式不匹配
   需要分析实际的响应JSON结构

3. 应用可能有反调试机制
   尝试使用更温和的修改方式
```

### 问题3: 功能解锁不完整

**解决方案**:
```
1. 可能需要修改多个API
   查看Loon日志，找到所有相关请求

2. 可能需要修改多个字段
   分析响应JSON，找到所有VIP相关字段

3. 可能有本地验证
   需要使用Frida进行本地Hook
```

### 问题4: 证书安装失败

**解决方案**:
```
1. 检查是否已安装其他VPN应用的证书
   可能会冲突，需要先删除

2. 重启iOS设备后重试

3. 检查iOS版本是否支持
   需要iOS 12.2及以上版本
```

### 问题5: 无法连接到GitHub下载插件

**解决方案**:
```
1. 使用国内镜像
   将 github.com 替换为 github.com.cnpmjs.org

2. 使用Gitee
   上传到Gitee仓库，使用Gitee链接

3. 本地安装
   使用AirDrop或iCloud传输文件
```

---

## 🔧 高级配置

### 自定义API地址

如果实际的API地址与插件不同，需要修改：

#### 1. 编辑插件文件
在Loon中：
```
配置 → 插件 → MaleWorkout健身解锁 → 编辑
```

#### 2. 修改Script规则
找到这一行：
```
http-response https?:\/\/.*maleworkout.*\/api\/(user|profile|subscription|vip|member)
```

根据实际情况修改，例如：
```
http-response https?:\/\/api\.maleworkout\.com\/v1\/user\/info
```

#### 3. 保存并重新启用插件

### 自定义脚本逻辑

如果需要修改更多字段，编辑 `maleworkout.js`：

```javascript
// 添加更多字段修改
if (obj.data) {
    obj.data.isPremium = true;
    obj.data.isPro = true;
    obj.data.isVip = true;
    
    // 添加你发现的字段
    obj.data.newField = true;
    obj.data.anotherField = "premium";
}
```

### 调试模式

启用详细日志：
```javascript
// 在脚本开头添加
console.log('[Debug] URL: ' + url);
console.log('[Debug] Original body: ' + body);

// 修改后
console.log('[Debug] Modified body: ' + JSON.stringify(obj));
```

---

## 📊 抓包分析（如果插件不生效）

### 使用Charles抓包

#### 1. 配置Charles
```
1. 安装Charles证书到iOS设备
2. 配置iOS设备代理指向电脑
3. 在Charles中启用SSL代理
```

#### 2. 捕获MaleWorkout请求
```
1. 打开MaleWorkout应用
2. 在Charles中查看所有请求
3. 筛选包含 vip, pro, premium 的请求
```

#### 3. 分析响应结构
```
1. 查看响应JSON
2. 找到VIP状态相关的字段
3. 记录字段名称和结构
```

#### 4. 更新插件
根据实际响应结构修改：
- `.plugin` 文件中的URL匹配规则
- `.js` 文件中的字段修改逻辑

---

## 🎯 完整示例

### 示例1: 简单的VIP解锁

**plugin文件**:
```ini
#!name=Simple VIP Unlock
#!desc=简单VIP解锁示例

[Script]
http-response https?:\/\/api\.example\.com\/user script-path=script.js,requires-body=true, timeout=10, tag=VIP解锁

[MITM]
hostname = api.example.com
```

**script.js**:
```javascript
let obj = JSON.parse($response.body);
obj.data.isVip = true;
$done({body: JSON.stringify(obj)});
```

### 示例2: 多接口解锁

**plugin文件**:
```ini
#!name=Multi API Unlock
#!desc=多接口解锁示例

[Script]
http-response https?:\/\/api\.example\.com\/user script-path=user.js,requires-body=true, timeout=10, tag=用户信息
http-response https?:\/\/api\.example\.com\/subscription script-path=subscription.js,requires-body=true, timeout=10, tag=订阅信息

[MITM]
hostname = api.example.com
```

---

## 📝 注意事项

### 法律和道德
1. ⚠️ **仅供学习研究** - 不要用于商业用途
2. ⚠️ **尊重版权** - 支持正版应用
3. ⚠️ **个人使用** - 不要分发或分享
4. ⚠️ **风险自负** - 可能导致账号封禁

### 技术限制
1. 应用更新后可能失效
2. 某些功能需要服务器验证
3. 可能有反调试机制
4. 需要定期维护更新

### 最佳实践
1. 使用测试账号
2. 定期备份数据
3. 关注应用更新
4. 参与社区交流

---

## 🆘 获取帮助

### 社区资源
- [Loon官方文档](https://nsloon.app/docs/)
- [Telegram群组](https://t.me/Functional_Store_Hub)
- [GitHub Issues](https://github.com/yourusername/MaleWorkout-Plugin/issues)

### 调试技巧
1. 查看Loon日志
2. 使用Charles抓包
3. 检查网络连接
4. 验证证书信任

---

## 📚 进阶学习

### 推荐阅读
1. [Loon脚本编写指南](https://nsloon.app/docs/script/)
2. [JavaScript基础教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
3. [HTTP协议详解](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)
4. [正则表达式教程](https://regexr.com/)

### 相关工具
- **Charles Proxy** - 抓包分析
- **Fiddler** - Windows抓包工具
- **mitmproxy** - 命令行抓包工具
- **JSON Editor** - JSON编辑器

---

## 🎉 总结

### 快速检查清单
- [ ] 插件文件已上传到GitHub
- [ ] 在Loon中成功安装插件
- [ ] MITM证书已安装并信任
- [ ] 主机名已正确配置
- [ ] Loon已连接并运行
- [ ] 查看日志确认拦截成功
- [ ] 应用功能已解锁

### 成功标志
✅ Loon日志显示拦截成功
✅ 应用显示VIP/Pro标识
✅ 高级功能可以正常使用
✅ 没有广告显示

---

**祝你使用愉快！如有问题，请查看常见问题部分或寻求社区帮助。** 🚀
