"use client";

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMail, FiMessageSquare, FiPhone } from 'react-icons/fi';

interface FaqItem {
  question: string;
  answer: string;
}

export default function HelpPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  const faqs: FaqItem[] = [
    {
      question: "How do I add a new tax record?",
      answer: "Navigate to the dashboard and click on the '+ Add Tax Record' button at the top of the page. Fill in the required details in the form that appears, then click 'Save' to add the record to your tax history."
    },
    {
      question: "Can I edit a tax record after saving it?",
      answer: "Yes, you can edit any tax record by clicking on the 'Edit' button that appears when you hover over a record in the tax records table. Make your changes in the form that appears and click 'Save Changes' to update the record."
    },
    {
      question: "How do I filter my tax records?",
      answer: "You can filter your tax records by using the filter options available above the tax records table. You can filter by tax type, status, or date range. Simply select your preferred filter criteria and the table will update to show only the matching records."
    },
    {
      question: "What is the difference between direct and indirect taxes?",
      answer: "Direct taxes are paid directly by an individual or organization to the government entity imposing the tax. Examples include income tax, property tax, and corporate tax. Indirect taxes, on the other hand, are collected by intermediaries (like retailers) from the person who bears the ultimate economic burden of the tax (usually the consumer). Examples include GST, sales tax, and customs duty."
    },
    {
      question: "How do I generate a tax report?",
      answer: "To generate a tax report, go to the 'Reports' section from the sidebar menu. You can choose from various report formats such as monthly reports, tax type reports, or custom date range reports. Select your preferred option and click on the 'Generate' or 'Download' button."
    },
    {
      question: "How do I change my account settings?",
      answer: "You can change your account settings by clicking on 'Settings' in the sidebar menu. From there, you can update your profile information, notification preferences, security settings, and more."
    },
    {
      question: "Is my tax data secure?",
      answer: "Yes, we take data security seriously. All your tax information is encrypted and stored securely. We use industry-standard security measures to protect your data, and we never share your information with third parties without your explicit consent."
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account from the Settings page under the Account Security tab. Please note that deleting your account will permanently remove all your data from our systems and cannot be undone."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-1">Get answers to common questions and contact support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="md:col-span-2">
          <div className="dashboard-card bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full text-left justify-between items-start focus:outline-none"
                  >
                    <h3 className="text-base font-medium text-gray-900">{faq.question}</h3>
                    <span className="ml-6 flex-shrink-0">
                      {openFaqIndex === index ? (
                        <FiChevronUp className="h-5 w-5 text-indigo-500" />
                      ) : (
                        <FiChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </span>
                  </button>
                  {openFaqIndex === index && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="dashboard-card bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Contact Support</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Need more help? Our support team is here to assist you. Choose your preferred contact method below.
              </p>
              <div className="space-y-3">
                <a href="mailto:support@taxtracker.com" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-md bg-indigo-100 mr-3">
                    <FiMail className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email Support</p>
                    <p className="text-xs text-gray-500">support@taxtracker.com</p>
                  </div>
                </a>
                <a href="tel:+911234567890" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-md bg-green-100 mr-3">
                    <FiPhone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Phone Support</p>
                    <p className="text-xs text-gray-500">+91 123-456-7890</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="p-2 rounded-md bg-blue-100 mr-3">
                    <FiMessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Live Chat</p>
                    <p className="text-xs text-gray-500">Available 9 AM - 6 PM (IST)</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="dashboard-card bg-white overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Resources</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                    User Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Video Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    FAQ Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-800">
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card bg-indigo-50 border border-indigo-100 overflow-hidden p-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold text-indigo-900">Still need help?</h2>
            <p className="text-indigo-700 mt-1">Our team of tax experts is ready to assist you with any complex questions.</p>
          </div>
          <button className="btn-gradient inline-flex items-center px-4 py-2 border-0 text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
} 