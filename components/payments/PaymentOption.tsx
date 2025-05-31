
import React from 'react';
import { Button } from "@/components/ui/button";

export interface PaymentOptionType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface PaymentOptionProps {
  option: PaymentOptionType;
  onSelect: () => void;
  selected: boolean;
}

const PaymentOption = ({ option, onSelect, selected }: PaymentOptionProps) => (
  <Button 
    className={`w-full justify-start gap-3 text-white text-lg py-6 transition-all hover:shadow-lg hover:translate-y-[-3px] ${option.color} ${selected ? 'ring-4 ring-indigo-300 shadow-md' : ''}`}
    onClick={onSelect}
  >
    <div className="bg-white/30 p-2 rounded-md">
      {option.icon}
    </div>
    <span className="font-medium">{option.name}</span>
  </Button>
);

export default PaymentOption;
