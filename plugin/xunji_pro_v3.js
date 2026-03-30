/*
项目名称：训记PRO解锁 (适配新API)
脚本作者：基于ios151旧版本改编
适配版本：新版本API whole_user_info_checks_3
使用说明：需要配合Loon插件使用

更新日志：
- 2026-03-30: 适配新版本API whole_user_info_checks_3
- 尝试通过修改请求头来解锁PRO

注意：
- 新版本API返回加密数据
- 成功率较低，但值得一试
- 如果不生效，可能需要Frida Hook方案
*/

let modifiedHeaders = $request.headers;

if (modifiedHeaders) {
    modifiedHeaders['X-Pro-Status'] = '1';
    modifiedHeaders['X-Vip-Level'] = 'pro';
    modifiedHeaders['X-User-Type'] = 'premium';
    modifiedHeaders['X-Member-Type'] = 'vip';
    modifiedHeaders['X-Subscription'] = 'active';
    
    console.log('[训记PRO v3] 已修改请求头');
    console.log('[训记PRO v3] API: whole_user_info_checks_3');
}

$done({ headers: modifiedHeaders });
