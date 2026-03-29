$filePath = "c:\Users\String\Desktop\com.lenglengyu.srjsjlbpro_0.0.1_iphoneos-arm\data\Library\MobileSubstrate\DynamicLibraries\srjsjlbpro.dylib"
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)
$strings = [regex]::Matches($text, '[\x20-\x7E]{4,}') | ForEach-Object { $_.Value }

Write-Host "=== Objective-C Methods ===" -ForegroundColor Green
$strings | Where-Object { $_ -match '^[\-\+]\[[A-Za-z]+\s' -or $_ -match '^[a-z][a-zA-Z0-9]*:$' -or $_ -match '^[a-z][a-zA-Z0-9]*:[a-z][a-zA-Z0-9]*:$' } | Select-Object -Unique

Write-Host "`n=== Class Names ===" -ForegroundColor Green
$strings | Where-Object { $_ -match '^[A-Z][a-zA-Z0-9]*$' -and $_.Length -gt 5 -and $_.Length -lt 40 } | Select-Object -Unique | Select-Object -First 50

Write-Host "`n=== Interesting Strings ===" -ForegroundColor Green
$strings | Where-Object { 
    $_ -match 'pro|vip|premium|unlock|purchase|subscribe|member|paid|activate|license|expired|valid' -and 
    $_ -notmatch '^[A-Z][a-z]{1,3}$'
} | Select-Object -Unique | Select-Object -First 50

Write-Host "`n=== URLs and Domains ===" -ForegroundColor Green
$strings | Where-Object { $_ -match 'http|api|\.com|\.net|\.cn' } | Select-Object -Unique

Write-Host "`n=== MSHook Related ===" -ForegroundColor Green
$strings | Where-Object { $_ -match 'MSHook|Hook|hook' } | Select-Object -Unique

Write-Host "`n=== Keychain Related ===" -ForegroundColor Green
$strings | Where-Object { $_ -match 'keychain|Keychain|password|Password|account|Account' } | Select-Object -Unique
