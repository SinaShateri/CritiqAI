import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";

const AuthSocials = () => {
  return (
    <div className='flex flex-col gap-3.5'>
      <div className='flex items-center gap-3 my-5'>
        <div className='flex-1 h-px bg-border-subtle'></div>
        <span className='text-[11px] text-faint'>or continue with</span>
        <div className='flex-1 h-px bg-border-subtle'></div>
      </div>
      <div className='flex gap-2.5'>
        <button
          type='button'
          className='flex-1 flex items-center justify-center gap-2 bg-surface border border-border-subtle hover:border-[#2e3148] rounded-sm py-2.5 text-[12px] text-body transition-colors'
        >
          <IconBrandGoogle size={18} />
          Google
        </button>
        <button
          type='button'
          className='flex-1 flex items-center justify-center gap-2 bg-surface border border-border-subtle hover:border-[#2e3148] rounded-sm py-2.5 text-[12px] text-body transition-colors'
        >
          <IconBrandGithub size={18} />
          GitHub
        </button>
      </div>
      <p className='text-center text-[12px] text-faint mt-4'>
        Don&apos;t have an account?{' '}
        <button
          type='button'
          className='text-brand'
        >
          Create one free
        </button>
      </p>
    </div>
  );
};

export default AuthSocials;
