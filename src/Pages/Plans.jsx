// import React from 'react'

// function Plans() {
//   return (
//     <div>
//       <h1>plans</h1>
//     </div>
//   )
// }

// export default Plans
// import React from "react";

// function Plans() {
//   const planTiers = [
//     {
//       title: "Plant Starter",
//       price: "$9.99",
//       description: "Care for a few plants",
//       features: [
//         "Care plan for 4-7 plants",
//         "Basic plant advice",
//         "Email support",
//       ],
//       highlighted: false,
//     },
//     {
//       title: "Plant Pro",
//       price: "$19.99",
//       description: "All Pro features",
//       features: [
//         "Plan for 8-11 plants",
//         "Priority email support",
//         "Personalized advice",
//         "Reminders and schedules",
//       ],
//       highlighted: true,
//     },
//     {
//       title: "Plant Expert",
//       price: "$39.99",
//       description: "All-inclusive plan",
//       features: [
//         "Plan for 12-16 plants",
//         "Expert advice via video",
//         "Monthly checkups",
//         "24/7 support",
//       ],
//       highlighted: false,
//     },
//   ];

//   return (
//     <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-16">
//       <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-10">
//         Choose Your Perfect Plant Care Plan
//       </h1>

//       {/* Plans */}
//       <div className="grid gap-8 md:grid-cols-3">
//         {planTiers.map((plan, idx) => (
//           <div
//             key={idx}
//             className={`bg-white p-6 rounded-2xl shadow-lg border transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${
//               plan.highlighted ? "border-green-600 ring-2 ring-green-400" : "border-gray-200"
//             }`}
//           >
//             {plan.highlighted && (
//               <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full w-max mb-4">
//                 Most Popular
//               </div>
//             )}
//             <h2 className="text-xl font-bold text-green-700 mb-2">{plan.title}</h2>
//             <p className="text-2xl font-semibold text-gray-900 mb-2">{plan.price}</p>
//             <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
//             <ul className="mb-6 space-y-2">
//               {plan.features.map((feature, i) => (
//                 <li key={i} className="text-green-600 flex items-center gap-2">
//                   ✓ <span className="text-gray-700">{feature}</span>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className={`w-full mt-auto px-4 py-2 text-sm font-medium rounded-lg ${
//                 plan.highlighted
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "border border-green-500 text-green-700 hover:bg-green-50"
//               }`}
//             >
//               Choose Plan
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Plans;
import React from "react";

function Plans() {
  const planTiers = [
    {
      title: "Plant Starter",
      price: "$9.99",
      description: "Care for a few plants",
      features: [
        "Care plan for 4-7 plants",
        "Basic plant advice",
        "Email support",
      ],
      highlighted: false,
    },
    {
      title: "Plant Pro",
      price: "$19.99",
      description: "All Pro features",
      features: [
        "Plan for 8-11 plants",
        "Priority email support",
        "Personalized advice",
        "Reminders and schedules",
      ],
      highlighted: true,
    },
    {
      title: "Plant Expert",
      price: "$39.99",
      description: "All-inclusive plan",
      features: [
        "Plan for 12-16 plants",
        "Expert advice via video",
        "Monthly checkups",
        "24/7 support",
      ],
      highlighted: false,
    },
  ];

  const compareData = [
    {
      feature: "Plant care guides",
      basic: true,
      pro: true,
      premium: true,
    },
    {
      feature: "Expert advice",
      basic: true,
      pro: true,
      premium: true,
    },
    {
      feature: "Community access",
      basic: false,
      pro: true,
      premium: true,
    },
    {
      feature: "Support response time",
      basic: false,
      pro: true,
      premium: true,
    },
    {
      feature: "Custom reminders",
      basic: false,
      pro: true,
      premium: true,
    },
    {
      feature: "Expert video calls",
      basic: false,
      pro: false,
      premium: true,
    },
    {
      feature: "Plant replacement guarantee",
      basic: false,
      pro: false,
      premium: true,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      feedback:
        "This has made it so much easier to care for my plants. Totally worth it!",
      location: "Green Enthusiast",
    },
    {
      name: "Robert Chan",
      feedback:
        "I enjoy the personalized advice. My plants have never looked better!",
      location: "Home Plant Parent",
    },
    {
      name: "Emma Ruiz",
      feedback:
        "The support is amazing. I'm never lost with my plant care!",
      location: "Avid Gardener",
    },
  ];

  return (
    <div className="bg-white-50 min-h-screen py-12 px-4 sm:px-6 lg:px-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-10 pt-10">
        Choose Your Perfect Plant Care Plan
      </h1>

      {/* Plans */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {planTiers.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-white p-6 rounded-2xl shadow-lg border transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${
              plan.highlighted ? "border-green-600 ring-2 ring-green-400" : "border-gray-200"
            }`}
          >
            {plan.highlighted && (
              <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full w-max mb-4">
                Most Popular
              </div>
            )}
            <h2 className="text-xl font-bold text-green-700 mb-2">{plan.title}</h2>
            <p className="text-2xl font-semibold text-gray-900 mb-2">{plan.price}</p>
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-green-600 flex items-center gap-2">
                  ✓ <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-auto px-4 py-2 text-sm font-medium rounded-lg ${
                plan.highlighted
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "border border-green-500 text-green-700 hover:bg-green-50"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>

      {/* Compare Our Plans */}
      <div className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">
          Compare Our Plans
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border rounded-lg bg-white shadow">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th className="px-6 py-3">Features</th>
                <th className="px-6 py-3">Starter</th>
                <th className="px-6 py-3">Pro</th>
                <th className="px-6 py-3">Expert</th>
              </tr>
            </thead>
            <tbody>
              {compareData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">{item.feature}</td>
                  <td className="px-6 py-4 text-center">
                    {item.basic ? "✓" : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.pro ? "✓" : "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.premium ? "✓" : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* What Our Members Say */}
      <div className="mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">
          What Our Members Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <div className="text-green-700 font-semibold">{testimonial.name}</div>
              <div className="text-sm text-gray-500">{testimonial.location}</div>
            </div>
          ))}
        </div>
        {/* FAQ Section */}
<div className="mt-20">
  <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-8">
    Frequently Asked Questions
  </h2>
  <div className="max-w-3xl mx-auto space-y-4">
    {[
      {
        q: "How often do you visit my plants?",
        a: "Visit frequency depends on your plan: Starter (bi-weekly), Pro (weekly), Expert (twice/week)."
      },
      {
        q: "Can I manage or skip a visit?",
        a: "Yes, you can manage or reschedule your visits from your dashboard anytime."
      },
      {
        q: "What’s included in the plant health check?",
        a: "We inspect soil moisture, pests, sunlight needs, repotting, and overall plant vitality."
      },
      {
        q: "How do I reach support?",
        a: "Use the support chat within the app. For Pro and Expert, we also provide phone & video support."
      }
    ].map((item, index) => (
      <details
        key={index}
        className="bg-white rounded-md shadow px-6 py-4 cursor-pointer"
      >
        <summary className="font-semibold text-green-700">{item.q}</summary>
        <p className="mt-2 text-sm text-gray-600">{item.a}</p>
      </details>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}

export default Plans;
