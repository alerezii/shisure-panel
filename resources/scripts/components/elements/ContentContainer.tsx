import styled from 'styled-components/macro';
import { breakpoint } from '@/theme';
import tw from 'twin.macro';

const ContentContainer = styled.div`
    max-width: 1600px;
    ${tw`mx-4`};

    ${breakpoint('xl')`
        ${tw`mx-8`};
    `};

    ${breakpoint('xl')`
        @media (min-width: 1900px) {
            ${tw`mx-auto`};
        }
    `};
`;
ContentContainer.displayName = 'ContentContainer';

export default ContentContainer;
