import paramiko
import time
import json

def extract_device_info(output):
    # Extract relevant information from the command output
    device_info = {}

    device_info["asset_type"] = "Hardware"
    device_info["status"] = "Active"

    if "show run | i hostname" in output:
        full_customer_account = output.split("hostname ")[-1].split("\n")[0].strip()
        device_info["customer_account"] = full_customer_account.split("-")[0].strip()
        device_info["device_name"] = full_customer_account
    
    if "show version | i Processor" in output:
        device_info["serial_number"] = output.split("Processor board ID ")[-1].split("\n")[0].strip()

    if "show version | i Copyright" in output:
        device_info["manufacturer"] = output.split("by ")[-1].split(" ")[0].strip()
    
    if "sh version | i Version" in output:
        device_info["model"] = output.split("Software (")[-1].split("_")[0].strip()
        device_info["model_version"] = output.split("Version ")[1].split(" ")[0].strip().rstrip(',')

    if "show run | i community" in output:
        device_info["snmp_community_string"] = output.split("community")[-1].split(" ")[1].strip()

    return device_info

def execute_commands(ssh, ip, commands):
    try:
        outputs = {"ip_address": ip}
        
        # Start an interactive shell
        shell = ssh.invoke_shell()

        # Send commands to the shell
        for command in commands:
            print(f"Executing command '{command}' on {ip}:")
            shell.send(command + '\n')
            time.sleep(2)  # Wait for command execution
            output = shell.recv(65535).decode()
            print(output)
            info = extract_device_info(output)
            outputs.update(info)

        return outputs

    except Exception as e:
        print(f"Error executing commands on {ip}: {str(e)}")
        return None

def main():
    # Define your network devices by IP
    devices = [{"ip": "192.168.1.110", "username": "admin", "password": "admin1234"},
               {"ip": "192.168.1.68", "username": "admin", "password": "admin1234"},               
    ]

    # Define the commands you want to execute
    commands = ["show run | i hostname",
                "show version | i Processor",
                "show version | i Copyright",
                "sh version | i Version", 
                "show run | i community",
                ]
    
    # Store collected data in a list
    collected_data = []

    for device in devices:
        print(f"Connecting to {device['ip']}...")
        try:
            # Create SSH client
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

            # Connect to the device
            ssh.connect(device["ip"], username=device["username"], password=device["password"], timeout=10)

            # Execute commands
            outputs = execute_commands(ssh, device["ip"], commands)

            if outputs:
                collected_data.append(outputs)
                print(f"Data collected from {device['ip']}.")

        except Exception as e:
            print(f"Error connecting to {device['ip']}: {str(e)}")

        finally:
            # Close the SSH connection
            ssh.close()
            print(f"Connection to {device['ip']} closed.\n")

        # Save collected data to a JSON file
    with open("collected_data.json", "w") as json_file:
        json.dump(collected_data, json_file, indent=2)

    print("Collected data saved to collected_data.json.")


if __name__ == "__main__":
    main()
