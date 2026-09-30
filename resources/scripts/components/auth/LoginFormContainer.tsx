import React, { forwardRef } from 'react';
import { Form } from 'formik';
import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import FlashMessageRender from '@/components/FlashMessageRender';
import tw from 'twin.macro';

type Props = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> & {
    title?: string;
};

const Container = styled.div`
    ${tw`w-full mx-auto px-4`};
    max-width: 460px;

    ${breakpoint('sm')`
        ${tw`px-0`}
    `};
`;

export default forwardRef<HTMLFormElement, Props>(({ title, ...props }, ref) => (
    <Container>
        <div css={tw`flex flex-col items-center mb-8`}>
            <a
                href={'https://shisure.com'}
                aria-label={'Go to Shisure Nodes website'}
                css={tw`flex items-center justify-center w-12 h-12 rounded-lg bg-primary-500 text-neutral-900 font-bold mb-4 no-underline`}
            >
                SN
            </a>
            <p css={tw`text-sm font-semibold tracking-[0.18em] text-neutral-50`}>SHISURE NODES</p>
            {title && <h2 css={tw`text-2xl text-center text-neutral-100 font-semibold mt-6`}>{title}</h2>}
            <p css={tw`text-sm text-neutral-400 mt-2`}>Enter your credentials to access your infrastructure.</p>
        </div>
        <FlashMessageRender css={tw`mb-2 px-1`} />
        <Form {...props} ref={ref}>
            <div css={tw`w-full bg-neutral-700 border border-white/[0.07] rounded-[10px] p-6 sm:p-8`}>
                <div>{props.children}</div>
            </div>
        </Form>
        <p css={tw`text-center text-neutral-500 text-xs mt-4`}>
            Shisure Nodes &copy; {new Date().getFullYear()} &middot; Secure control panel
        </p>
    </Container>
));
