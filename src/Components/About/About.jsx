import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto bg-orange-900/30 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
                <h1 className="text-4xl font-bold mb-6 text-orange-400">About Recipe Book</h1>
                
                <div className="space-y-6 text-lg">
                    <p className="text-orange-100">
                        Welcome to <span className="font-semibold text-orange-300">Recipe Book</span>, your ultimate digital kitchen companion! 
                        We're passionate about bringing people together through the joy of cooking.
                    </p>
                    
                    <p className="text-orange-100">
                        Our mission is simple: to make cooking accessible, enjoyable, and inspiring for everyone - 
                        from kitchen beginners to seasoned chefs.
                    </p>
                    
                    <div className="bg-orange-800/40 p-6 rounded-lg">
                        <h2 className="text-2xl font-semibold mb-4 text-orange-300">What We Offer</h2>
                        <ul className="space-y-3 list-disc pl-5 text-orange-100">
                            <li>Thousands of delicious recipes from around the world</li>
                            <li>Easy-to-follow cooking instructions</li>
                            <li>Personal recipe collections and favorites</li>
                            <li>Meal planning and shopping list tools</li>
                            <li>Dietary preference filters (vegetarian, vegan, gluten-free, etc.)</li>
                        </ul>
                    </div>
                    
                    <p className="text-orange-100">
                        Recipe Book was founded in 2025 by a team of food enthusiasts who believe that 
                        great meals create great memories. We're constantly updating our collection 
                        and adding new features to enhance your cooking experience.
                    </p>
                    
                    <p className="text-orange-200 italic">
                        "Cooking is an art, but all art requires knowing something about the techniques and materials"
                        <br />
                        <span className="text-orange-300">- Nathan Myhrvold</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;