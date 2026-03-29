import frida
import sys
import time

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {}".format(message['payload']))
    elif message['type'] == 'error':
        print("[!] Error: {}".format(message['stack']))

def main():
    print("[*] MaleWorkout VIP Unlocker")
    print("[*] Version: 1.0")
    print("[*] Author: string2json")
    print("")
    
    try:
        device = frida.get_usb_device(timeout=10)
        print("[+] Found device: {}".format(device))
    except Exception as e:
        print("[-] Failed to find device: {}".format(e))
        print("[-] Make sure:")
        print("    1. iOS device is connected via USB")
        print("    2. Frida is installed on the device")
        print("    3. USB debugging is enabled")
        sys.exit(1)
    
    print("[*] Spawning MaleWorkout app...")
    try:
        pid = device.spawn(["com.abishkking.maleworkout"])
        print("[+] App spawned with PID: {}".format(pid))
    except Exception as e:
        print("[-] Failed to spawn app: {}".format(e))
        print("[-] Make sure MaleWorkout is installed")
        sys.exit(1)
    
    print("[*] Attaching to process...")
    try:
        session = device.attach(pid)
        print("[+] Attached successfully")
    except Exception as e:
        print("[-] Failed to attach: {}".format(e))
        sys.exit(1)
    
    print("[*] Loading hook script...")
    try:
        with open("hook_vip.js", "r", encoding="utf-8") as f:
            script_code = f.read()
    except FileNotFoundError:
        print("[-] hook_vip.js not found")
        print("[-] Make sure the script is in the same directory")
        sys.exit(1)
    
    try:
        script = session.create_script(script_code)
        script.on('message', on_message)
        script.load()
        print("[+] Script loaded successfully")
    except Exception as e:
        print("[-] Failed to load script: {}".format(e))
        sys.exit(1)
    
    print("[*] Resuming app...")
    try:
        device.resume(pid)
        print("[+] App resumed")
    except Exception as e:
        print("[-] Failed to resume app: {}".format(e))
        sys.exit(1)
    
    print("")
    print("[*] Hook is active!")
    print("[*] Use the app normally")
    print("[*] Press Ctrl+C to stop")
    print("")
    
    try:
        sys.stdin.read()
    except KeyboardInterrupt:
        print("\n[*] Detaching...")
        session.detach()
        print("[+] Done")

if __name__ == "__main__":
    main()
