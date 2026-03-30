/*
项目名称：训记PRO解锁
脚本作者：基于ios151旧版本改编
适配版本：新版本API
使用说明：需要配合Loon插件使用

更新日志：
- 2026-03-30: 适配新版本API whole_user_info_checks_3
- 基于6.19.09旧版本解锁原理

注意：
- 新版本API返回加密数据，可能需要进一步适配
- 如果不生效，可能需要降级到旧版本APP
*/

let modifiedHeaders = $request.headers;

if (modifiedHeaders) {
    modifiedHeaders['X-Pro-Status'] = '1';
    modifiedHeaders['X-Vip-Level'] = 'pro';
    modifiedHeaders['X-User-Type'] = 'premium';
    
    console.log('[训记PRO] 已修改请求头');
}

$done({ headers: modifiedHeaders });
