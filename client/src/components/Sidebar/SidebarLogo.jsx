import React from 'react';
import { Link } from 'react-router-dom';
import moodmirrorLogoSmall from '../../assets/moodmirror-logo-small.png';

const SidebarLogo = () => {
  return (
    <div>
      <Link to="/">
        <img className='h-[20px] w-[151px] hover:cursor-pointer flex-1 justify-start' src={moodmirrorLogoSmall} alt='MoodMirror'/>
      </Link>
      <div className='border-b mb-4 mt-2 pb-4 border-stone-300'></div>
    </div>
  );
};

export default SidebarLogo;
  