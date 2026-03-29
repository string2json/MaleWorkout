let url = $request.url;
let body = $response.body;

console.log('[MaleWorkout] Intercepted: ' + url);
console.log('[MaleWorkout] Response type: ' + typeof body);

try {
    if (!body) {
        console.log('[MaleWorkout] No response body');
        $done({});
        return;
    }

    if (typeof body === 'string') {
        console.log('[MaleWorkout] String response detected');
        console.log('[MaleWorkout] Body preview: ' + body.substring(0, 200));
        
        try {
            let obj = JSON.parse(body);
            console.log('[MaleWorkout] Parsed JSON successfully');
            console.log('[MaleWorkout] JSON keys: ' + Object.keys(obj).join(', '));
            
            if (obj.data) {
                obj.data.isPremium = true;
                obj.data.isPro = true;
                obj.data.isVip = true;
                obj.data.subscriptionType = "premium";
                obj.data.expireDate = "2030-12-31T23:59:59Z";
            }
            
            if (obj.result) {
                obj.result.isPremium = true;
                obj.result.isPro = true;
                obj.result.isVip = true;
            }
            
            body = JSON.stringify(obj);
            console.log('[MaleWorkout] Modified JSON response');
            $done({body});
        } catch (parseError) {
            console.log('[MaleWorkout] JSON parse failed: ' + parseError);
            $done({});
        }
    } else if (typeof body === 'object') {
        console.log('[MaleWorkout] Binary/object response detected');
        console.log('[MaleWorkout] This might be compressed or protobuf data');
        console.log('[MaleWorkout] Skipping modification - need to find VIP status API');
        $done({});
    } else {
        console.log('[MaleWorkout] Unknown response type: ' + typeof body);
        $done({});
    }
} catch (e) {
    console.log('[MaleWorkout] Error: ' + e);
    console.log('[MaleWorkout] Stack: ' + e.stack);
    $done({});
}
