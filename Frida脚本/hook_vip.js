console.log('[*] MaleWorkout VIP Unlock Script Started');
console.log('[*] Version: 1.0');
console.log('[*] Author: string2json');

if (ObjC.available) {
    console.log('[+] Objective-C runtime available');
    
    const NSUserDefaults = ObjC.classes.NSUserDefaults;
    
    const boolForKey = NSUserDefaults['- boolForKey:'];
    
    if (boolForKey) {
        console.log('[+] Found boolForKey method');
        
        Interceptor.attach(boolForKey.implementation, {
            onEnter: function(args) {
                const key = ObjC.Object(args[2]).toString();
                this.key = key;
            },
            onLeave: function(retval) {
                const key = this.key;
                
                if (key.toLowerCase().includes('vip') ||
                    key.toLowerCase().includes('pro') ||
                    key.toLowerCase().includes('premium') ||
                    key.toLowerCase().includes('subscription') ||
                    key.toLowerCase().includes('purchase') ||
                    key.toLowerCase().includes('unlock') ||
                    key.toLowerCase().includes('member') ||
                    key.toLowerCase().includes('entitlement') ||
                    key.toLowerCase().includes('is') ||
                    key.toLowerCase().includes('has')) {
                    
                    console.log('[+] Intercepted key: ' + key);
                    console.log('[+] Original value: ' + retval);
                    retval.replace(0x1);
                    console.log('[+] Modified to: true');
                }
            }
        });
    }
    
    const classes = [
        'User', 'Account', 'Subscription', 'VIP', 'Premium', 'Member',
        'Purchase', 'Payment', 'Entitlement', 'UserManager', 'AccountManager',
        'UserData', 'UserInfo', 'UserProfile', 'SubscriptionManager'
    ];
    
    classes.forEach(function(className) {
        if (ObjC.classes[className]) {
            console.log('[+] Found class: ' + className);
            
            const methods = ObjC.classes[className].$ownMethods;
            methods.forEach(function(method) {
                if (method.toLowerCase().includes('vip') ||
                    method.toLowerCase().includes('pro') ||
                    method.toLowerCase().includes('premium') ||
                    method.toLowerCase().includes('subscription') ||
                    method.toLowerCase().includes('purchase') ||
                    method.toLowerCase().includes('unlock')) {
                    
                    console.log('[+] Found VIP method: ' + className + ' ' + method);
                    
                    try {
                        Interceptor.attach(ObjC.classes[className][method].implementation, {
                            onLeave: function(retval) {
                                console.log('[+] Hooked: ' + className + ' ' + method);
                                console.log('[+] Original return: ' + retval);
                                retval.replace(0x1);
                                console.log('[+] Modified to: true');
                            }
                        });
                    } catch (e) {
                        console.log('[-] Failed to hook: ' + className + ' ' + method);
                        console.log('[-] Error: ' + e);
                    }
                }
            });
        }
    });
    
    console.log('[*] Hook setup complete');
    console.log('[*] Please interact with the app to trigger VIP checks');
    
} else {
    console.log('[-] Objective-C runtime not available');
}
