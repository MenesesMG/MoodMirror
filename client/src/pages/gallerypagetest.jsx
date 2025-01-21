import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import { Dashboard } from '../components/Dashboard/Dashboard';
import videoBg from '../assets/videoBg.mp4';

const Gallerypagetest = ({ uploadedImages }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        return () => {
        };
    }, []);

    return (
        <div className="relative min-h-screen overflow-auto">
            <video autoPlay loop muted className="hidden lg:block absolute inset-0 w-full h-full object-cover z-0">
                <source src={videoBg} type="video/mp4" />
            </video>
            <main className="relative z-10 w-full flex flex-col lg:flex-row p-4 lg:p-[50px] lg:pl-[120px] lg:pr-[120px] h-screen md:p-[80px] bg-white lg:bg-transparent shadow-[0px_4px_78px_-10px_rgba(0,_0,_0,_0.1)]">
                <div className={`lg:w-[430px] flex-none transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} shadow-[0px_4px_78px_-10px_rgba(0,_0,_0,_0.1)]`}>
                    <Sidebar />
                </div>
                <div className={`flex-grow transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'} shadow-[0px_4px_78px_-10px_rgba(0,_0,_0,_0.1)]`}>
                    <Dashboard processedImages={uploadedImages} />
                </div>
            </main>
        </div>
    );
};

export default Gallerypagetest;
