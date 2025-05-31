'use client'

import { useState } from "react";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  CreditCard, 
  Truck, 
  Palette, 
  Database, 
  Save, 
  RefreshCw, 
  Download, 
  Upload,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Settings = () => {
  // State for all settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(true);
  const [lowStockAlertsEnabled, setLowStockAlertsEnabled] = useState(true);
  const [autoBackupsEnabled, setAutoBackupsEnabled] = useState(true);
  const [compactModeEnabled, setCompactModeEnabled] = useState(true);
  
  // Company Settings
  const [companyName, setCompanyName] = useState("Inventory Hub Inc.");
  const [timezone, setTimezone] = useState("America/New_York");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  
  // Inventory Settings
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [reorderPoint, setReorderPoint] = useState(5);
  const [defaultSupplier, setDefaultSupplier] = useState("supplier1");
  const [costCalculation, setCostCalculation] = useState("FIFO");
  const [barcodeFormat, setBarcodeFormat] = useState("code128");
  
  // Backup Settings
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [retentionPeriod, setRetentionPeriod] = useState("30");
  
  // Notification Checkboxes
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyInventory, setNotifyInventory] = useState(true);
  const [notifySystem, setNotifySystem] = useState(true);
  const [notifyReports, setNotifyReports] = useState(false);
  
  // Appearance
  const [selectedColor, setSelectedColor] = useState("purple");
  const [fontSize, setFontSize] = useState("small");
  
  // Function to handle saving settings
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully", {
      description: "Your changes have been applied"
    });
  };
  
  // Function to reset settings to defaults
  const handleResetSettings = () => {
    // Reset all settings to default values
    setCompanyName("Inventory Hub Inc.");
    setTimezone("America/New_York");
    setDateFormat("MM/DD/YYYY");
    setCurrency("USD");
    setLanguage("en");
    setLowStockThreshold(10);
    setReorderPoint(5);
    setDefaultSupplier("supplier1");
    setCostCalculation("FIFO");
    setBarcodeFormat("code128");
    setNotificationsEnabled(true);
    setEmailAlertsEnabled(true);
    setLowStockAlertsEnabled(true);
    setAutoBackupsEnabled(true);
    setCompactModeEnabled(true);
    setBackupFrequency("daily");
    setRetentionPeriod("30");
    setNotifyOrders(true);
    setNotifyInventory(true);
    setNotifySystem(true);
    setNotifyReports(false);
    setSelectedColor("purple");
    setFontSize("small");
    
    toast.success("Settings reset to defaults", {
      description: "All settings have been restored to their default values"
    });
  };
  
  // Function to create a backup
  const handleCreateBackup = () => {
    toast.success("Backup created successfully", {
      description: "Your data has been backed up"
    });
  };
  
  // Function to download backup
  const handleDownloadBackup = () => {
    toast.success("Backup download started", {
      description: "Your backup file will be downloaded shortly"
    });
  };
  
  // Function to restore backup
  const handleRestoreBackup = () => {
    toast.info("Please select a backup file to restore", {
      description: "Upload window will open"
    });
  };
  
  // Function to handle theme color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    toast.info(`Theme color changed to ${color}`, {
      description: "Your theme has been updated"
    });
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-taviflow-muted text-xs">Configure application settings and preferences</p>
      </div>
      
      <div className="glass-card p-0 overflow-hidden">
        <Tabs defaultValue="general" className="w-full">
          <div className="flex border-b border-taviflow-border">
            <div className="w-48 border-r border-taviflow-border p-3 space-y-1">
              <div className="text-xs font-medium text-taviflow-muted mb-2">Settings</div>
              
              <a href="#general" className="flex items-center gap-2 p-2 text-xs rounded-md bg-taviflow-primary/10 text-taviflow-primary">
                <SettingsIcon className="w-3.5 h-3.5" />
                <span>General</span>
              </a>
              
              <a href="#account" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <User className="w-3.5 h-3.5" />
                <span>Account</span>
              </a>
              
              <a href="#notifications" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <Bell className="w-3.5 h-3.5" />
                <span>Notifications</span>
              </a>
              
              <a href="#security" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <Lock className="w-3.5 h-3.5" />
                <span>Security</span>
              </a>
              
              <a href="#inventory" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <Database className="w-3.5 h-3.5" />
                <span>Inventory</span>
              </a>
              
              <a href="#appearance" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <Palette className="w-3.5 h-3.5" />
                <span>Appearance</span>
              </a>
              
              <a href="#shipping" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <Truck className="w-3.5 h-3.5" />
                <span>Shipping</span>
              </a>
              
              <a href="#payment" className="flex items-center gap-2 p-2 text-xs rounded-md hover:bg-taviflow-primary/5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment</span>
              </a>
            </div>
            
            <div className="flex-1 p-4">
              <div className="space-y-6">
                <section id="general">
                  <h2 className="text-base font-medium mb-4">General Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="company-name">
                          Company Name
                        </label>
                        <Input 
                          id="company-name" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="h-8 text-xs"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="timezone">
                          Timezone
                        </label>
                        <select 
                          id="timezone" 
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">London (GMT)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="date-format">
                          Date Format
                        </label>
                        <select 
                          id="date-format" 
                          value={dateFormat}
                          onChange={(e) => setDateFormat(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="currency">
                          Currency
                        </label>
                        <select 
                          id="currency" 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="JPY">Japanese Yen (¥)</option>
                          <option value="CAD">Canadian Dollar (C$)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="language">
                        Language
                      </label>
                      <select 
                        id="language" 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                  </div>
                </section>
                
                <section id="inventory">
                  <h2 className="text-base font-medium mb-4">Inventory Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                      <div>
                        <p className="text-xs font-medium">Low Stock Alerts</p>
                        <p className="text-[10px] text-taviflow-muted">Get notified when items are running low</p>
                      </div>
                      <Switch 
                        checked={lowStockAlertsEnabled}
                        onCheckedChange={(checked) => {
                          setLowStockAlertsEnabled(checked);
                          if (checked) {
                            toast.success("Low stock alerts enabled");
                          } else {
                            toast.info("Low stock alerts disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="low-stock-threshold">
                          Low Stock Threshold
                        </label>
                        <Input 
                          id="low-stock-threshold" 
                          type="number" 
                          value={lowStockThreshold}
                          onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
                          className="h-8 text-xs"
                        />
                        <p className="text-[10px] text-taviflow-muted mt-1">
                          Items with stock below this number will be marked as "Low Stock"
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="reorder-point">
                          Reorder Point
                        </label>
                        <Input 
                          id="reorder-point" 
                          type="number" 
                          value={reorderPoint}
                          onChange={(e) => setReorderPoint(parseInt(e.target.value) || 0)}
                          className="h-8 text-xs"
                        />
                        <p className="text-[10px] text-taviflow-muted mt-1">
                          System will suggest reordering when stock reaches this level
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="default-supplier">
                          Default Supplier
                        </label>
                        <select 
                          id="default-supplier" 
                          value={defaultSupplier}
                          onChange={(e) => setDefaultSupplier(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="supplier1">Main Warehouse Supply Co.</option>
                          <option value="supplier2">ElectroBits Inc.</option>
                          <option value="supplier3">Wholesale Parts Ltd.</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="cost-calculation">
                          Cost Calculation Method
                        </label>
                        <select 
                          id="cost-calculation" 
                          value={costCalculation}
                          onChange={(e) => setCostCalculation(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="FIFO">FIFO (First In, First Out)</option>
                          <option value="LIFO">LIFO (Last In, First Out)</option>
                          <option value="average">Weighted Average</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="barcode-format">
                        Barcode Format
                      </label>
                      <select 
                        id="barcode-format" 
                        value={barcodeFormat}
                        onChange={(e) => setBarcodeFormat(e.target.value)}
                        className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                      >
                        <option value="code128">Code 128</option>
                        <option value="code39">Code 39</option>
                        <option value="ean13">EAN-13</option>
                        <option value="upc">UPC</option>
                        <option value="qr">QR Code</option>
                      </select>
                    </div>
                  </div>
                </section>
                
                <section id="notifications">
                  <h2 className="text-base font-medium mb-4">Notification Settings</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                      <div>
                        <p className="text-xs font-medium">Enable Notifications</p>
                        <p className="text-[10px] text-taviflow-muted">Receive system notifications</p>
                      </div>
                      <Switch 
                        checked={notificationsEnabled}
                        onCheckedChange={(checked) => {
                          setNotificationsEnabled(checked);
                          if (checked) {
                            toast.success("Notifications enabled");
                          } else {
                            toast.info("Notifications disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                      <div>
                        <p className="text-xs font-medium">Email Alerts</p>
                        <p className="text-[10px] text-taviflow-muted">Receive important notifications via email</p>
                      </div>
                      <Switch 
                        checked={emailAlertsEnabled}
                        onCheckedChange={(checked) => {
                          setEmailAlertsEnabled(checked);
                          if (checked) {
                            toast.success("Email alerts enabled");
                          } else {
                            toast.info("Email alerts disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div className="ml-5 space-y-2">
                      <div className="flex items-center p-1">
                        <input 
                          type="checkbox" 
                          id="notify-orders" 
                          className="mr-2" 
                          checked={notifyOrders}
                          onChange={(e) => setNotifyOrders(e.target.checked)}
                        />
                        <label htmlFor="notify-orders" className="text-xs">New order notifications</label>
                      </div>
                      
                      <div className="flex items-center p-1">
                        <input 
                          type="checkbox" 
                          id="notify-inventory" 
                          className="mr-2" 
                          checked={notifyInventory}
                          onChange={(e) => setNotifyInventory(e.target.checked)}
                        />
                        <label htmlFor="notify-inventory" className="text-xs">Inventory alerts</label>
                      </div>
                      
                      <div className="flex items-center p-1">
                        <input 
                          type="checkbox" 
                          id="notify-system" 
                          className="mr-2" 
                          checked={notifySystem}
                          onChange={(e) => setNotifySystem(e.target.checked)}
                        />
                        <label htmlFor="notify-system" className="text-xs">System updates</label>
                      </div>
                      
                      <div className="flex items-center p-1">
                        <input 
                          type="checkbox" 
                          id="notify-reports" 
                          className="mr-2" 
                          checked={notifyReports}
                          onChange={(e) => setNotifyReports(e.target.checked)}
                        />
                        <label htmlFor="notify-reports" className="text-xs">Weekly reports</label>
                      </div>
                    </div>
                  </div>
                </section>
                
                <section id="backups">
                  <h2 className="text-base font-medium mb-4">Backup Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                      <div>
                        <p className="text-xs font-medium">Automatic Backups</p>
                        <p className="text-[10px] text-taviflow-muted">System will create backups automatically</p>
                      </div>
                      <Switch 
                        checked={autoBackupsEnabled}
                        onCheckedChange={(checked) => {
                          setAutoBackupsEnabled(checked);
                          if (checked) {
                            toast.success("Auto backups enabled");
                          } else {
                            toast.info("Auto backups disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="backup-frequency">
                          Backup Frequency
                        </label>
                        <select 
                          id="backup-frequency" 
                          value={backupFrequency}
                          onChange={(e) => setBackupFrequency(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium mb-1" htmlFor="retention-period">
                          Retention Period
                        </label>
                        <select 
                          id="retention-period" 
                          value={retentionPeriod}
                          onChange={(e) => setRetentionPeriod(e.target.value)}
                          className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                        >
                          <option value="7">7 days</option>
                          <option value="14">14 days</option>
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="365">1 year</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        className="text-xs h-8 bg-taviflow-primary text-white"
                        onClick={handleCreateBackup}
                      >
                        <Save className="mr-1 h-3 w-3" />
                        Create Backup Now
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-8"
                        onClick={handleDownloadBackup}
                      >
                        <Download className="mr-1 h-3 w-3" />
                        Download Latest Backup
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs h-8"
                        onClick={handleRestoreBackup}
                      >
                        <Upload className="mr-1 h-3 w-3" />
                        Restore Backup
                      </Button>
                    </div>
                  </div>
                </section>
                
                <section id="appearance">
                  <h2 className="text-base font-medium mb-4">Appearance Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 border border-taviflow-border rounded-md">
                      <div>
                        <p className="text-xs font-medium">Compact Mode</p>
                        <p className="text-[10px] text-taviflow-muted">Use reduced spacing for more content</p>
                      </div>
                      <Switch 
                        checked={compactModeEnabled}
                        onCheckedChange={(checked) => {
                          setCompactModeEnabled(checked);
                          if (checked) {
                            toast.success("Compact mode enabled");
                          } else {
                            toast.info("Compact mode disabled");
                          }
                        }}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="primary-color">
                        Primary Color
                      </label>
                      <div className="flex gap-2">
                        <div 
                          className={`w-6 h-6 rounded-full bg-purple-600 cursor-pointer ${selectedColor === "purple" ? "ring-2 ring-offset-2 ring-purple-600" : ""}`}
                          onClick={() => handleColorSelect("purple")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-blue-600 cursor-pointer ${selectedColor === "blue" ? "ring-2 ring-offset-2 ring-blue-600" : ""}`}
                          onClick={() => handleColorSelect("blue")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-green-600 cursor-pointer ${selectedColor === "green" ? "ring-2 ring-offset-2 ring-green-600" : ""}`}
                          onClick={() => handleColorSelect("green")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-red-600 cursor-pointer ${selectedColor === "red" ? "ring-2 ring-offset-2 ring-red-600" : ""}`}
                          onClick={() => handleColorSelect("red")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-yellow-600 cursor-pointer ${selectedColor === "yellow" ? "ring-2 ring-offset-2 ring-yellow-600" : ""}`}
                          onClick={() => handleColorSelect("yellow")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-pink-600 cursor-pointer ${selectedColor === "pink" ? "ring-2 ring-offset-2 ring-pink-600" : ""}`}
                          onClick={() => handleColorSelect("pink")}
                        ></div>
                        <div 
                          className={`w-6 h-6 rounded-full bg-indigo-600 cursor-pointer ${selectedColor === "indigo" ? "ring-2 ring-offset-2 ring-indigo-600" : ""}`}
                          onClick={() => handleColorSelect("indigo")}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium mb-1" htmlFor="font-size">
                        Font Size
                      </label>
                      <select 
                        id="font-size" 
                        value={fontSize}
                        onChange={(e) => {
                          setFontSize(e.target.value);
                          toast.info(`Font size changed to ${e.target.value}`);
                        }}
                        className="w-full h-8 text-xs border border-taviflow-border rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-taviflow-primary"
                      >
                        <option value="xs">Extra Small</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>
              
              <div className="mt-6 pt-4 border-t border-taviflow-border flex justify-between">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-xs h-8">
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Reset to Defaults
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reset Settings</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reset all settings to their default values. Are you sure you want to continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleResetSettings}>Reset</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="sm" variant="outline" className="text-xs h-8">
                        <HelpCircle className="mr-1 h-3 w-3" />
                        Help
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm">Settings Help</h3>
                        <p className="text-xs text-taviflow-muted">
                          This panel allows you to configure all aspects of the system. Changes are automatically saved when you click the Save Changes button.
                        </p>
                        <p className="text-xs text-taviflow-muted">
                          For detailed documentation on each setting, please refer to the user manual or contact support.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button size="sm" variant="outline" className="text-xs h-8">
                    Cancel
                  </Button>
                  
                  <Button 
                    size="sm" 
                    className="text-xs h-8 bg-taviflow-primary text-white"
                    onClick={handleSaveSettings}
                  >
                    <Save className="mr-1 h-3 w-3" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
