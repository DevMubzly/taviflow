
import React from 'react';
import { User, Star } from "lucide-react";

export interface TestimonialProps {
  name: string;
  timeAgo: string;
  content: string;
  rating: number;
}

const Testimonial = ({ name, timeAgo, content, rating }: TestimonialProps) => (
  <div className="glass-card p-4 space-y-2">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-taviflow-primary/20 flex items-center justify-center">
          <User className="w-5 h-5 text-taviflow-primary" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-taviflow-muted">{timeAgo}</p>
        </div>
      </div>
      <div className="flex text-yellow-400">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
    </div>
    <p className="text-sm">{content}</p>
  </div>
);

export default Testimonial;
