import React, { useState } from "react";
import {
  Search,
  Truck,
  CreditCard,
  User,
  FileText,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

const UserHelpDesk = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    {
      icon: Truck,
      title: "Orders & Delivery",
      desc: "Track status, delivery delays",
    },
    {
      icon: CreditCard,
      title: "Payments & Refunds",
      desc: "Refund status, payment modes",
    },
    {
      icon: User,
      title: "Account & Profile",
      desc: "Login issues, address updates",
    },
    {
      icon: FileText,
      title: "Savora Gold",
      desc: "Membership benefits & points",
    },
  ];

  const faqs = [
    {
      question: "Where is my order?",
      answer:
        "You can track your live order status in the 'Overview' tab or the 'Orders' section. If the status hasn't updated for more than 10 minutes, please contact our chat support.",
    },
    {
      question: "How do I cancel my order?",
      answer:
        "Orders can be cancelled within 60 seconds of placing them for a full refund. Go to Orders > Active Orders > Cancel. After preparation begins, cancellation fees may apply.",
    },
    {
      question: "My payment failed but money was deducted.",
      answer:
        "Don't worry! If the amount was deducted, it will be automatically refunded to your source account within 3-5 business days. You can check the status in the Transactions tab.",
    },
    {
      question: "How do I use my Loyalty Points?",
      answer:
        "On the checkout page, check the 'Redeem Points' box. 10 Points = ₹1. You can pay up to 50% of your order value using points.",
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl h-full animate-fade-in text-(--text-main) overflow-hidden">
      <div className="shrink-0 border-b border-gray-100 pb-4">
        <p className="text-xs font-bold text-(--color-primary) tracking-widest uppercase mb-1 font-brand">
          Support
        </p>
        <h1 className="text-3xl font-bold tracking-tight font-brand">
          Help Desk
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-6 pr-2 scroll-smooth">
        <div className="bg-(--color-primary) rounded-2xl p-8 md:p-10 text-white shadow-xl shadow-(--color-primary)/20 relative overflow-hidden mb-8 group">
          <div className="absolute `-top-12.5 -right-12.5 w-64 h-64 bg-white opacity-5 rounded-full pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -bottom-7.5 -left-7.5 w-40 h-40 bg-white opacity-5 rounded-full pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-full mb-3 backdrop-blur-sm">
              <HelpCircle size={28} className="text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-brand mb-2">
              How can we help you today?
            </h2>
            <p className="text-rose-100 text-sm mb-8 font-medium">
              Search for issues, topics, or articles
            </p>

            <div
              className={`relative w-full transition-transform duration-300 bg-white rounded-xl ${isSearchFocused ? "scale-105" : "scale-100"}`}
            >
              <input
                type="text"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Type your issue (e.g. 'Refund status')"
                className="w-full py-4 pl-14 pr-4 rounded-xl text-gray-800 font-medium outline-none shadow-2xl shadow-black/20 focus:ring-4 focus:ring-white/30 transition-all placeholder-gray-400"
              />
              <Search
                className={`absolute left-5 top-4.5 transition-colors duration-300 ${isSearchFocused ? "text-(--color-primary)" : "text-gray-400"}`}
                size={22}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-(--bg-card) p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-(--bg-main) text-(--text-muted) flex items-center justify-center mb-4 group-hover:bg-(--color-primary) group-hover:text-white transition-colors duration-300">
                <cat.icon size={20} />
              </div>
              <h3 className="font-bold text-sm font-brand mb-1 group-hover:text-(--color-primary) transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-(--text-muted) leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold font-brand mb-4 flex items-center gap-2">
                Frequently Asked Questions
              </h3>
              <div className="flex flex-col gap-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    onClick={() => toggleFaq(index)}
                    className={`bg-(--bg-card) border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer
                       ${
                         openFaq === index
                           ? "shadow-md border-(--color-primary)/30 ring-1 ring-(--color-primary)/10"
                           : "border-gray-100 hover:border-gray-200"
                       }
                     `}
                  >
                    <div className="p-4 flex justify-between items-center bg-white z-10 relative">
                      <h4
                        className={`text-sm font-bold font-brand transition-colors ${openFaq === index ? "text-(--color-primary)" : "text-gray-700"}`}
                      >
                        {faq.question}
                      </h4>
                      <div
                        className={`transition-transform duration-300 ${openFaq === index ? "rotate-180" : "rotate-0"}`}
                      >
                        {openFaq === index ? (
                          <ChevronUp
                            size={18}
                            className="text-(--color-primary)"
                          />
                        ) : (
                          <ChevronDown size={18} className="text-gray-400" />
                        )}
                      </div>
                    </div>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden
                         ${openFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
                       `}
                    >
                      <div className="px-4 pb-4 text-sm text-(--text-muted) leading-relaxed border-t border-gray-50 pt-2 font-poppins">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="self-start text-sm font-bold text-(--color-primary) hover:underline flex items-center gap-1 group transition-all">
              View all FAQs{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="flex flex-col gap-6 sticky top-0">
            <div className="bg-(--bg-card) p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold font-brand mb-2">
                Still need help?
              </h3>
              <p className="text-xs text-(--text-muted) mb-6">
                Our support team is available 24/7 to assist you with any
                issues.
              </p>

              <div className="flex flex-col gap-3">
                <button className="flex items-center gap-4 p-3 rounded-xl bg-(--bg-main) hover:bg-white border border-transparent hover:border-(--color-primary)/30 hover:shadow-sm transition-all group text-left">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-(--color-primary) transition-colors">
                      Live Chat
                    </p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
                      Available Now
                    </p>
                  </div>
                </button>

                <button className="flex items-center gap-4 p-3 rounded-xl bg-(--bg-main) hover:bg-white border border-transparent hover:border-(--color-primary)/30 hover:shadow-sm transition-all group text-left">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-(--color-primary) transition-colors">
                      Call Support
                    </p>
                    <p className="text-xs text-(--text-muted)">
                      +91 1800-123-4567
                    </p>
                  </div>
                </button>

                <button className="flex items-center gap-4 p-3 rounded-xl bg-(--bg-main) hover:bg-white border border-transparent hover:border-(--color-primary)/30 hover:shadow-sm transition-all group text-left">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 group-hover:text-(--color-primary) transition-colors">
                      Email Us
                    </p>
                    <p className="text-xs text-(--text-muted)">
                      support@savora.com
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHelpDesk;
