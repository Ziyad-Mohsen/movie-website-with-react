import { motion } from "motion/react";

function QuickActions() {
  const actions = [
    { label: "Trending", icon: "🔥", desc: "Popular movies now" },
    { label: "New Releases", icon: "🎬", desc: "Latest releases" },
    { label: "My Watchlist", icon: "📝", desc: "Saved content" },
    { label: "Random Pick", icon: "🎲", desc: "Discover something new" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 bg-gray-900 border border-gray-700 rounded-lg p-4"
    >
      <div className="text-sm text-gray-400 mb-3">Quick actions</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="text-left cursor-pointer p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{action.icon}</span>
              <span className="font-medium">{action.label}</span>
            </div>
            <div className="text-xs text-gray-500">{action.desc}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

export default QuickActions;
