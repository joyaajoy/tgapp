import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Server, 
  Cloud, 
  Terminal, 
  Copy, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Download,
  Settings,
  Shield
} from 'lucide-react';

export function DeploymentGuide() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('aws');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const providers = [
    { id: 'aws', name: 'AWS EC2', icon: Cloud, difficulty: 'Medium' },
    { id: 'digitalocean', name: 'DigitalOcean', icon: Server, difficulty: 'Easy' },
    { id: 'docker', name: 'Docker', icon: Terminal, difficulty: 'Easy' },
    { id: 'telegram', name: 'Telegram Bot', icon: Shield, difficulty: 'Medium' },
  ];

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Deployment Method</CardTitle>
          <CardDescription>
            Select your preferred platform for VPN deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                variant={selectedProvider === provider.id ? 'default' : 'outline'}
                className="h-20 flex flex-col gap-2"
                onClick={() => setSelectedProvider(provider.id)}
              >
                <provider.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{provider.name}</div>
                  <Badge variant="secondary" className="text-xs">
                    {provider.difficulty}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedProvider} onValueChange={setSelectedProvider}>
        <TabsContent value="aws">
          <AwsDeployment copyToClipboard={copyToClipboard} copiedText={copiedText} />
        </TabsContent>
        <TabsContent value="digitalocean">
          <DigitalOceanDeployment copyToClipboard={copyToClipboard} copiedText={copiedText} />
        </TabsContent>
        <TabsContent value="docker">
          <DockerDeployment copyToClipboard={copyToClipboard} copiedText={copiedText} />
        </TabsContent>
        <TabsContent value="telegram">
          <TelegramBotDeployment copyToClipboard={copyToClipboard} copiedText={copiedText} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AwsDeployment({ copyToClipboard, copiedText }: { copyToClipboard: (text: string, label: string) => void, copiedText: string | null }) {
  const launchScript = `#!/bin/bash
# AWS EC2 VPN Server Setup Script
sudo apt update && sudo apt upgrade -y
sudo apt install -y wireguard wireguard-tools

# Generate server keys
wg genkey | sudo tee /etc/wireguard/server_private.key
sudo cat /etc/wireguard/server_private.key | wg pubkey | sudo tee /etc/wireguard/server_public.key

# Configure WireGuard
sudo tee /etc/wireguard/wg0.conf << EOF
[Interface]
Address = 10.0.0.1/24
SaveConfig = true
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = $(sudo cat /etc/wireguard/server_private.key)
EOF

# Enable IP forwarding
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Start WireGuard
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            AWS EC2 Deployment
          </CardTitle>
          <CardDescription>
            Deploy your VPN server on Amazon Web Services EC2
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Make sure you have AWS CLI configured and appropriate IAM permissions.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Step 1: Launch EC2 Instance</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Launch a new EC2 instance with the following specifications:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Instance Type: t3.micro (Free tier eligible)</li>
                <li>OS: Ubuntu 22.04 LTS</li>
                <li>Security Group: Allow ports 22 (SSH), 51820 (WireGuard)</li>
                <li>Storage: 8GB GP3 (minimum)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Step 2: Configure Security Group</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  Inbound Rules:
                  - SSH (22) from Your IP
                  - Custom UDP (51820) from 0.0.0.0/0
                  - HTTPS (443) from 0.0.0.0/0
                  - HTTP (80) from 0.0.0.0/0
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Step 3: Run Installation Script</h4>
              <div className="bg-muted p-4 rounded-lg relative">
                <pre className="text-sm overflow-x-auto">{launchScript}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(launchScript, 'aws-script')}
                >
                  {copiedText === 'aws-script' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Step 4: Configure Telegram Bot</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Set up your Telegram bot to manage the VPN server:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  export BOT_TOKEN="your_bot_token_here"
                  export SERVER_IP="your_ec2_public_ip"
                  export ADMIN_CHAT_ID="your_telegram_chat_id"
                </pre>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href="https://console.aws.amazon.com/ec2" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                AWS Console
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://docs.aws.amazon.com/ec2/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                EC2 Documentation
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DigitalOceanDeployment({ copyToClipboard, copiedText }: { copyToClipboard: (text: string, label: string) => void, copiedText: string | null }) {
  const doScript = `#!/bin/bash
# DigitalOcean VPN Droplet Setup
curl -fsSL https://raw.githubusercontent.com/your-repo/vpn-telegram-bot/main/install.sh | bash

# Alternative manual setup
sudo apt update && sudo apt upgrade -y
wget https://github.com/your-repo/vpn-telegram-bot/releases/latest/download/vpn-bot-linux
chmod +x vpn-bot-linux
sudo mv vpn-bot-linux /usr/local/bin/

# Create systemd service
sudo tee /etc/systemd/system/vpn-bot.service << EOF
[Unit]
Description=VPN Telegram Bot
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/vpn-bot-linux
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable vpn-bot
sudo systemctl start vpn-bot`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          DigitalOcean Deployment
        </CardTitle>
        <CardDescription>
          One-click deployment on DigitalOcean Droplets
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            DigitalOcean offers the simplest deployment with pre-configured droplets.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">One-Click Deploy</h4>
            <Button className="w-full" asChild>
              <a href="https://marketplace.digitalocean.com/apps/vpn-telegram-bot" target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-2" />
                Deploy on DigitalOcean
              </a>
            </Button>
          </div>

          <div>
            <h4 className="font-medium mb-2">Manual Installation</h4>
            <div className="bg-muted p-4 rounded-lg relative">
              <pre className="text-sm overflow-x-auto">{doScript}</pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(doScript, 'do-script')}
              >
                {copiedText === 'do-script' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommended Droplet Specs</h4>
            <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
              <li>Size: Basic ($6/month, 1GB RAM, 1 vCPU)</li>
              <li>Region: Choose closest to your users</li>
              <li>Image: Ubuntu 22.04 LTS</li>
              <li>Additional options: Enable monitoring</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DockerDeployment({ copyToClipboard, copiedText }: { copyToClipboard: (text: string, label: string) => void, copiedText: string | null }) {
  const dockerCompose = `version: '3.8'
services:
  vpn-bot:
    image: vpn-telegram-bot:latest
    container_name: vpn-telegram-bot
    restart: unless-stopped
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    sysctls:
      - net.ipv4.ip_forward=1
    ports:
      - "51820:51820/udp"
      - "8080:8080"
    volumes:
      - ./config:/app/config
      - ./data:/app/data
      - /lib/modules:/lib/modules:ro
    environment:
      - BOT_TOKEN=\${BOT_TOKEN}
      - ADMIN_CHAT_ID=\${ADMIN_CHAT_ID}
      - SERVER_HOST=\${SERVER_HOST}
    networks:
      - vpn-network

networks:
  vpn-network:
    driver: bridge`;

  const dockerRun = `# Quick start with Docker
docker run -d \\
  --name vpn-telegram-bot \\
  --cap-add NET_ADMIN \\
  --cap-add SYS_MODULE \\
  --sysctl net.ipv4.ip_forward=1 \\
  -p 51820:51820/udp \\
  -p 8080:8080 \\
  -v ./config:/app/config \\
  -v ./data:/app/data \\
  -v /lib/modules:/lib/modules:ro \\
  -e BOT_TOKEN="your_bot_token" \\
  -e ADMIN_CHAT_ID="your_chat_id" \\
  -e SERVER_HOST="your_server_ip" \\
  vpn-telegram-bot:latest`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Docker Deployment
        </CardTitle>
        <CardDescription>
          Deploy using Docker containers for easy management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Docker deployment is the fastest way to get started locally or on any server.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="compose" className="w-full">
          <TabsList>
            <TabsTrigger value="compose">Docker Compose</TabsTrigger>
            <TabsTrigger value="run">Docker Run</TabsTrigger>
          </TabsList>
          
          <TabsContent value="compose" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">docker-compose.yml</h4>
              <div className="bg-muted p-4 rounded-lg relative">
                <pre className="text-sm overflow-x-auto">{dockerCompose}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(dockerCompose, 'docker-compose')}
                >
                  {copiedText === 'docker-compose' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Start the services</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">docker-compose up -d</pre>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="run" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Single Docker Command</h4>
              <div className="bg-muted p-4 rounded-lg relative">
                <pre className="text-sm overflow-x-auto">{dockerRun}</pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(dockerRun, 'docker-run')}
                >
                  {copiedText === 'docker-run' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div>
          <h4 className="font-medium mb-2">Prerequisites</h4>
          <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
            <li>Docker Engine 20.10+ installed</li>
            <li>Docker Compose v2+ (for compose method)</li>
            <li>Root privileges or docker group membership</li>
            <li>Kernel modules: wireguard, iptable_nat</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

function TelegramBotDeployment({ copyToClipboard, copiedText }: { copyToClipboard: (text: string, label: string) => void, copiedText: string | null }) {
  const botSetup = `# Create new Telegram bot
1. Message @BotFather on Telegram
2. Send /newbot command
3. Choose a name for your bot
4. Choose a username (must end with 'bot')
5. Copy the bot token

# Set bot commands
/setcommands
start - Start the bot and get welcome message
connect - Generate VPN configuration
disconnect - Disconnect from VPN
status - Check connection status
servers - List available servers
help - Show help information

# Enable inline mode (optional)
/setinline
Enable inline mode? Yes
Placeholder: Search servers...`;

  const webAppConfig = `{
  "name": "VPN Control Panel",
  "short_name": "VPN Bot",
  "description": "Telegram Web App for VPN management",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2196F3",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Telegram Bot Setup
        </CardTitle>
        <CardDescription>
          Configure your Telegram bot and Web App integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Step 1: Create Telegram Bot</h4>
          <div className="bg-muted p-4 rounded-lg relative">
            <pre className="text-sm overflow-x-auto whitespace-pre-wrap">{botSetup}</pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(botSetup, 'bot-setup')}
            >
              {copiedText === 'bot-setup' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Step 2: Configure Web App</h4>
          <p className="text-sm text-muted-foreground mb-2">
            Set up the Web App for rich UI experience:
          </p>
          <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
            <li>Deploy your web app to a hosting service (Vercel, Netlify, etc.)</li>
            <li>Message @BotFather and use /newapp</li>
            <li>Select your bot and provide the web app URL</li>
            <li>Upload app icon and provide description</li>
          </ol>
        </div>

        <div>
          <h4 className="font-medium mb-2">Step 3: Web App Manifest</h4>
          <div className="bg-muted p-4 rounded-lg relative">
            <pre className="text-sm overflow-x-auto">{webAppConfig}</pre>
            <Button
              size="sm"
              variant="outline"
              className="absolute top-2 right-2"
              onClick={() => copyToClipboard(webAppConfig, 'webapp-config')}
            >
              {copiedText === 'webapp-config' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Step 4: Environment Variables</h4>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm">
              BOT_TOKEN=your_bot_token_from_botfather
              WEBHOOK_URL=https://your-domain.com/webhook
              WEBAPP_URL=https://your-webapp-domain.com
              ADMIN_CHAT_ID=your_telegram_user_id
            </pre>
          </div>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Keep your bot token secure! Never commit it to public repositories or share it publicly.
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="https://t.me/botfather" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              @BotFather
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://core.telegram.org/bots/webapps" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Web App Docs
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}