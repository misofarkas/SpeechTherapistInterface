import React from 'react'

import {FaRegCalendar, FaRegListAlt, FaUserAlt} from 'react-icons/fa';

export const SidebarData = [
    {
        title: 'Patients',
        path: '/',
        icon: <FaUserAlt />,
        cName: 'nav-text'
    },
    {
        title: 'Calendar',
        path: '/calendar',
        icon: <FaRegCalendar />,
        cName: 'nav-text'
    },
    {
        title: 'Exercises',
        path: '/exercises',
        icon: <FaRegListAlt />,
        cName: 'nav-text'
    }

]