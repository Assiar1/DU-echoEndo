import React, { useState, useRef, useEffect } from 'react';
import { Send, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);

    const templateParams = {
      to_email: 'ilyasassiar98@gmail.com',
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    };

    try {
      await emailjs.send(
        'service_851714l', // Replace with your service ID
        'template_hbket1w', // Replace with your template ID
        templateParams,
        'n6hL3kq7_8fFoa6K4' // Replace with your user ID
      );

      setIsSubmitting(false);
      setIsSuccess(true);
      reset();

      toast({
        title: "Message sent",
        description: "We will get back to you as soon as possible.",
        variant: "default",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>
            Have questions about the degree? Fill out the form below, and we will get back to you as soon as possible.
          </p>
        </div>

        <div ref={formRef} className="max-w-2xl mx-auto mt-12">
          <div ref={(el) => (elementsRef.current[0] = el)} className="glass-card p-8 animate-on-scroll">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-medical-dark-blue font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-medical-dark-blue font-medium mb-2">
                  Email
                </label>
                <input
                  id="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-medical-dark-blue font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-medical-light-blue/30 focus:border-medical-blue focus:ring-2 focus:ring-medical-blue/20 outline-none transition-all resize-none"
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`btn ${
                    isSuccess ? 'bg-green-500 text-white' : 'btn-primary'
                  } min-w-[150px] relative`}
                >
                  <span className={`inline-flex items-center transition-opacity ${
                    isSubmitting ? 'opacity-0' : 'opacity-100'
                  }`}>
                    {isSuccess ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Sent
                      </>
                    ) : (
                      <>
                        Send
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </span>

                  {isSubmitting && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;