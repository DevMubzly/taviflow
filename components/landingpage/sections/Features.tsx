
import React, { useEffect } from 'react';
import { Package, CreditCard, BarChart4, Bell, Users, Cloud } from 'lucide-react';

const featuresList = [
  {
    icon: <Package className="h-6 w-6 text-taviflow-blue" />,
    title: "Inventory Management",
    description: "Track stock levels, product movements, and reorders seamlessly with our intuitive interface."
  },
  {
    icon: <CreditCard className="h-6 w-6 text-taviflow-blue" />,
    title: "Mobile Money Integration",
    description: "Simplify transactions with instant payments and seamless mobile money connectivity."
  },
  {
    icon: <BarChart4 className="h-6 w-6 text-taviflow-blue" />,
    title: "Reporting & Analytics",
    description: "Get valuable insights on stock levels, sales, and overall performance with detailed analytics."
  },
  {
    icon: <Bell className="h-6 w-6 text-taviflow-blue" />,
    title: "Notifications & Alerts",
    description: "Receive low-stock and restock reminders in real-time to prevent inventory issues."
  },
  {
    icon: <Users className="h-6 w-6 text-taviflow-blue" />,
    title: "User Role & Access Control",
    description: "Secure system with customizable admin, employee, and client roles for proper access management."
  },
  {
    icon: <Cloud className="h-6 w-6 text-taviflow-blue" />,
    title: "Cloud-Based & Scalable",
    description: "Access your inventory system from anywhere, built to scale with your business growth."
  }
];

const Features = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 bg-taviflow-light relative section-fade-in">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" data-animate style={{animationDelay: '0.1s'}}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Unlock the Power</span> of Efficient Inventory Management
          </h2>
          <p className="text-taviflow-gray text-lg">
            TaviFlow enhances productivity and cuts costs with smart automation and real-time tracking
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 feature-card-hover"
              data-animate
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-taviflow-blue/10 flex items-center justify-center mb-6 svg-hover">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-taviflow-dark">{feature.title}</h3>
              <p className="text-taviflow-gray">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-taviflow-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-taviflow-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
    </section>
  );
};

export default Features;
