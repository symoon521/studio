import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="currentColor"
        d="M208 40H48a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm-29.6 120a40 40 0 1 1-50.3-38.3l-.1.1a40 40 0 0 1 50.4 38.2ZM93.7 82.3a40 40 0 1 1 50.3 38.3l.1-.1a40 40 0 0 1-50.4-38.2Z"
      />
    </svg>
  );
}
