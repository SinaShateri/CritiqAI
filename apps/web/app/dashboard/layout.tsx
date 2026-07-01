import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen w-full overflow-hidden bg-[#0d0f14] text-[#c8cad4]'>
      <aside className='hidden w-[200px] shrink-0 flex-col border-r border-[#1e2028] md:flex'>
        <div className='border-b border-[#1e2028] px-4 py-4'>
          <span className='text-[14px] font-medium text-[#e8eaf0]'>
            Critiq<span className='text-[#7c6df0]'>AI</span>
          </span>
        </div>
        <nav className='flex-1 px-2 py-2.5'>
          <button className='mb-0.5 flex w-full items-center gap-2 rounded-md bg-[#1a1c2e] px-2.5 py-[7px] text-[12px] text-[#c8cad4] transition-colors'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-layout-dashboard text-[#7c6df0]'
              aria-hidden='true'
            >
              <rect
                width='7'
                height='9'
                x='3'
                y='3'
                rx='1'
              ></rect>
              <rect
                width='7'
                height='5'
                x='14'
                y='3'
                rx='1'
              ></rect>
              <rect
                width='7'
                height='9'
                x='14'
                y='12'
                rx='1'
              ></rect>
              <rect
                width='7'
                height='5'
                x='3'
                y='16'
                rx='1'
              ></rect>
            </svg>
            Dashboard
          </button>
          <button className='mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-[7px] text-[12px] text-[#4a4f62] transition-colors hover:bg-[#111318]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-history'
              aria-hidden='true'
            >
              <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'></path>
              <path d='M3 3v5h5'></path>
              <path d='M12 7v5l4 2'></path>
            </svg>
            Analyses
          </button>
          <button className='mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-[7px] text-[12px] text-[#4a4f62] transition-colors hover:bg-[#111318]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-share2 lucide-share-2'
              aria-hidden='true'
            >
              <circle
                cx='18'
                cy='5'
                r='3'
              ></circle>
              <circle
                cx='6'
                cy='12'
                r='3'
              ></circle>
              <circle
                cx='18'
                cy='19'
                r='3'
              ></circle>
              <line
                x1='8.59'
                x2='15.42'
                y1='13.51'
                y2='17.49'
              ></line>
              <line
                x1='15.41'
                x2='8.59'
                y1='6.51'
                y2='10.49'
              ></line>
            </svg>
            Shared reports
          </button>
          <button className='mb-0.5 flex w-full items-center gap-2 rounded-md px-2.5 py-[7px] text-[12px] text-[#4a4f62] transition-colors hover:bg-[#111318]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-settings'
              aria-hidden='true'
            >
              <path d='M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915'></path>
              <circle
                cx='12'
                cy='12'
                r='3'
              ></circle>
            </svg>
            Settings
          </button>
        </nav>
        <div className='flex items-center gap-2 border-t border-[#1e2028] p-2.5'>
          <div className='flex h-7 w-7 items-center justify-center rounded-full border border-[#2e3148] bg-[#1a1c2e] text-[11px] text-[#7c6df0]'>
            AM
          </div>
          <div className='min-w-0'>
            <div className='truncate text-[12px] font-medium text-[#c8cad4]'>
              Alex Morgan
            </div>
            <div className='text-[10px] text-[#3f4254]'>Free plan</div>
          </div>
        </div>
      </aside>
      {children}
      <nav className='fixed inset-x-0 bottom-0 z-10 flex h-14 items-center justify-around border-t border-[#1e2028] bg-[#0d0f14] md:hidden'>
        <button
          className='p-2 text-[#7c6df0]'
          aria-label='Dashboard'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='lucide lucide-layout-dashboard'
            aria-hidden='true'
          >
            <rect
              width='7'
              height='9'
              x='3'
              y='3'
              rx='1'
            ></rect>
            <rect
              width='7'
              height='5'
              x='14'
              y='3'
              rx='1'
            ></rect>
            <rect
              width='7'
              height='9'
              x='14'
              y='12'
              rx='1'
            ></rect>
            <rect
              width='7'
              height='5'
              x='3'
              y='16'
              rx='1'
            ></rect>
          </svg>
        </button>
        <button
          className='p-2 text-[#4a4f62]'
          aria-label='Analyses'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='lucide lucide-history'
            aria-hidden='true'
          >
            <path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'></path>
            <path d='M3 3v5h5'></path>
            <path d='M12 7v5l4 2'></path>
          </svg>
        </button>
        <button
          className='p-2 text-[#4a4f62]'
          aria-label='Shared reports'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='lucide lucide-share2 lucide-share-2'
            aria-hidden='true'
          >
            <circle
              cx='18'
              cy='5'
              r='3'
            ></circle>
            <circle
              cx='6'
              cy='12'
              r='3'
            ></circle>
            <circle
              cx='18'
              cy='19'
              r='3'
            ></circle>
            <line
              x1='8.59'
              x2='15.42'
              y1='13.51'
              y2='17.49'
            ></line>
            <line
              x1='15.41'
              x2='8.59'
              y1='6.51'
              y2='10.49'
            ></line>
          </svg>
        </button>
        <button
          className='p-2 text-[#4a4f62]'
          aria-label='Settings'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            className='lucide lucide-settings'
            aria-hidden='true'
          >
            <path d='M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915'></path>
            <circle
              cx='12'
              cy='12'
              r='3'
            ></circle>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
