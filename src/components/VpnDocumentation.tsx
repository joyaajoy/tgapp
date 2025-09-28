import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Book, 
  Shield, 
  Settings, 
  HelpCircle, 
  ExternalLink, 
  AlertTriangle,
  CheckCircle,
  Info,
  Terminal,
  Code,
  Globe
} from 'lucide-react';

export function VpnDocumentation() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewDocs />
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <ApiDocs />
        </TabsContent>

        <TabsContent value="config" className="space-y-6">
          <ConfigurationDocs />
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-6">
          <TroubleshootingDocs />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityDocs />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OverviewDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            VPN Telegram Bot Overview
          </CardTitle>
          <CardDescription>
            Complete documentation for deploying and managing your VPN Telegram Bot
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">What is VPN Telegram Bot?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              A comprehensive VPN management solution that combines a Telegram bot interface with a modern web application. 
              Users can manage VPN connections, monitor usage, and access servers through both Telegram commands and a 
              beautiful web interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Key Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Multi-platform VPN deployment</li>
                <li>• Telegram bot integration</li>
                <li>• Web App interface</li>
                <li>• Real-time monitoring</li>
                <li>• User management</li>
                <li>• Multiple server locations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Supported Protocols</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">WireGuard</Badge>
                <Badge variant="secondary">OpenVPN</Badge>
                <Badge variant="secondary">IKEv2</Badge>
                <Badge variant="secondary">SSTP</Badge>
              </div>
            </div>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This documentation covers deployment on AWS, DigitalOcean, Docker, and direct server installation.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Architecture Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium">VPN Server</h4>
                <p className="text-sm text-muted-foreground">WireGuard/OpenVPN backend</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Terminal className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium">Telegram Bot</h4>
                <p className="text-sm text-muted-foreground">Command interface</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-medium">Web App</h4>
                <p className="text-sm text-muted-foreground">Modern UI dashboard</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              The system consists of three main components working together to provide a seamless VPN experience.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</div>
              <div>
                <h4 className="font-medium">Choose Deployment Platform</h4>
                <p className="text-sm text-muted-foreground">Select from AWS, DigitalOcean, Docker, or manual installation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</div>
              <div>
                <h4 className="font-medium">Create Telegram Bot</h4>
                <p className="text-sm text-muted-foreground">Use @BotFather to create your bot and get the token</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</div>
              <div>
                <h4 className="font-medium">Deploy VPN Server</h4>
                <p className="text-sm text-muted-foreground">Follow the deployment guide for your chosen platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">4</div>
              <div>
                <h4 className="font-medium">Configure & Test</h4>
                <p className="text-sm text-muted-foreground">Set up environment variables and test the connection</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ApiDocs() {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/webhook',
      description: 'Telegram webhook endpoint',
      auth: 'Bot Token'
    },
    {
      method: 'GET',
      path: '/api/servers',
      description: 'List available VPN servers',
      auth: 'API Key'
    },
    {
      method: 'POST',
      path: '/api/users/{id}/config',
      description: 'Generate user VPN configuration',
      auth: 'API Key'
    },
    {
      method: 'GET',
      path: '/api/stats',
      description: 'Get server statistics',
      auth: 'API Key'
    },
    {
      method: 'POST',
      path: '/api/users/{id}/disconnect',
      description: 'Disconnect user from VPN',
      auth: 'API Key'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API Documentation
          </CardTitle>
          <CardDescription>
            REST API endpoints for VPN management and Telegram integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              All API endpoints require authentication. Use either Bot Token for webhook endpoints or API Key for management endpoints.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Base URL</h4>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">https://your-server.com</code>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Endpoints</h4>
              <div className="space-y-3">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{endpoint.description}</p>
                    <div className="text-xs text-muted-foreground">
                      Auth: {endpoint.auth}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Authentication</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`# API Key Authentication
curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://your-server.com/api/servers

# Bot Token (Webhook)
POST /api/webhook
Content-Type: application/json
X-Telegram-Bot-Api-Secret-Token: YOUR_BOT_TOKEN`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Success Response</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`{
  "success": true,
  "data": {
    "servers": [
      {
        "id": "us-east-1",
        "name": "US East (Virginia)",
        "location": "Virginia, USA",
        "ping": 12,
        "load": 45,
        "status": "online"
      }
    ]
  }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Error Response</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid API key"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ConfigurationDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Guide
          </CardTitle>
          <CardDescription>
            Detailed configuration options for your VPN deployment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Environment Variables</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Required Configuration
BOT_TOKEN=your_telegram_bot_token
ADMIN_CHAT_ID=your_telegram_user_id
SERVER_HOST=your_server_public_ip

# Optional Configuration
PORT=8080
LOG_LEVEL=info
MAX_USERS=100
VPN_PROTOCOL=wireguard
DNS_SERVERS=1.1.1.1,8.8.8.8

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vpnbot
DB_USER=vpnbot
DB_PASSWORD=secure_password

# Security Configuration
API_SECRET=your_api_secret_key
JWT_SECRET=your_jwt_secret
RATE_LIMIT=10
WEBHOOK_SECRET=your_webhook_secret`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Server Configuration</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# WireGuard Server Config (/etc/wireguard/wg0.conf)
[Interface]
Address = 10.0.0.1/24
SaveConfig = true
PostUp = iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 51820
PrivateKey = SERVER_PRIVATE_KEY

# Client template
[Peer]
PublicKey = CLIENT_PUBLIC_KEY
PresharedKey = CLIENT_PRESHARED_KEY
AllowedIPs = 10.0.0.2/32`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Bot Configuration</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Configure your Telegram bot settings in @BotFather:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Set bot commands using /setcommands</li>
                <li>Enable inline mode with /setinline</li>
                <li>Configure web app with /newapp</li>
                <li>Set bot description and about text</li>
                <li>Upload bot profile picture</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Load Balancing</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Multiple server configuration
SERVERS='[
  {
    "id": "us-east-1",
    "host": "vpn1.example.com",
    "location": "Virginia, USA",
    "capacity": 100
  },
  {
    "id": "eu-west-1", 
    "host": "vpn2.example.com",
    "location": "Ireland, EU",
    "capacity": 100
  }
]'`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Monitoring & Alerts</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Monitoring configuration
ENABLE_MONITORING=true
METRICS_PORT=9090
HEALTH_CHECK_INTERVAL=30

# Alert thresholds
CPU_ALERT_THRESHOLD=80
MEMORY_ALERT_THRESHOLD=85
DISK_ALERT_THRESHOLD=90
CONNECTION_ALERT_THRESHOLD=95

# Notification channels
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TroubleshootingDocs() {
  const commonIssues = [
    {
      problem: "Bot not responding to commands",
      solutions: [
        "Check if BOT_TOKEN is correctly set",
        "Verify webhook URL is accessible",
        "Check server logs for errors",
        "Ensure bot is not blocked by user"
      ]
    },
    {
      problem: "VPN connection fails",
      solutions: [
        "Check if port 51820 is open",
        "Verify WireGuard is running",
        "Check client configuration",
        "Ensure IP forwarding is enabled"
      ]
    },
    {
      problem: "Web App not loading",
      solutions: [
        "Check if web server is running",
        "Verify SSL certificate is valid",
        "Check browser console for errors",
        "Ensure domain is correctly configured"
      ]
    },
    {
      problem: "High server load",
      solutions: [
        "Check active connections count",
        "Monitor CPU and memory usage",
        "Consider server upgrade",
        "Implement connection limits"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Troubleshooting Guide
          </CardTitle>
          <CardDescription>
            Common issues and their solutions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {commonIssues.map((issue, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                {issue.problem}
              </h4>
              <ul className="space-y-1">
                {issue.solutions.map((solution, sIndex) => (
                  <li key={sIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                    {solution}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Debug Commands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">System Status</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Check WireGuard status
sudo systemctl status wg-quick@wg0
sudo wg show

# Check bot service
sudo systemctl status vpn-bot
sudo journalctl -u vpn-bot -f

# Network diagnostics
netstat -tulpn | grep :51820
iptables -L -n -v
ip route show`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Log Analysis</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Application logs
tail -f /var/log/vpn-bot/app.log
grep "ERROR" /var/log/vpn-bot/app.log

# System logs
journalctl -xe
dmesg | grep wireguard

# Access logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Performance Monitoring</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Resource usage
htop
iotop
iftop

# Connection monitoring
ss -tulpn
lsof -i :51820
netstat -an | grep :51820

# Disk space
df -h
du -sh /var/log/*`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Getting Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you're still experiencing issues after trying the solutions above, here are additional resources:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" asChild>
                <a href="https://github.com/your-repo/vpn-telegram-bot/issues" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub Issues
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://t.me/vpnbotsupport" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Telegram Support
                </a>
              </Button>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                When reporting issues, please include server logs, configuration details, and steps to reproduce the problem.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityDocs() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Best Practices
          </CardTitle>
          <CardDescription>
            Essential security configurations and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Security is critical for VPN services. Follow all recommendations to protect your users and infrastructure.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Server Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Use strong SSH keys and disable password authentication</li>
                <li>Configure firewall (ufw/iptables) to allow only required ports</li>
                <li>Enable automatic security updates</li>
                <li>Use fail2ban to protect against brute force attacks</li>
                <li>Regularly update system packages and dependencies</li>
                <li>Monitor system logs for suspicious activity</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">VPN Configuration</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Use strong pre-shared keys for additional security</li>
                <li>Implement proper key rotation policies</li>
                <li>Configure DNS leak protection</li>
                <li>Enable kill switch functionality</li>
                <li>Use secure DNS servers (1.1.1.1, 8.8.8.8)</li>
                <li>Disable IPv6 if not properly configured</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Bot Security</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Keep bot token secure and never commit to repositories</li>
                <li>Use webhook secret tokens for validation</li>
                <li>Implement rate limiting for bot commands</li>
                <li>Validate all user inputs</li>
                <li>Use HTTPS for webhook endpoints</li>
                <li>Monitor bot usage for suspicious activity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Firewall Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">UFW Rules</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`# Basic firewall setup
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH (change port if needed)
sudo ufw allow 22/tcp

# Allow VPN traffic
sudo ufw allow 51820/udp

# Allow web traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable`}
                </pre>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">IPTables Rules</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`# NAT rules for VPN
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
iptables -A FORWARD -i wg0 -j ACCEPT
iptables -A FORWARD -o wg0 -j ACCEPT

# Rate limiting
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --set
iptables -A INPUT -p tcp --dport 22 -m conntrack --ctstate NEW -m recent --update --seconds 60 --hitcount 4 -j DROP

# Save rules
iptables-save > /etc/iptables/rules.v4`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SSL/TLS Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Let's Encrypt Setup</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
0 12 * * * /usr/bin/certbot renew --quiet`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Nginx SSL Configuration</h4>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm">
{`server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monitoring & Alerting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Security Monitoring</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Monitor failed login attempts</li>
                <li>Track unusual traffic patterns</li>
                <li>Alert on configuration changes</li>
                <li>Monitor certificate expiration</li>
                <li>Track bot command usage</li>
                <li>Monitor system resource usage</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Log Monitoring Script</h4>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
{`#!/bin/bash
# Basic security monitoring
tail -f /var/log/auth.log | while read line; do
    if echo "$line" | grep -q "Failed password"; then
        echo "Security Alert: Failed login attempt - $line"
        # Send notification (telegram, email, etc.)
    fi
done`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}