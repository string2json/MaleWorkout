console.log('[*] UserDefaults Dump Script Started');

if (ObjC.available) {
    const NSUserDefaults = ObjC.classes.NSUserDefaults;
    const standardUserDefaults = NSUserDefaults.standardUserDefaults();
    
    const dictionary = standardUserDefaults.dictionaryRepresentation();
    const allKeys = dictionary.allKeys();
    
    console.log('[*] Dumping all UserDefaults keys:');
    console.log('[*] Total keys: ' + allKeys.count());
    console.log('');
    
    const vipKeys = [];
    
    for (let i = 0; i < allKeys.count(); i++) {
        const key = allKeys.objectAtIndex_(i).toString();
        const value = standardUserDefaults.objectForKey_(key);
        
        if (key.toLowerCase().includes('vip') ||
            key.toLowerCase().includes('pro') ||
            key.toLowerCase().includes('premium') ||
            key.toLowerCase().includes('subscription') ||
            key.toLowerCase().includes('purchase') ||
            key.toLowerCase().includes('member') ||
            key.toLowerCase().includes('entitlement') ||
            key.toLowerCase().includes('unlock') ||
            key.toLowerCase().includes('is') ||
            key.toLowerCase().includes('has') ||
            key.toLowerCase().includes('paid') ||
            key.toLowerCase().includes('expire') ||
            key.toLowerCase().includes('trial')) {
            
            vipKeys.push({
                key: key,
                value: value.toString(),
                type: value.$className
            });
        }
    }
    
    console.log('[+] Found ' + vipKeys.length + ' potential VIP keys:');
    console.log('');
    
    vipKeys.forEach(function(item) {
        console.log('[+] Key: ' + item.key);
        console.log('    Value: ' + item.value);
        console.log('    Type: ' + item.type);
        console.log('');
    });
    
    console.log('[*] Dump complete');
    
} else {
    console.log('[-] Objective-C runtime not available');
}
