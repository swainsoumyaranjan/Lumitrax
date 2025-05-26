import React from "react";
import { Button, Card, CardBody, CardFooter, Spacer } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { FeatureCard } from "../../components/feature-card";
import { TestimonialCard } from "../../components/testimonial-card";

export const HomePage: React.FC = () => {
  const features = [
    {
      title: "Content Library",
      description: "Discover curated videos, talks, books, and articles about social issues.",
      icon: "lucide:library",
      path: "/content-library",
      color: "primary"
    },
    {
      title: "Interactive Map",
      description: "Connect with like-minded individuals locally and globally.",
      icon: "lucide:map",
      path: "/map",
      color: "secondary"
    },
    {
      title: "Passion Discovery",
      description: "Identify the social causes you care about most.",
      icon: "lucide:compass",
      path: "/passion-discovery",
      color: "success"
    },
    {
      title: "Action Hub",
      description: "Find NGOs, activist groups, and funding opportunities.",
      icon: "lucide:rocket",
      path: "/action-hub",
      color: "warning"
    },
    {
      title: "Community Chat",
      description: "Discuss, collaborate, and share ideas with others.",
      icon: "lucide:message-circle",
      path: "/community",
      color: "danger"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Activist",
      content: "ImpactConnect helped me find local environmental groups and connect with people who share my passion for conservation.",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2"
    },
    {
      name: "Michael Chen",
      role: "Education Advocate",
      content: "Through the platform, I discovered educational resources and connected with teachers working on similar initiatives.",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
    },
    {
      name: "Priya Patel",
      role: "Healthcare Volunteer",
      content: "The Action Hub connected me with healthcare NGOs where I now volunteer regularly, making a real difference in my community.",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4"
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Connect, Learn, and Make an <span className="text-primary">Impact</span>
          </h1>
          <p className="text-large text-default-600 max-w-lg">
            Discover social causes you're passionate about, connect with like-minded individuals, 
            and access resources to drive meaningful change.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button 
              as={Link} 
              to="/passion-discovery" 
              color="primary" 
              size="lg"
              className="font-medium"
              endContent={<Icon icon="lucide:arrow-right" width={16} height={16} />}
            >
              Discover Your Passion
            </Button>
            <Button 
              as={Link} 
              to="/content-library" 
              variant="bordered" 
              size="lg"
              className="font-medium"
            >
              Explore Content
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <img 
            src="https://img.heroui.chat/image/ai?w=600&h=400&u=1" 
            alt="People collaborating on social impact projects" 
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How ImpactConnect Works</h2>
          <p className="text-default-600 max-w-2xl mx-auto">
            Our platform provides all the tools you need to discover causes you care about,
            connect with others, and take meaningful action.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              path={feature.path}
              color={feature.color}
            />
          ))}
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-content2 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-default-600 max-w-2xl mx-auto">
            Together, our community is making a difference across the globe.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-4xl font-bold text-primary">10K+</p>
            <p className="text-default-600">Active Users</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-secondary">500+</p>
            <p className="text-default-600">Partner Organizations</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-success">120+</p>
            <p className="text-default-600">Countries Reached</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-warning">1.5M+</p>
            <p className="text-default-600">Actions Taken</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-default-600 max-w-2xl mx-auto">
            Hear from people who have used ImpactConnect to make a difference.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.name}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary rounded-xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Join our community today and start your journey toward meaningful social change.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            as={Link} 
            to="/passion-discovery" 
            color="default" 
            size="lg"
            className="font-medium bg-white text-primary"
          >
            Get Started
          </Button>
          <Button 
            as={Link} 
            to="/content-library" 
            variant="bordered" 
            size="lg"
            className="font-medium border-white text-white"
          >
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};