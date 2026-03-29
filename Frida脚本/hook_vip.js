console.log('[*] MaleWorkout Hook Script Loaded');

if (ObjC.available) {
    console.log('[+] Objective-C runtime available');
    
    var targetClasses = [];
    
    for (var className in ObjC.classes) {
        if (ObjC.classes.hasOwnProperty(className)) {
            var methods = ObjC.classes[className].$ownMethods;
            methods.forEach(function(method) {
                var methodLower = method.toLowerCase();
                if (methodLower.includes('vip') || 
                    methodLower.includes('premium') || 
                    methodLower.includes('pro') ||
                    methodLower.includes('subscribe') ||
                    methodLower.includes('purchase') ||
                    methodLower.includes('paid') ||
                    methodLower.includes('member') ||
                    methodLower.includes('unlock') ||
                    methodLower.includes('valid') ||
                    methodLower.includes('expire') ||
                    methodLower.includes('license')) {
                    console.log('[+] Found: ' + className + ' ' + method);
                    targetClasses.push({className: className, method: method});
                }
            });
        }
    }
    
    console.log('[*] Total found: ' + targetClasses.length + ' methods');
    
    targetClasses.forEach(function(item) {
        try {
            var className = item.className;
            var methodName = item.method;
            
            if (methodName.includes('is') || methodName.includes('has') || methodName.includes('can')) {
                console.log('[*] Hooking: ' + className + ' ' + methodName);
                
                Interceptor.attach(
                    ObjC.classes[className][methodName].implementation,
                    {
                        onLeave: function(retval) {
                            console.log('[Hook] ' + className + ' ' + methodName);
                            console.log('  Original return: ' + retval);
                            retval.replace(0x1);
                            console.log('  Modified to: true');
                        }
                    }
                );
            }
        } catch (e) {
            console.log('[-] Failed to hook: ' + item.className + ' ' + item.method);
            console.log('  Error: ' + e);
        }
    });
    
    console.log('[+] Hook script initialized');
    
} else {
    console.log('[-] Objective-C runtime not available');
}
