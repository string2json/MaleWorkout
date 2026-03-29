$dylibPath = "c:\Users\String\Desktop\com.lenglengyu.srjsjlbpro_0.0.1_iphoneos-arm\data\Library\MobileSubstrate\DynamicLibraries\srjsjlbpro.dylib"
$bytes = [System.IO.File]::ReadAllBytes($dylibPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$pattern = '[\x20-\x7E]{4,}'
$matches = [regex]::Matches($text, $pattern)
$strings = $matches | ForEach-Object { $_.Value }
$strings | Select-Object -Unique | Out-File "c:\Users\String\Desktop\com.lenglengyu.srjsjlbpro_0.0.1_iphoneos-arm\all_strings.txt" -Encoding UTF8
Write-Host "提取完成，共找到 $($strings | Select-Object -Unique | Measure-Object | Select-Object -ExpandProperty Count) 个字符串"
