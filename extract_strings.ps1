$dylibPath = "c:\Users\String\Desktop\com.lenglengyu.srjsjlbpro_0.0.1_iphoneos-arm\data\Library\MobileSubstrate\DynamicLibraries\srjsjlbpro.dylib"
$bytes = [System.IO.File]::ReadAllBytes($dylibPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$pattern = '[\x20-\x7E]{4,}'
$matches = [regex]::Matches($text, $pattern)
$strings = $matches | ForEach-Object { $_.Value } | Where-Object { $_ -match 'vip|pro|premium|isVip|isPro|isPremium|subscription|purchase|unlock|member|entitlement|bool|Boolean' }
$strings | Select-Object -Unique | Select-Object -First 100
