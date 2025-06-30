import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlans,
  fetchUserPlan,
  subscribeToPlan,
  fetchProfile,
} from "../Features/userSlice";
import { toast, Toaster } from "sonner";

function Plans() {
  const dispatch = useDispatch();
  const {
    plans,
    loadingPlans,
    plansError,
    subscribedPlanId,
    loadingSubscribedPlan,
    userPlan,
  } = useSelector((state) => state.users);
  console.log("👉 Subscribed Plan ID:", subscribedPlanId);
  const profile = useSelector((state) => state.users.profile);
  useEffect(() => {
    console.log("🎯 Final Subscribed Plan ID:", subscribedPlanId);
  }, [subscribedPlanId]);

  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.id) {
      dispatch(fetchUserPlan(profile.id)); 
    }
  }, [dispatch, profile?.id]);

  useEffect(() => {
    if (!profile?.id) return;
    const interval = setInterval(() => {
      dispatch(fetchUserPlan(profile.id));
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch, profile?.id]);

  if (loadingPlans || loadingSubscribedPlan) {
    return (
      <div className="text-center py-20 text-green-600 text-lg font-semibold">
        Loading plans...
      </div>
    );
  }
const handleSubscribe = (planId) => {
  if (!profile?.id) return;

  if (subscribedPlanId) {
    toast.error("You already have an active subscription plan.");
    return;
  }

  // Show toast loading → resolved by promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      dispatch(subscribeToPlan({ planId, userId: profile?.id }))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            const payload = res.payload;
            if (!payload?.success) {
              reject(payload.message || "Subscription failed.");
              return;
            }
            dispatch(fetchUserPlan(profile?.id)); // ✅ Refresh plan
            resolve(payload.message || "Plan subscribed successfully.");
          } else {
            reject("❌ Subscription failed due to network/server issue.");
          }
        })
        .catch(() => {
          reject("An error occurred during subscription.");
        });
    }, 1200); // Delay to simulate smoothness (1.2s)
  });

  toast.promise(promise, {
    loading: "Subscribing to your plan...",
    success: (msg) => msg,
    error: (err) => err,
  });
};
  const compareData = [
    { feature: "Plant care guides", basic: true, pro: true, premium: true },
    { feature: "Expert advice", basic: true, pro: true, premium: true },
    { feature: "Community access", basic: false, pro: true, premium: true },
    {
      feature: "Support response time",
      basic: false,
      pro: true,
      premium: true,
    },
    { feature: "Custom reminders", basic: false, pro: true, premium: true },
    { feature: "Expert video calls", basic: false, pro: false, premium: true },
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
      feedback: "The support is amazing. I'm never lost with my plant care!",
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
        {plans.map((plan, idx) => {
          const isPlanActive = userPlan?.isActive === true;
          const currentPlanId = userPlan?.planId;
          console.log("current", currentPlanId);
          const isSubscribed = isPlanActive && plan.id === currentPlanId;
          const canSubscribe = !isPlanActive;

          return (
            <div
              key={idx}
              className={`bg-white p-6 rounded-2xl shadow-lg border transition-transform duration-300 hover:scale-105 flex flex-col justify-between ${
                plan.highlighted
                  ? "border-green-600 ring-2 ring-green-400"
                  : "border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full w-max mb-4">
                  Most Popular
                </div>
              )}

              <h2 className="text-xl font-bold text-green-700 mb-2">
                {plan.planName}
              </h2>
              <p className="text-2xl font-semibold text-gray-900 mb-2">
                ₹{plan.price}
              </p>
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
              <ul className="mb-6 space-y-2 text-sm text-gray-700">
                <li>• Min Plants: {plan.minPlantsAllowed}</li>
                <li>• Max Plants: {plan.maxPlantsAllowed}</li>
                <li>• Monthly Replacements: {plan.monthlyReplacements}</li>
                <li>• Weekly Services: {plan.weeklyServices}</li>
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={!canSubscribe}
                className={`w-full mt-auto px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isSubscribed
                    ? "bg-red-600 text-white cursor-not-allowed"
                    : !canSubscribe
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : plan.highlighted
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "border border-green-500 text-green-700 hover:bg-green-50"
                }`}
              >
                {isSubscribed
                  ? "Subscribed"
                  : !canSubscribe
                  ? "Plan Already Subscribed"
                  : "Choose Plan"}
              </button>
            </div>
          );
        })}
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
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.feature}
                  </td>
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
              <div className="text-green-700 font-semibold">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-500">
                {testimonial.location}
              </div>
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
                a: "Visit frequency depends on your plan: Starter (bi-weekly), Pro (weekly), Expert (twice/week).",
              },
              {
                q: "Can I manage or skip a visit?",
                a: "Yes, you can manage or reschedule your visits from your dashboard anytime.",
              },
              {
                q: "What’s included in the plant health check?",
                a: "We inspect soil moisture, pests, sunlight needs, repotting, and overall plant vitality.",
              },
              {
                q: "How do I reach support?",
                a: "Use the support chat within the app. For Pro and Expert, we also provide phone & video support.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className="bg-white rounded-md shadow px-6 py-4 cursor-pointer"
              >
                <summary className="font-semibold text-green-700">
                  {item.q}
                </summary>
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
