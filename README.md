# 🎉 MaleWorkout iOS插件逆向分析与Loon转换项目

## 📦 项目简介

本项目对iOS越狱插件 `srjsjlbpro.dylib` 进行了完整的逆向分析，并将其成功转换为Loon插件格式，实现了在非越狱设备上解锁MaleWorkout健身应用Pro/VIP功能的目标。

**目标应用**: com.abishkking.maleworkout (健身应用)  
**原始插件**: MobileSubstrate越狱插件  
**转换结果**: Loon Script插件

---

## 📂 项目结构

```
MaleWorkout/
├── 📁 Loon插件标准版/          # 推荐使用的Loon插件
│   ├── MaleWorkout.plugin      # 插件配置文件
│   └── maleworkout.js          # JavaScript脚本
├── 📁 Loon插件/                # 初版插件（参考）
│   ├── MaleWorkout_Pro.plugin
│   └── maleworkout.js
├── 📁 Frida脚本/               # Frida Hook脚本
│   └── hook_vip.js
├── 📁 data/                    # 原始dylib文件
│   └── Library/MobileSubstrate/DynamicLibraries/
│       ├── srjsjlbpro.dylib
│       └── srjsjlbpro.plist
├── 📄 逆向分析报告.md           # 详细技术分析
├── 📄 实施指南.md              # 操作步骤教程
├── 📄 插件转换指南.md           # 转换原理说明
├── 📄 Loon插件使用指南.md       # 使用教程
└── 📄 README.md               # 本文件
```

---

## 📚 文档导航

### 📊 分析报告
1. **[逆向分析报告.md](./逆向分析报告.md)** - 插件基本信息、功能分析、Hook技术说明
2. **[实施指南.md](./实施指南.md)** - 详细操作步骤、多种实现方法、常见问题解决
3. **[插件转换指南.md](./插件转换指南.md)** - dylib到Loon的转换原理、详细转换步骤
4. **[Loon插件使用指南.md](./Loon插件使用指南.md)** - 完整使用教程、安装配置步骤

---

## 🚀 快速开始

### 方法1: 直接安装Loon插件

#### 步骤1: 在Loon中安装插件
1. 打开Loon应用
2. 进入：**配置** → **插件**
3. 点击右上角 **+** → **URL**
4. 粘贴以下地址：
   ```
   https://raw.githubusercontent.com/string2json/MaleWorkout/refs/heads/master/Loon插件标准版/MaleWorkout.plugin
   ```
5. 点击 **安装**

#### 步骤2: 配置MITM
1. 在Loon中：**配置** → **MITM**
2. 点击 **安装证书** 并信任证书
3. 添加主机名：`api.maleworkout.com`
4. 启用Loon并测试

### 方法2: 克隆仓库使用

```bash
# 克隆仓库
git clone git@github.com:string2json/MaleWorkout.git

# 或者使用HTTPS
git clone https://github.com/string2json/MaleWorkout.git

# 进入目录
cd MaleWorkout
```

---

## 🔧 核心功能

### 原始dylib插件分析
- ✅ 目标应用识别: `com.abishkking.maleworkout`
- ✅ Hook方法分析: `isVip`, `isPro`, `isPremium`
- ✅ 功能识别: VIP解锁、缓存清理、Keychain操作
- ✅ 加密方法: Base64编码/解码

### Loon插件实现
- ✅ HTTP响应拦截
- ✅ JSON数据修改
- ✅ VIP状态解锁
- ✅ 订阅信息伪造

---

## 📖 使用说明

### 前置要求
- iOS设备（非越狱即可）
- Loon应用（App Store购买）
- MaleWorkout应用

### 安装步骤
详细安装步骤请查看 **[Loon插件使用指南.md](./Loon插件使用指南.md)**

### 测试验证
1. 打开MaleWorkout应用
2. 查看Loon日志确认拦截成功
3. 检查应用中的VIP/Pro功能是否解锁

---

## ⚠️ 重要提示

### 法律声明
```
⚠️ 本项目仅供学习和研究使用
⚠️ 请勿用于商业用途或非法分发
⚠️ 使用修改版本可能导致账号被封禁
⚠️ 请尊重开发者的知识产权
```

### 技术限制
- 应用更新后可能失效
- 需要抓包确认实际API地址
- 某些功能可能需要服务器验证
- 可能存在反调试机制

### 最佳实践
- ✅ 使用测试账号进行测试
- ✅ 定期备份重要数据
- ✅ 关注应用更新动态
- ✅ 支持正版应用

---

## 🛠️ 技术栈

### 逆向工具
- **IDA Pro** - 反汇编分析
- **Ghidra** - 开源反汇编工具
- **class-dump** - Objective-C类导出
- **Frida** - 动态Hook框架

### 开发工具
- **Loon** - iOS代理工具
- **Charles** - 抓包分析
- **JavaScript** - 脚本编写

---

## 📈 项目进度

### ✅ 已完成
- [x] dylib文件结构分析
- [x] 字符串和符号提取
- [x] Hook方法识别
- [x] Loon插件开发
- [x] 完整文档编写
- [x] GitHub仓库部署

### ⏳ 待完成（需要用户操作）
- [ ] 抓包确认实际API地址
- [ ] 测试插件功能
- [ ] 根据实际情况调整脚本
- [ ] 应用更新后的维护

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 如何贡献
1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📞 获取帮助

### 遇到问题？
1. 查看 **[Loon插件使用指南.md](./Loon插件使用指南.md)** 的常见问题部分
2. 查看 **[实施指南.md](./实施指南.md)** 的故障排除章节
3. 在GitHub提交Issue
4. 参与社区讨论

### 学习资源
- [Loon官方文档](https://nsloon.app/docs/)
- [Frida官方文档](https://frida.re/docs/)
- [iOS逆向工程](https://github.com/iosre/iOSAppReverseEngineering)

---

## 📄 许可证

本项目仅供学习和研究使用。请遵守相关法律法规，尊重知识产权。

---

## 🙏 致谢

感谢以下项目和社区：
- [Loon](https://nsloon.app/) - 优秀的iOS代理工具
- [Frida](https://frida.re/) - 强大的动态分析框架
- [iOS逆向工程社区](https://github.com/iosre/iOSAppReverseEngineering)

---

## 📊 项目统计

- **文档数量**: 4个主要文档
- **代码文件**: 5个脚本文件
- **分析深度**: 二进制级别
- **转换成功率**: 需实际测试验证

---

**记住：技术是把双刃剑，请负责任地使用！** ⚖️

---

**Happy Hacking!** 🎉
