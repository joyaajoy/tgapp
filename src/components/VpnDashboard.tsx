import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Server, 
  Users, 
  Activity, 
  Globe, 
  Shield, 
  Zap, 
  MapPin, 
  Clock,
  Download,
  Upload
} from 'lucide-react';

export function VpnDashboard() {
  const [selectedServer, setSelectedServer] = useState('us-east-1');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');

  const servers = [
    { id: 'us-east-1', name: 'US East (Virginia)', ping: 12, load: 45 },
    { id: 'us-west-1', name: 'US West (California)', ping: 34, load: 67 },
    { id: 'eu-west-1', name: 'EU West (Ireland)', ping: 89, load: 23 },
    { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', ping: 156, load: 78 },
  ];

  const handleConnect = () => {
    setConnectionStatus('connecting');
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('disconnected');
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Connection Status
          </CardTitle>
          <CardDescription>
            Current VPN connection status and server information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                'bg-red-500'
              }`} />
              <span className="font-medium">
                {connectionStatus === 'connected' ? 'Connected' : 
                 connectionStatus === 'connecting' ? 'Connecting...' : 
                 'Disconnected'}
              </span>
              <Badge variant={connectionStatus === 'connected' ? 'default' : 'secondary'}>
                {connectionStatus === 'connected' ? 'Secure' : 'Not Protected'}
              </Badge>
            </div>
            {connectionStatus === 'connected' ? (
              <Button variant="destructive" onClick={handleDisconnect}>
                Disconnect
              </Button>
            ) : (
              <Button onClick={handleConnect} disabled={connectionStatus === 'connecting'}>
                {connectionStatus === 'connecting' ? 'Connecting...' : 'Connect'}
              </Button>
            )}
          </div>

          {connectionStatus === 'connected' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="text-center">
                <MapPin className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Location</p>
                <p className="text-xs text-muted-foreground">Virginia, US</p>
              </div>
              <div className="text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-xs text-muted-foreground">2h 34m</p>
              </div>
              <div className="text-center">
                <Download className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Download</p>
                <p className="text-xs text-muted-foreground">45.2 MB/s</p>
              </div>
              <div className="text-center">
                <Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-sm font-medium">Upload</p>
                <p className="text-xs text-muted-foreground">12.1 MB/s</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Server Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Server Selection
            </CardTitle>
            <CardDescription>
              Choose your preferred VPN server location
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedServer} onValueChange={setSelectedServer}>
              <SelectTrigger>
                <SelectValue placeholder="Select a server" />
              </SelectTrigger>
              <SelectContent>
                {servers.map((server) => (
                  <SelectItem key={server.id} value={server.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{server.name}</span>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="outline" className="text-xs">
                          {server.ping}ms
                        </Badge>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-2">
              {servers.map((server) => (
                <div key={server.id} className="flex items-center justify-between text-sm">
                  <span className={server.id === selectedServer ? 'font-medium' : ''}>
                    {server.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{server.load}% load</span>
                    <Progress value={server.load} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Usage Statistics
            </CardTitle>
            <CardDescription>
              Your VPN usage metrics and performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Server Locations</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Data Transfer Today</span>
                  <span className="font-medium">2.4 GB</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Sessions This Week</span>
                  <span className="font-medium">28</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Speed</span>
                  <span className="font-medium">87 Mbps</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription>
            Real-time performance monitoring for your VPN infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>34%</span>
              </div>
              <Progress value={34} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Network Load</span>
                <span>23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}