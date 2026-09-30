import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex no-underline text-neutral-200 items-center bg-neutral-700 p-4 transition-colors duration-150 overflow-hidden`};
    border: 1px solid var(--border);
    border-radius: var(--radius);

    ${(props) =>
        props.$hoverable !== false &&
        `&:hover { border-color: var(--shisure-border); background: var(--surface-hover); }`};

    & .icon {
        ${tw`rounded-lg w-12 h-12 flex items-center justify-center bg-neutral-600 p-3`};
        color: var(--shisure);
    }
`;
