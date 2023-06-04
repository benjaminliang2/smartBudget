"use client"

import { FaMusic, FaFilm, FaHamburger, FaGasPump, FaLightbulb, FaStore, FaMugHot, FaCar } from 'react-icons/fa';

const icons = [
  { icon: <FaMusic />, name: 'FaMusic' },
  { icon: <FaFilm />, name: 'FaFilm' },
  { icon: <FaHamburger />, name: 'FaHamburger' },
  { icon: <FaGasPump />, name: 'FaGasPump' },
  { icon: <FaLightbulb />, name: 'FaLightbulb' },
  { icon: <FaStore />, name: 'FaStore' },
  { icon: <FaMugHot />, name: 'FaMugHot' },
  { icon: <FaCar />, name: 'FaCar' },
];

export const IconSelection = ({selectedIcon, setSelectedIcon}) => {
  return (
    <div className="flex">
      {icons.map((icon) => (
        <button
          key={icon.name}
          className={`icon-option flex items-center justify-center w-12 h-12 border border-gray-300 rounded cursor-pointer mr-4 ${selectedIcon === icon.name ? 'bg-gray-300' : ''
            }`}
            onClick={()=> console.log(icon.name)}
        >
          {icon.icon}
        </button>
      ))}
    </div>
  )
}

