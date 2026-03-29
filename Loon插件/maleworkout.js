let url = $request.url;
let method = $request.method;
let body = $response.body;

console.log('[MaleWorkout] Intercepted: ' + url);

try {
    if (body) {
        let obj = JSON.parse(body);
        
        if (obj.data) {
            obj.data.isPremium = true;
            obj.data.isPro = true;
            obj.data.isVip = true;
            obj.data.subscriptionType = "premium";
            obj.data.expireDate = "2099-12-31T23:59:59Z";
            obj.data.premiumFeatures = {
                advancedWorkouts: true,
                customPlans: true,
                noAds: true,
                offlineMode: true,
                unlimitedAccess: true
            };
            
            if (obj.data.user) {
                obj.data.user.isPremium = true;
                obj.data.user.isPro = true;
                obj.data.user.isVip = true;
            }
        }
        
        if (obj.result) {
            obj.result.isPremium = true;
            obj.result.isPro = true;
            obj.result.isVip = true;
        }
        
        body = JSON.stringify(obj);
        console.log('[MaleWorkout] Modified response successfully');
    }
} catch (e) {
    console.log('[MaleWorkout] Error: ' + e);
}

$done({body});
