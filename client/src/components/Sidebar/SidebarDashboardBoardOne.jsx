import React, { useEffect, useState } from 'react';

export const SidebarDashboardBoardOne = () => {
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    const fetchImageCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_image_count');
        const data = await response.json();
        setImageCount(data.image_count);
      } catch (error) {
        console.error('Error fetching image count:', error);
      }
    };

    fetchImageCount();
  }, []);

  return (
    <div className='w-full border rounded-2xl flex bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mt-6 mb-6'>
        <div className='h-[42px] w-[7px] bg-gradient-to-br from-teal-400 to-green-500 rounded-tr-lg rounded-br-lg mt-[20px]'></div>
        <div className='sidebardashboard-details-totalimages p-2.5 m-3 ml-[20px] text-start flex flex-col justify-center gap-[1.5px]'>
            <div className='sidedashboard-details-totalimages-header'>
                <p className='text-base font-semibold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-green-500 leading-snug'>A total of</p>
            </div>
            <div className='sidedashboard-totalimagesnumber'>
                <p className='text-4xl font-bold mb-1.5 text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-green-500 leading-snug'>{imageCount} Images</p>
            </div>
            <div className='sidedashboard-totalimageuploaded flex items-center gap-2'>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#2dd4bf', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className='text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-green-500 leading-snug'>uploaded</p>
            </div>
        </div>
    </div>
  )
}
