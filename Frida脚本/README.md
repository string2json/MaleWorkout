# Frida Hook 脚本使用指南

## 📋 文件说明

### 1. hook_vip.js
主要的Hook脚本，用于拦截VIP状态检查。

**功能**：
- ✅ Hook NSUserDefaults的boolForKey方法
- ✅ 自动识别VIP相关的key
- ✅ 强制返回true
- ✅ Hook常见的VIP检查方法

### 2. dump_defaults.js
用于导出UserDefaults中的所有VIP相关key。

**功能**：
- ✅ 列出所有UserDefaults keys
- ✅ 筛选VIP相关的key
- ✅ 显示key的值和类型

### 3. run_hook.py
Python启动脚本，自动注入Hook。

**功能**：
- ✅ 自动连接设备
- ✅ 自动启动应用
- ✅ 自动注入脚本
- ✅ 显示Hook日志

---

## 🚀 快速开始

### 前提条件

#### 1. 越狱iOS设备
- iOS 12-15: checkra1n / unc0ver
- iOS 16+: palera1n / Dopamine

#### 2. 安装Frida（iOS设备）
```bash
# 在Cydia/Sileo中添加源
https://build.frida.re

# 安装Frida包
Frida
```

#### 3. 安装Frida工具（电脑）
```bash
# macOS/Linux
pip install frida-tools

# Windows
pip install frida-tools
```

#### 4. 验证安装
```bash
# 连接iOS设备到电脑
# 运行以下命令
frida-ls-devices

# 应该看到你的设备
```

---

## 📖 使用方法

### 方法1: 使用Python脚本（推荐）

#### 步骤1: 进入脚本目录
```bash
cd "c:\Users\String\Desktop\com.lenglengyu.srjsjlbpro_0.0.1_iphoneos-arm\Frida脚本"
```

#### 步骤2: 运行脚本
```bash
python run_hook.py
```

#### 步骤3: 使用应用
- 脚本会自动启动MaleWorkout应用
- 正常使用应用
- VIP功能应该已解锁

---

### 方法2: 使用命令行

#### 步骤1: 启动应用并注入
```bash
frida -U -f com.abishkking.maleworkout -l hook_vip.js --no-pause
```

#### 步骤2: 查看日志
```
[*] MaleWorkout VIP Unlock Script Started
[+] Objective-C runtime available
[+] Found boolForKey method
[*] Hook setup complete
```

#### 步骤3: 使用应用
- 在应用中触发VIP功能
- 查看Frida日志输出
- 确认Hook生效

---

### 方法3: 附加到运行中的应用

#### 步骤1: 打开MaleWorkout应用
- 在iOS设备上打开应用

#### 步骤2: 附加Frida
```bash
# 方法1: 使用应用名称
frida -U -n MaleWorkout -l hook_vip.js --no-pause

# 方法2: 使用进程ID
frida -U -p <PID> -l hook_vip.js --no-pause
```

---

## 🔍 查找VIP Key

### 使用dump_defaults.js

#### 步骤1: 运行dump脚本
```bash
frida -U -f com.abishkking.maleworkout -l dump_defaults.js --no-pause
```

#### 步骤2: 查看输出
```
[*] Dumping all UserDefaults keys:
[*] Total keys: 123

[+] Found 5 potential VIP keys:

[+] Key: isVip
    Value: 0
    Type: __NSCFBoolean

[+] Key: isPro
    Value: 0
    Type: __NSCFBoolean

[+] Key: subscriptionType
    Value: free
    Type: __NSCFString
```

#### 步骤3: 更新hook_vip.js
根据找到的key，更新hook_vip.js中的匹配规则。

---

## 🎯 高级用法

### 1. 实时修改UserDefaults

```javascript
// 在Frida控制台中运行
const NSUserDefaults = ObjC.classes.NSUserDefaults;
const standardUserDefaults = NSUserDefaults.standardUserDefaults();

// 设置VIP状态
standardUserDefaults.setBool_forKey_(1, "isVip");
standardUserDefaults.setBool_forKey_(1, "isPro");
standardUserDefaults.setBool_forKey_(1, "isPremium");
standardUserDefaults.synchronize();

console.log('[+] VIP status set to true');
```

### 2. Hook特定方法

```javascript
// Hook特定类的特定方法
const UserManager = ObjC.classes.UserManager;

Interceptor.attach(UserManager['- isVip'].implementation, {
    onLeave: function(retval) {
        console.log('[+] isVip called');
        retval.replace(0x1);
    }
});
```

### 3. 保存Hook脚本

将常用的Hook代码保存为独立脚本，方便复用。

---

## ⚠️ 故障排除

### 问题1: 找不到设备
```
[-] Failed to find device
```

**解决方案**：
1. 确认iOS设备已连接到电脑
2. 确认已信任此电脑
3. 重启usbmuxd服务：
   ```bash
   # macOS/Linux
   sudo killall usbmuxd
   sudo usbmuxd -f -v
   ```

### 问题2: 找不到应用
```
[-] Failed to spawn app
```

**解决方案**：
1. 确认应用已安装
2. 确认bundle ID正确：
   ```bash
   frida-ps -Uai
   ```
3. 使用正确的bundle ID

### 问题3: Hook不生效
```
[*] Hook setup complete
但VIP功能未解锁
```

**解决方案**：
1. 运行dump_defaults.js查找正确的key
2. 更新hook_vip.js中的匹配规则
3. 检查应用是否使用了其他验证方式

### 问题4: 应用闪退
```
应用启动后立即闪退
```

**解决方案**：
1. 检查Hook代码是否有语法错误
2. 使用try-catch包裹Hook代码
3. 减少Hook的方法数量

---

## 📊 调试技巧

### 1. 查看所有类
```javascript
for (const className in ObjC.classes) {
    if (ObjC.classes.hasOwnProperty(className)) {
        console.log(className);
    }
}
```

### 2. 查看类的所有方法
```javascript
const className = "UserManager";
const methods = ObjC.classes[className].$ownMethods;
methods.forEach(function(method) {
    console.log(method);
});
```

### 3. 查看方法调用栈
```javascript
Interceptor.attach(someMethod.implementation, {
    onEnter: function(args) {
        console.log(Thread.backtrace(this.context, Backtracer.ACCURATE)
            .map(DebugSymbol.fromAddress).join('\n'));
    }
});
```

---

## 🔐 安全建议

### 1. 使用测试账号
- 不要使用主账号测试
- 创建专门的测试账号

### 2. 备份数据
- 使用前备份应用数据
- 使用iMazing或iCloud备份

### 3. 了解风险
- 可能导致账号被封禁
- 应用更新后可能失效
- 需要保持Frida运行

---

## 📚 参考资源

### Frida官方文档
- [Frida Documentation](https://frida.re/docs/)
- [JavaScript API](https://frida.re/docs/javascript-api/)
- [iOS Examples](https://frida.re/docs/examples/ios/)

### 教程
- [Frida入门教程](https://frida.re/docs/functions/)
- [iOS逆向工程](https://github.com/iosre/iOSAppReverseEngineering)

---

## 🎉 总结

### Loon插件 vs Frida Hook

| 特性 | Loon插件 | Frida Hook |
|------|---------|-----------|
| 拦截网络请求 | ✅ | ✅ |
| 修改本地存储 | ❌ | ✅ |
| Hook方法 | ❌ | ✅ |
| 需要越狱 | ❌ | ✅ |
| 持久化 | ✅ | ❌ |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

### 为什么使用Frida？

**因为VIP/Pro状态存储在本地UserDefaults中，而不是通过网络API验证！**

Loon插件只能拦截网络请求，无法修改本地存储。

Frida可以直接Hook应用方法，强制返回VIP状态。

---

## 📞 需要帮助？

如果遇到问题：
1. 查看本文档的故障排除部分
2. 检查Frida日志输出
3. 使用dump_defaults.js查找正确的key
4. 更新hook_vip.js中的匹配规则

**准备好使用Frida了吗？** 🚀
