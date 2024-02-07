---
to: app/components/ui/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---

import clsx from 'clsx';

type <%= h.changeCase.pascal(name) %>Props = {
  className?: string;
  children?: React.ReactNode;
};

export const <%= h.changeCase.pascal(name) %> = ({
  className,
  children,
}: <%= h.changeCase.pascal(name) %>Props) => {
  
  return (
    <div className={clsx('flex flex-col', className)} data-testid="<%= h.changeCase.paramCase(name) %>">
      {children}
    </div>
  );
};
