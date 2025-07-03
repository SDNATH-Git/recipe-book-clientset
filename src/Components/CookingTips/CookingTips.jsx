import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Typewriter } from 'react-simple-typewriter';

const tips = [
  {
    title: 'Boil Pasta Perfectly',
    icon: '🍝',
    text: 'Use plenty of salted boiling water. Stir occasionally to keep pasta from sticking and cook evenly.',
  },
  {
    title: 'Preserve Fresh Herbs',
    icon: '🌿',
    text: 'Wrap herbs in a damp paper towel, seal in a container, and refrigerate to prolong freshness.',
  },
  {
    title: 'Fluffier Pancakes',
    icon: '🥞',
    text: 'Use buttermilk and let the batter rest. Avoid overmixing to get light and airy pancakes.',
  },
  {
    title: 'Knife Sharpness Matters',
    icon: '🔪',
    text: 'A sharp knife is safer and more efficient. Hone regularly and sharpen when needed.',
  },
  {
    title: 'Sear for Flavor',
    icon: '🔥',
    text: 'Searing meat at high heat locks in juices and builds rich, caramelized flavor.',
  },
  {
    title: 'Use a Meat Thermometer',
    icon: '🌡️',
    text: 'Ensure perfect doneness every time by checking internal temperature — no guesswork!',
  },
];

const CookingTips = () => {
  return (
    <section className="py-10 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-gray-800 dark:text-white">
          Cooking <span className="text-orange-500">
            <Typewriter
              words={['Tips & Tricks']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <Fade cascade damping={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map(({ title, icon, text }, idx) => (
              <div
                key={idx}
                className="group border-2 border-orange-500 dark:border-orange-400 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default CookingTips;
