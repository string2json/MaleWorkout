/*
训记PRO解锁 - 增强版解密脚本
修复URI编码问题
*/

var version_ = "jsjiami.com.v7";
var r = b;

function b(opt_attributes, locals) {
    var params = a();
    return b = function(replacementHash, key) {
        replacementHash = replacementHash - 216;
        var data = params[replacementHash];
        if (b["GPiuVV"] === undefined) {
            var getOwnPropertyNames = function(o) {
                var classNames = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
                var dots = "";
                var sign = "";
                var bc = 0;
                var bs;
                var buffer;
                var n = 0;
                for (;buffer = o["charAt"](n++);~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? dots += String["fromCharCode"](255 & bs >> (-2 * bc & 6)) : 0) {
                    buffer = classNames["indexOf"](buffer);
                }
                var i = 0;
                var ii = dots["length"];
                for (;i < ii;i++) {
                    var charCode = dots["charCodeAt"](i);
                    var hex = charCode["toString"](16);
                    sign += "%" + ("00" + hex)["slice"](-2);
                }
                try {
                    return decodeURIComponent(sign);
                } catch (e) {
                    return unescape(sign);
                }
            };
            var find = function(obj, collection) {
                var s = [];
                var y = 0;
                var value;
                var results = "";
                obj = getOwnPropertyNames(obj);
                var x;
                x = 0;
                for (;x < 256;x++) {
                    s[x] = x;
                }
                x = 0;
                for (;x < 256;x++) {
                    y = (y + s[x] + collection["charCodeAt"](x % collection["length"])) % 256;
                    value = s[x];
                    s[x] = s[y];
                    s[y] = value;
                }
                x = 0;
                y = 0;
                var i = 0;
                for (;i < obj["length"];i++) {
                    x = (x + 1) % 256;
                    y = (y + s[x]) % 256;
                    value = s[x];
                    s[x] = s[y];
                    s[y] = value;
                    results += String["fromCharCode"](obj["charCodeAt"](i) ^ s[(s[x] + s[y]) % 256]);
                }
                return results;
            };
            b["pMTJwy"] = find;
            opt_attributes = arguments;
            b["GPiuVV"] = !![];
        }
        var param = params[0];
        var unlock = replacementHash + param;
        var cache = opt_attributes[unlock];
        return!cache ? (b["ZmqLfw"] === undefined && (b["ZmqLfw"] = !![]), data = b["pMTJwy"](data, key), opt_attributes[unlock] = data) : data = cache, data;
    }, b(opt_attributes, locals);
}

function a() {
    var myValue = function() {
        return[version_, "NyVjsGKjtiIAamRiT.IQNcomC.dUqv7hUDEEkupq==", "WR46EvRcTqZdLc3cUCoN", "EmomESoZt1pcRNJdMuddOCkPWP0", "cCosW5idW4/cS8kIWQC", "kexdPIW6hmkWW6WtmConWQKgtW", "yqrVu0xcN8k2uCkrcvbrbW", "amoCWRucW77cK8k6WR97"].concat(function() {
            return["C8o4Emkpjmk+W4O", "W5VcT8o2W67cGmkmhq", "W5JdOZbbCuq8W6ZcVCoUW79k", "W7NcLvTVW5KLivv2W6SSB8oW", "WO4lW7hdK8oToXqqxG", "W4JcG3dcJsGCESkxW6lcKa", "vmoAWRNcOcNcTYVcHqFcT8osW7bz", "v0pdI8kvW43dSmkwW4pcI3pdNSo2ga"].concat(function() {
                return["rcCwWRhcNmk7oq", "oxT7nWldH8o7aa", "WOJdGqiQWO5Um2PPW4SEx8oTW4jYwSoOWOdcGWmaBmk/WRK6W5BdOJO3g8kkWR7dICkbW6W3l8o1WOtdJCo3W6JdMCo8WRjhuCoECCk2mwhdN8kKkmk/uCo4nSoVW6hdIvTBr8oIWQO8ymodm1juyvpdOhhcMN/cJ8oGW7/dSSotWRnmWP8DWOdcRmk1gttdG8oWut/dUSosAwPNW74PlsKFDcqFWOpcRsqlEt99W4RcT8kBWRTyW6KBW4WlzgNdT0eNWRddI8kMWPJdKCothComW4zwqSogdNZcSKdcQYFcPMRcNgBdGcGBt8kutSkbf3RdJgbuiG", "dSkCW6TNeZddM8kWWO1fD8oQWR0", "m8k1sCoIDmowowpdLIa"];
            }());
        }());
    }();
    a = function() {
        return myValue;
    };
    return a();
}

console.log("=== 开始解密 ===\n");

try {
    var result1 = r(227, "f8gZ");
    var result2 = r(221, "vKED");
    var result3 = r(217, "Iu#s");
    var result4 = r(231, "D0Sh");

    console.log("✅ 解密成功！\n");
    console.log("===========================================");
    console.log("关键字符串解密结果：");
    console.log("===========================================\n");
    
    console.log("1. r(227, 'f8gZ') = \"" + result1 + "\"");
    console.log("2. r(221, 'vKED') = \"" + result2 + "\"");
    console.log("3. r(217, 'Iu#s') = \"" + result3 + "\"");
    console.log("4. r(231, 'D0Sh') = \"" + result4 + "\"");
    
    console.log("\n===========================================");
    console.log("解密后的完整代码：");
    console.log("===========================================\n");
    
    console.log("var modifiedHeaders = $request[\"" + result1 + "\"];");
    console.log("modifiedHeaders[\"" + result2 + "\"] = \"" + result3 + "\";");
    console.log("modifiedHeaders[\"" + result4 + "\"] = \"trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0\";");
    console.log("$done({\"headers\": modifiedHeaders});");
    
    console.log("\n===========================================");
    console.log("PRO解锁机制分析：");
    console.log("===========================================\n");
    
    console.log("🔓 解锁原理：");
    console.log("   通过修改HTTP请求头 \"" + result2 + "\" 为 \"" + result3 + "\"");
    console.log("   欺骗服务器认为当前用户是PRO用户\n");
    
    console.log("🎯 关键发现：");
    console.log("   - 修改的请求头：" + result2);
    console.log("   - 设置的值：" + result3);
    console.log("   - User-Agent伪装：" + result4);
    console.log("   - 目标API：/whole_user_info_v4\n");
    
    console.log("⚠️  注意：");
    console.log("   - 这是旧版本API（v4）的解锁方法");
    console.log("   - 新版本API（v3）可能已修复此漏洞");
    console.log("   - 新API路径：/whole_user_info_checks_3\n");
    
} catch (e) {
    console.log("❌ 解密失败：" + e.message);
    console.log("错误堆栈：" + e.stack);
}

console.log("\n=== 解密完成 ===");
