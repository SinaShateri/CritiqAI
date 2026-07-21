import cn from '@repo/utils/cn';
import { Children, KeyboardEvent, ReactElement, ReactNode, isValidElement, useId, useRef } from 'react';

type TabsProps = {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  label?: string;
};

type TabProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

const Tabs = ({ children, value, onValueChange, className, label = 'Tabs' }: TabsProps) => {
  const id = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabs = Children.toArray(children).filter(isValidElement<TabProps>) as Array<ReactElement<TabProps>>;
    const count = tabs.length;

    if (count === 0) {
      return;
    }

    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % count;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = count - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    if (nextTab) {
      onValueChange(nextTab.props.value);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const tabs = Children.toArray(children).filter(isValidElement<TabProps>) as Array<ReactElement<TabProps>>;

  return (
    <div className={cn('flex flex-wrap gap-2', className)} role='tablist' aria-label={label}>
      {tabs.map((tab, index) => {
        const selected = tab.props.value === value;
        const tabId = `${id}-${tab.props.value}`;

        return (
          <button
            key={tab.props.value}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            type='button'
            role='tab'
            id={tabId}
            aria-selected={selected}
            aria-controls={`${id}-panel`}
            tabIndex={selected ? 0 : -1}
            className={cn(
              'rounded-full border border-border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              selected ? 'bg-primary/10 text-primary' : 'bg-surface text-foreground-muted hover:text-foreground',
              tab.props.className,
            )}
            onClick={() => onValueChange(tab.props.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {tab.props.children}
          </button>
        );
      })}
    </div>
  );
};

const Tab = ({ children }: TabProps) => <>{children}</>;

export { Tabs, Tab };
export default Tabs;
