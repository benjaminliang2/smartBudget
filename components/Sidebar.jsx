"use client"
import { FaPlus } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Link from 'next/link';
import { IconSelection } from './IconSelection';

export const SideBar = () => {
  const { data: session } = useSession()
  const [categories, setCategories] = useState()
  const [newCategory, setNewCategory] = useState('')
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState()
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

  useEffect(() => {
    console.log(selectedIcon)
  }, [selectedIcon])

  const addExpenseCategory = async () => {
    try {
      await fetch(`/api/${session?.user.id}/category`, {
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
    <>

      <div className="fixed top-10 left-0 h-min w-min flex flex-col
                    bg-white dark:bg-gray-900 shadow-lg rounded-full m-5 p-2"
      >

        <div className="relative inline-block" onClick={() => { setIsInputVisible(true) }}>
          <SideBarIcon icon={<FaPlus size="28" />} />
          {isInputVisible && (<>

            <div className="absolute top-0 left-full transform translate-x-2 ">
              <input
                className="border border-gray-300 p-2"
                ref={inputRef}
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
  
              />
              <IconSelection selectedIcon={selectedIcon} setSelectedIcon={setSelectedIcon} />
              <button type="button" onMouseDown={() => setIsInputVisible(false)} className=" px-4 py-2 text-xs font-semibold uppercase cursor-pointer outline-none transition-colors  bg-slate-200">Cancel</button>
              <button type="button" onMouseDown={() => addExpenseCategory()} className=" text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>

            </div>

          </>
          )}
        </div>

        {categories?.map((each, index) =>
          <SideBarIcon iconName="FaApple" text={each} />
        )}
      </div>
    </>

  );
};

const SideBarIcon = ({ iconName = "FaPlus", text = 'Add New Category' }) => {
  const Icon = lazy(() =>
    import(`react-icons/fa`).then(module => ({ default: module[iconName] }))
  );
  return (
    <div className="sidebar-icon group">
      <Suspense fallback={<h1>Loading...</h1>}>

        {text !== 'Add New Category' ? (
          <Link href={{ pathname: `/category/${text}` }}>
            {Icon && <Icon size="28" />}
          </Link>)
          : (
            Icon && <Icon size="28" />
          )
        }
        <span className="sidebar-tooltip group-hover:scale-100">
          {text}
        </span>
      </Suspense>
    </div>
  )


};
