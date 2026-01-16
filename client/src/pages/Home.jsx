import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clock,
  Star,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <section className="relative bg-rose-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left z-10">
            <h1
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
            >
              Experience the <br />
              <span className="text-rose-600">Art of Food</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              From gourmet kitchens to your doorstep. Savora brings you fresh,
              chef-curated meals with zero hassle and maximum flavor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div
                className="bg-rose-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center justify-center gap-2 group cursor-pointer"
              >
                Order Now
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </div>
              <Link
                to="/about"
                className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-rose-600 hover:text-rose-600 transition-all"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover"
                    src={`https://randomuser.me/api/portraits/thumb/men/${
                      i + 20
                    }.jpg`}
                    alt="user"
                  />
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 gap-1">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-sm text-gray-500 font-semibold">
                  10k+ Happy Customers
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
              alt="Delicious Food Spread"
              className="w-full h-auto rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight"
            >
              Why Choose Savora?
            </h2>
            <div className="w-20 h-1 bg-rose-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Clock size={40} className="text-rose-600" />,
                title: "Fastest Delivery",
                desc: "We promise to deliver within 30 minutes or your food is free.",
              },
              {
                icon: <ShieldCheck size={40} className="text-rose-600" />,
                title: "Quality Guarantee",
                desc: "Hygiene and quality are our top priorities. Certified fresh.",
              },
              {
                icon: <UtensilsCrossed size={40} className="text-rose-600" />,
                title: "Master Chefs",
                desc: "Dishes prepared by experienced chefs with passion and care.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-rose-100 group"
              >
                <div className="mb-6 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3
                  style={{ fontFamily: "var(--font-outfit)" }}
                  className="text-xl font-bold text-gray-900 mb-3"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-rose-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2
                style={{ fontFamily: "var(--font-outfit)" }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight"
              >
                Popular Cravings
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Top rated dishes from our kitchen
              </p>
            </div>
            <Link
              to="/menu"
              className="text-rose-600 font-bold hover:text-rose-800 flex items-center gap-1"
            >
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Spicy Burger",
                price: "$12.99",
                img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop",
              },
              {
                name: "Fresh Salad",
                price: "$9.50",
                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1500&auto=format&fit=crop",
              },
              {
                name: "Margherita Pizza",
                price: "$15.00",
                img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1500&auto=format&fit=crop",
              },
              {
                name: "Creamy Pasta",
                price: "$13.40",
                img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1500&auto=format&fit=crop",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3
                    style={{ fontFamily: "var(--font-outfit)" }}
                    className="text-lg font-bold text-gray-900"
                  >
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-rose-600 font-bold text-lg">
                      {item.price}
                    </span>
                    <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10">
              <h2
                style={{ fontFamily: "var(--font-outfit)" }}
                className="text-3xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to taste the difference?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto font-medium">
                Join thousands of foodies who trust Savora for their daily
                cravings. Register now and get 50% off your first order.
              </p>
              <Link
                to="/register"
                className="inline-block bg-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-500 hover:scale-105 transition-all shadow-xl shadow-rose-900/50"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
