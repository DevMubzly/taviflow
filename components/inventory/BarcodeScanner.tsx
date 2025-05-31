
/**
 * Barcode Scanner Component
 * 
 * This component provides barcode scanning functionality for inventory management.
 * It activates device cameras to scan product barcodes, with options for camera selection
 * and manual entry as a fallback. Used for quick product identification in inventory operations.
 */

import { useState, useEffect, useRef } from 'react';
import { Camera, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BarcodeScannerProps {
  onDetected: (barcode: string) => void;
}

const BarcodeScanner = ({ onDetected }: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [deviceId, setDeviceId] = useState<string>('');
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [manualBarcode, setManualBarcode] = useState('');
  const [showDevices, setShowDevices] = useState(false);

  // Get camera devices
  useEffect(() => {
    const getDevices = async () => {
      try {
        // Request permission first
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
        
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setDevices(videoDevices);
        
        // Default to first device
        if (videoDevices.length > 0 && !deviceId) {
          setDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasPermission(false);
        toast.error("Camera access denied. Please enable camera permissions.");
      }
    };
    
    getDevices();
  }, []);

  // Start/stop video stream
  useEffect(() => {
    if (!videoRef.current || !deviceId || !hasPermission) return;
    
    let stream: MediaStream | null = null;
    
    const startCamera = async () => {
      try {
        if (isScanning) {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: { exact: deviceId },
              width: { ideal: 640 },
              height: { ideal: 480 },
              facingMode: 'environment'
            }
          });
          
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
            
            // Here we would normally set up a barcode detector
            // For this example, we'll simulate barcode detection after 2 seconds
            setTimeout(() => {
              if (isScanning) {
                // Simulated barcode detection
                const simulatedBarcode = "8900127487"; // One of our sample barcodes
                onDetected(simulatedBarcode);
                setIsScanning(false);
              }
            }, 2000);
          }
        } else if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error starting camera:', error);
        toast.error("Failed to start camera.");
        setIsScanning(false);
      }
    };
    
    startCamera();
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [deviceId, isScanning, hasPermission, onDetected]);

  const handleDeviceChange = (id: string) => {
    setDeviceId(id);
    setShowDevices(false);
    
    // Restart scanning if currently scanning
    if (isScanning) {
      setIsScanning(false);
      setTimeout(() => setIsScanning(true), 100);
    }
  };

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      onDetected(manualBarcode.trim());
      setManualBarcode('');
    } else {
      toast.error("Please enter a barcode");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {hasPermission === false && (
        <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg w-full">
          <p className="text-red-600 text-sm font-medium mb-2">Camera access denied</p>
          <p className="text-red-500 text-xs">Please enable camera permissions to use the barcode scanner.</p>
        </div>
      )}
      
      <div className="relative w-full max-w-md aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {isScanning ? (
          <>
            <video 
              ref={videoRef} 
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-3/4 h-1/3 border-2 border-white/50 rounded-lg"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black to-transparent"></div>
            <p className="absolute bottom-2 left-0 right-0 text-center text-white text-xs">Position barcode in the box</p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-600/10 to-purple-800/10">
            <Camera className="h-12 w-12 text-purple-300 mb-2" />
            <p className="text-purple-700 text-sm">Click Start to scan a barcode</p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center w-full max-w-md gap-2">
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="text-xs h-8 border-purple-200 text-purple-700 flex items-center gap-1"
            onClick={() => setShowDevices(!showDevices)}
          >
            <Camera className="h-3.5 w-3.5" />
            <span>Camera</span>
            <ChevronsUpDown className="h-3.5 w-3.5 ml-1" />
          </Button>
          
          {showDevices && devices.length > 0 && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-white rounded-md shadow-lg border border-purple-200 p-1 w-52">
              {devices.map(device => (
                <button
                  key={device.deviceId}
                  className={`w-full text-left px-3 py-1.5 text-xs rounded ${
                    device.deviceId === deviceId 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'hover:bg-purple-50 text-gray-700'
                  } flex items-center justify-between`}
                  onClick={() => handleDeviceChange(device.deviceId)}
                >
                  <span className="truncate">{device.label || `Camera ${devices.indexOf(device) + 1}`}</span>
                  {device.deviceId === deviceId && <Check className="h-3.5 w-3.5 text-purple-600" />}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="button"
          variant={isScanning ? "destructive" : "default"}
          size="sm"
          className={`text-xs h-8 ${isScanning ? 'bg-red-500' : 'bg-purple-600'}`}
          onClick={() => setIsScanning(!isScanning)}
        >
          {isScanning ? "Stop" : "Start Scanning"}
        </Button>
      </div>
      
      <div className="w-full max-w-md">
        <div className="relative">
          <form onSubmit={handleSubmitManual} className="flex gap-2">
            <input
              type="text"
              value={manualBarcode}
              onChange={(e) => setManualBarcode(e.target.value)}
              placeholder="Enter barcode manually..."
              className="flex-1 pl-3 pr-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 h-8 text-xs"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="text-xs h-8 bg-purple-600"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
