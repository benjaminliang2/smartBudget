"use client"
import { FaPlus } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export const SideBar = () => {
  const { data: session } = useSession()
  const [categories, setCategories] = useState()
  const [newCategory, setNewCategory] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)
  const inputRef = useRef(null)
  useEffect(() => {
    const fillSidebar = async () => {
      try {
        await fetch(`/api/${session?.user.id}`)
          .then(response => response.json())
          .then(data => setCategories(data))
      } catch (error) {
        console.log(error)
      }
    }
    fillSidebar()
  }, [session?.user.id])
  useEffect(() => {
    if (isInputVisible) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const addExpenseCategory = async () => {
    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: `${newCategory}`,
          userId: session?.user.id
        })
      })
        .then(response => console.log(response))
      setNewCategory('')
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                    bg-white dark:bg-gray-900 shadow-lg"

    >
      <div className="relative inline-block" onClick={() => { setIsInputVisible(true) }}>
        <SideBarIcon icon={<FaPlus size="28" />} />
        {isInputVisible && (<>

          <div className="absolute top-0 left-full transform translate-x-2">
            <input
              className="border border-gray-300 p-2"
              ref={inputRef}
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onBlur={() => setIsInputVisible(false)}
            />
            <button type="button" onMouseDown={() => addExpenseCategory()} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>

          </div>

        </>
        )}
      </div>


      {categories?.map((each, index) =>
        <SideBarIcon icon={<FaPlus size="28" />} text={each} />
      )}

    </div>



  );
};

const SideBarIcon = ({ icon, text = 'Add New Category' }) => (
  <div className="sidebar-icon group">
    <Link href={{pathname:`/category/${text}`}}>

      {icon}
    </Link>
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);