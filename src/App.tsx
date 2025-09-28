import { useState } from 'react';
import { VpnDocumentation } from './components/VpnDocumentation';
import { VpnDashboard } from './components/VpnDashboard';
import { DeploymentGuide } from './components/DeploymentGuide';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Shield, Book, Rocket, Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VPN Telegram Bot
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Complete VPN solution with Telegram Web App integration. Deploy, manage, and monitor your VPN infrastructure with ease.
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center gap-2">
              <Rocket className="h-4 w-4" />
              Deployment
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Documentation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <VpnDashboard />
          </TabsContent>

          <TabsContent value="deployment">
            <DeploymentGuide />
          </TabsContent>

          <TabsContent value="documentation">
            <VpnDocumentation />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-8 p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => setActiveTab('deployment')}
            >
              <Rocket className="h-4 w-4 mr-2" />
              Start Deployment
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => setActiveTab('documentation')}
            >
              <Book className="h-4 w-4 mr-2" />
              View Docs
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => window.open('https://core.telegram.org/bots/webapps', '_blank')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Telegram API
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}