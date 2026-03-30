/*
训记PRO解锁 - 简洁版
直接可用的解密后代码
*/

var modifiedHeaders = $request.headers;

if (modifiedHeaders) {
    modifiedHeaders['Authorization'] = 'Bearer PRO_USER_TOKEN';
    modifiedHeaders['User-Agent'] = 'trainnote/1 CFNetwork/1325.0.1 Darwin/21.1.0';
}

$done({headers: modifiedHeaders});
