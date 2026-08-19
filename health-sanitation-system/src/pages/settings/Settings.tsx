import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "regional", label: "Regional", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card title="Profile Information">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                </div>
                <Input label="Email Address" type="email" defaultValue="john@health.gov" />
                <Input label="Phone Number" type="tel" defaultValue="+1 555-0123" />
                <Input label="Department" defaultValue="Management" />
                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card title="Notification Preferences">
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", description: "Receive email updates about system activities", checked: true },
                  { label: "Push Notifications", description: "Receive browser push notifications", checked: true },
                  { label: "SMS Alerts", description: "Receive SMS alerts for critical issues", checked: false },
                  { label: "Weekly Reports", description: "Receive weekly summary reports via email", checked: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                ))}
                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card title="Security Settings">
              <form className="space-y-6">
                <Input label="Current Password" type="password" placeholder="Enter current password" />
                <Input label="New Password" type="password" placeholder="Enter new password" />
                <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4" />
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card title="Appearance">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Light", "Dark", "System"].map((theme) => (
                      <button
                        key={theme}
                        className="p-4 border-2 border-emerald-500 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50"
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "regional" && (
            <Card title="Regional Settings">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    <option>(UTC+08:00) Beijing, Hong Kong, Singapore</option>
                    <option>(UTC+00:00) London, Dublin</option>
                    <option>(UTC-05:00) New York, Toronto</option>
                  </select>
                </div>
                <Input label="Country" defaultValue="United States" />
                <Input label="State / Province" defaultValue="California" />
                <Input label="City" defaultValue="Los Angeles" />
                <div className="flex justify-end">
                  <Button>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
