import { Fade } from 'react-awesome-reveal';
import { Typewriter } from 'react-simple-typewriter';

const chefs = [
  {
    name: 'Chef Mei Ling',
    image: 'https://i.postimg.cc/4xWdsLxj/ronan-kruithof-x5-NGqt2hdr-E-unsplash.jpg',
    cuisine: 'Chinese',
    recipes: 9,
    bio: 'Chef Mei Ling specializes in traditional and modern Chinese dishes, known for her attention to detail and aromatic spices.'
  },
  {
    name: 'Chef Raj',
    image: 'https://i.postimg.cc/sgjxFdsp/vadim-markin-BFt-Il-Gd-WKbk-unsplash.jpg',
    cuisine: 'Indian',
    recipes: 15,
    bio: 'From the streets of Delhi to fine dining, Chef Raj crafts bold and flavorful Indian recipes rooted in culture and heritage.'
  },
];

const FeaturedChefs = () => {
  return (
    <section className="py-10 px-4 bg-gray-300 transition-all duration-300">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl my-4 font-bold text-red-600 mb-4">
          Meet Our{' '}
          <span className="text-green-600">
            <Typewriter
              words={['Featured Chefs', 'Top Culinary Artists', 'Master Cooks']}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <p className="text-gray-800 mb-12 max-w-xl mx-auto">
          Discover the expert creators behind our top-rated recipes. Passionate about flavor, dedicated to culinary art.
        </p>

        <Fade cascade damping={0.2}>
          <div className="flex flex-col gap-10">
            {chefs.map((chef, idx) => {
              const isImageLeft = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row ${isImageLeft ? '' : 'md:flex-row-reverse'
                    } items-center border-2 border-orange-500 bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="relative w-full md:w-1/3 h-96">
                    <img
                      src={chef.image}
                      alt={chef.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  </div>
                  <div className="p-6 text-left text-white flex flex-col justify-center md:w-2/3">
                    <h3 className="text-5xl font-semibold mb-1">{chef.name}</h3>
                    <p className="text-orange-400 font-medium text-2xl mb-2">{chef.cuisine} Cuisine</p>
                    <p className="text-gray-300 mb-2">{chef.recipes} recipes shared</p>
                    <p className="text-gray-400 text-sm">{chef.bio}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default FeaturedChefs;
