'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Globe, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const achievements = [
    { number: "10,000+", label: "Satisfied Customers" },
    { number: "50+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime Guarantee" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and privacy of your data with military-grade encryption and secure protocols."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously advancing our technology to provide cutting-edge GPS tracking solutions."
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Our customers are at the heart of everything we do, driving our commitment to excellence."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Providing reliable tracking solutions across the globe with extensive satellite coverage."
    }
  ];



  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
              About Locotraq
            </h1>
            <p className="text-lg font-paragraph opacity-90 max-w-2xl mx-auto">
              Leading the future of GPS tracking technology with innovative solutions and exceptional service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 font-paragraph text-secondary">
                <p>
                  Founded in 2015, Locotraq emerged from a simple yet powerful vision: to make GPS tracking 
                  technology accessible, reliable, and user-friendly for everyone. What started as a small 
                  team of engineers passionate about location technology has grown into a trusted global 
                  provider of GPS tracking solutions.
                </p>
                <p>
                  Our journey began when our founders recognized the gap between complex, enterprise-grade 
                  tracking systems and the growing need for simple, effective solutions for small businesses 
                  and individuals. We set out to bridge this gap with innovative products that combine 
                  advanced technology with intuitive design.
                </p>
                <p>
                  Today, we serve over 10,000 customers across 50+ countries, providing them with the tools 
                  they need to track, monitor, and protect their valuable assets. Our commitment to innovation 
                  and customer satisfaction continues to drive us forward as we shape the future of GPS tracking.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Image
                src="https://static.wixstatic.com/media/d1fa15_11d17e60bc3e4096a09a92c82bd46855~mv2.png?originWidth=576&originHeight=448"
                alt="Locotraq team working on GPS technology"
                width={600}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-400 mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Target className="h-12 w-12 text-soft-gold mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Our Mission
                  </h3>
                  <p className="font-paragraph text-secondary">
                    To empower individuals and businesses with reliable, innovative GPS tracking 
                    solutions that provide peace of mind, enhance security, and improve operational 
                    efficiency. We strive to make advanced tracking technology accessible to everyone, 
                    regardless of their technical expertise or budget.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-soft-gold mx-auto mb-6" />
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Our Vision
                  </h3>
                  <p className="font-paragraph text-secondary">
                    To become the world's most trusted GPS tracking company, known for our innovative 
                    technology, exceptional customer service, and commitment to making the world a safer, 
                    more connected place. We envision a future where tracking technology seamlessly 
                    integrates into daily life, providing security and insights that matter.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-lg font-paragraph opacity-90">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-heading font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="font-paragraph opacity-90">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-400 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg font-paragraph text-secondary">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 text-soft-gold mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="font-paragraph text-secondary text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-400 mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-heading font-bold mb-4">
              Join the Locotraq Family
            </h2>
            <p className="text-lg font-paragraph mb-8 max-w-2xl mx-auto opacity-90">
              Experience the difference that comes with choosing a company that truly cares about your success
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
