import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`section-padding section-spacing ${className}`}>
      <div className="mx-auto max-w-content">
        {children}
      </div>
    </section>
  );
}
