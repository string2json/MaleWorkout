/*
训记PRO解锁 - 字符串表分析
直接输出字符串表内容，手动分析
*/

var version_ = "jsjiami.com.v7";

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

console.log("=== 字符串表分析 ===\n");

var stringTable = a();

console.log("字符串表长度：" + stringTable.length + "\n");

console.log("===========================================");
console.log("字符串表内容（索引从0开始）：");
console.log("===========================================\n");

for (var i = 0; i < stringTable.length; i++) {
    console.log("索引 " + i + " (r(" + (i + 216) + ", key)):");
    console.log("  原始值：" + stringTable[i]);
    console.log("  长度：" + stringTable[i].length);
    console.log("");
}

console.log("===========================================");
console.log("关键索引分析：");
console.log("===========================================\n");

console.log("r(227, 'f8gZ') → 索引 11:");
console.log("  " + stringTable[11] + "\n");

console.log("r(221, 'vKED') → 索引 5:");
console.log("  " + stringTable[5] + "\n");

console.log("r(217, 'Iu#s') → 索引 1:");
console.log("  " + stringTable[1] + "\n");

console.log("r(231, 'D0Sh') → 索引 15:");
console.log("  " + stringTable[15] + "\n");

console.log("===========================================");
console.log("推测分析：");
console.log("===========================================\n");

console.log("基于常见模式推测：");
console.log("1. r(227, 'f8gZ') 可能是 'headers'");
console.log("2. r(221, 'vKED') 可能是某个请求头名称（如 'Authorization'）");
console.log("3. r(217, 'Iu#s') 可能是PRO用户标识");
console.log("4. r(231, 'D0Sh') 可能是 'User-Agent'\n");

console.log("⚠️  注意：");
console.log("这些字符串是加密的，需要使用正确的RC4密钥解密");
console.log("密钥就是函数调用中的第二个参数\n");

console.log("=== 分析完成 ===");
