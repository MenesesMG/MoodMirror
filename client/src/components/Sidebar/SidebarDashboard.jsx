import React from 'react';
import { SidebarDashboardBoardOne } from './SidebarDashboardBoardOne';
import { SidebarDashboardBoardSecond } from './SidebarDashboardBoardSecond';
import { SidebarDashboardBoardThird } from './SidebarDashboardBoardThree';
import { Scrollbars } from 'react-custom-scrollbars-2';

export const SidebarDashboard = () => {
  return (
    <>
      <div className='sidebardashboard-description text-start mt-[20px]'>
        <h2 className='font-bold text-gray-500'>Overview</h2>
        <p className='font-light text-gray-500 text-sm'>Here are the general statistics of the images.</p>
      </div>

      <div className="hidden lg:block relative h-[650px]">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: '100%' }}
          renderThumbVertical={props => <div {...props} className="scrollbar-thumb" />}
        >
          <div className="pr-3">
            <SidebarDashboardBoardOne />
            <SidebarDashboardBoardSecond />
            <SidebarDashboardBoardThird />
          </div>
        </Scrollbars>
        <div className="scroll-fade"></div>
      </div>

      <div className="block lg:hidden pr-3">
        <SidebarDashboardBoardOne />
        <SidebarDashboardBoardSecond />
        <SidebarDashboardBoardThird />
      </div>
    </>
  );
};
