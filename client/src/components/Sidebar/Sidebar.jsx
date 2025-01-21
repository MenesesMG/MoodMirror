import React from 'react';
import SidebarLogo from './SidebarLogo';
import { SidebarDashboard } from './SidebarDashboard';

const Sidebar = () => {
    return (
        <div className="h-full flex flex-col">
            <div className="bg-transparent lg:bg-[#F8F8F8] w-full h-full lg:rounded-tl-3xl lg:rounded-bl-3xl p-4 lg:p-[45px] pt-[60px] flex flex-col">
                <SidebarLogo />
                <SidebarDashboard className="flex-grow" />
            </div>
        </div>
    );
};

export default Sidebar;
