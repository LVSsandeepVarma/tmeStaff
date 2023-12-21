import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import {RiArrowDropDownLine} from "react-icons/ri";
import 'font-awesome/css/font-awesome.min.css';
import { FaTrophy } from 'react-icons/fa';
const DayOfWeekDropdown = () => {
  const [selectedDay, setSelectedDay] = useState('');


  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  const renderDropdownItems = () =>{
    const currentDate = new Date();
    const dropdownItems = []

      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);
  
        const dayOfWeek = daysOfWeek[date.getDay()];
        const formattedDate = date.toLocaleDateString();
  //       <a class="dropdown-item pl-0 pr-0">
  //       <div>
  //           <i class="fa fa-angle-double-right text-indigo mr-1"></i>
  //           <span class="text-cyan">Monday 12</span>
  //           <span class="float-right font-weight-bold text-warning fs-16">0</span>
  //       </div>
  //  </a>
        dropdownItems.push(
          <Dropdown.Item key={formattedDate} eventKey={formattedDate} onSelect={handleSelectDay}>
            {`${dayOfWeek}, ${formattedDate}`}
          </Dropdown.Item>
        );
      }
  
      return dropdownItems;
  }

  const renderMarqueeItems = () => {
    const currentDate = new Date();
    const marqueeItems = [];
    const dropdownItems = []

    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - i);

      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = date.toLocaleDateString();
//       <a class="dropdown-item pl-0 pr-0">
//       <div>
//           <i class="fa fa-angle-double-right text-indigo mr-1"></i>
//           <span class="text-cyan">Monday 12</span>
//           <span class="float-right font-weight-bold text-warning fs-16">0</span>
//       </div>
//  </a>
      marqueeItems.push(
        <p className=" mr-5  flex items-center">

                    {`${dayOfWeek}, ${formattedDate}`}
                    <span className="text-[#2fd8c6] font-bold ml-2">0</span>
                </p>

      );
      dropdownItems.push(
        <Dropdown.Item key={formattedDate} eventKey={formattedDate} onSelect={handleSelectDay}>
          {`${dayOfWeek}, ${formattedDate}`}
        </Dropdown.Item>
      );
    }

    return marqueeItems;
  };

  return (
    <>
    <div className='!hidden md:!flex md:!items-center !ml-[15px] md:!ml-[50px] w-[10vw] md:!w-[30vw] text-white' >
        <p className='!w-[30%] lg:!w-[30%] xl:!w-[15%]'>My Sales</p>
        <Marquee direction='right'>
            {renderMarqueeItems()}
        </Marquee>
    </div>
    {/* <DropdownButton
    className='!block sm:!hidden text-white flex !p-0 !m-0 h-[60%]'
      title={<p className='text-white flex m-0'> {selectedDay ? selectedDay : 'My client'}<RiArrowDropDownLine/></p>}
      variant="outline-secondary"
      onSelect={handleSelectDay}
      
    >
        
      {renderDropdownItems()}
    </DropdownButton> */}
    </>

  );
};

export default DayOfWeekDropdown;
