
import React from 'react';
import { Shield, Lock } from 'lucide-react';

const SecurityInfo = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Security Assurance</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-taviflow-primary/10">
            <Shield className="w-4 h-4 text-taviflow-primary" />
          </div>
          <p className="text-sm">Your transactions are protected with industry-standard encryption.</p>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-full bg-taviflow-primary/10">
            <Lock className="w-4 h-4 text-taviflow-primary" />
          </div>
          <p className="text-sm">Secure payment gateways ensure safe transactions.</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityInfo;
