'use client';

import { useEffect, useState } from 'react';
import AnimationWrapper from '../animation-wrapper';
import { motion } from 'framer-motion';
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
  HiPaperAirplane,
  HiExternalLink,
} from 'react-icons/hi';
import { addData } from '@/services';
import toast from 'react-hot-toast';

const controls = [
  {
    name: 'name',
    placeholder: 'Your full name',
    type: 'text',
    label: 'Full Name',
  },
  {
    name: 'email',
    placeholder: 'your.email@example.com',
    type: 'email',
    label: 'Email Address',
  },
  {
    name: 'phone',
    placeholder: 'Your phone number',
    type: 'tel',
    label: 'Phone Number',
  },
  {
    name: 'message',
    placeholder: 'Tell me about your project or just say hello...',
    type: 'textarea',
    label: 'Message',
  },
];

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'annaboinalaxman6@gmail.com',
    href: 'mailto:annaboinalaxman6@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'Phone',
    value: '+91 9347518596',
    href: 'tel:+919347518596',
  },
  {
    icon: HiLocationMarker,
    label: 'Location',
    value: 'Humayun Nagar, Hyderabad',
    href: 'https://www.google.com/maps/place/Humayun+Nagar,+Hyderabad,+Telangana+500006/@17.3961964,78.44373,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb97195e201cfb:0xfa17388a85168aac!8m2!3d17.3991205!4d78.4460041!16s%2Fg%2F1hhjl1dv7?hl=en&entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D',
  },
];

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

export default function ClientContactView() {
  const [formData, setFormData] = useState(initialFormData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSendMessage() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'contact_submit',
    });
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Send email
      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const emailResult = await emailRes.json().catch(() => ({}));
      console.log('Email API Response:', emailResult);

      // Save to database
      const dbRes = await addData('contact', formData);
      console.log('Database Response:', dbRes);

      if (emailRes.ok && emailResult.success) {
        setFormData(initialFormData);
        setErrors({});
        toast.success('Contact form submitted successfully');
      } else if (dbRes && dbRes.success) {
        setFormData(initialFormData);
        setErrors({});
        toast.success('Message saved! Email delivery may have failed.');
        console.error('Email failed but DB saved:', emailResult.message);
      } else {
        console.error('Both email and DB failed:', { emailResult: emailResult.message, dbRes });
        toast.error(emailResult.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred while sending message.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const isValidForm = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      formData.message.trim()
    );
  };

  return (
    <section className="section-padding" id="contact">
      <div className="container-custom">
        {/* Header */}
        <AnimationWrapper className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4"
              style={{ color: '#fff' }}
            >
              Let's Work <span className="text-gradient">Together</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-secondary-300 max-w-2xl mx-auto px-4 sm:px-0">
              Have a project in mind? I'd love to hear about it. Send me a message and let's discuss
              how we can bring your ideas to life.
            </p>
          </motion.div>
        </AnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Contact Info */}
          <AnimationWrapper>
            <div className="space-y-6 sm:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Get in Touch</h3>
                <p className="text-sm sm:text-base text-secondary-300 mb-6 sm:mb-8 leading-relaxed">
                  I'm always open to discussing new opportunities, creative projects, or potential
                  collaborations. Feel free to reach out through any of the channels below.
                </p>
              </motion.div>

              <div className="space-y-4 sm:space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.a
                      key={index}
                      href={info.href}
                      target={info.label === 'Location' ? '_blank' : '_self'}
                      rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-surface border border-white/5 hover:bg-white/5 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-secondary-400 group-hover:text-white group-hover:font-bold text-xs sm:text-sm transition-all">
                          {info.label}
                        </p>
                        <p className="text-secondary-300 group-hover:!text-white group-hover:font-bold font-medium text-sm sm:text-base break-words transition-all">
                          {info.value}
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <HiExternalLink className="w-4 h-4 text-primary-500" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </AnimationWrapper>

          {/* Contact Form */}
          <AnimationWrapper>
            <motion.div
              className="card bg-surface border-white/10 p-4 sm:p-6 lg:p-8 mt-6 lg:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 text-white">
                Send Message
              </h3>

              <div className="space-y-4 sm:space-y-6">
                {controls.map((control, index) => (
                  <motion.div
                    key={control.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <label className="block text-sm font-medium text-secondary-300 mb-2">
                      {control.label}
                    </label>
                    {control.type === 'textarea' ? (
                      <textarea
                        name={control.name}
                        value={formData[control.name]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [control.name]: e.target.value,
                          });
                          if (errors[control.name]) {
                            setErrors({ ...errors, [control.name]: '' });
                          }
                        }}
                        placeholder={control.placeholder}
                        rows={4}
                        className={`w-full px-3 py-2 lg:px-4 lg:py-3 bg-secondary-900/50 border rounded-xl text-secondary-100 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-sm lg:text-base ${
                          errors[control.name] ? 'border-red-500' : 'border-gray-700'
                        }`}
                      />
                    ) : (
                      <input
                        type={control.type}
                        name={control.name}
                        value={formData[control.name]}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [control.name]: e.target.value,
                          });
                          if (errors[control.name]) {
                            setErrors({ ...errors, [control.name]: '' });
                          }
                        }}
                        placeholder={control.placeholder}
                        className={`w-full px-3 py-2 lg:px-4 lg:py-3 bg-secondary-900/50 border rounded-xl text-secondary-100 placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm lg:text-base ${
                          errors[control.name] ? 'border-red-500' : 'border-gray-700'
                        }`}
                      />
                    )}
                    {errors[control.name] && (
                      <p className="text-red-400 text-xs mt-1">{errors[control.name]}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-8"
              >
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !isValidForm()}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 lg:py-4 rounded-xl font-semibold transition-all duration-300 ${
                    isLoading || !isValidForm()
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane className="w-5 h-5" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </AnimationWrapper>
        </div>
      </div>
    </section>
  );
}
