import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';
// @ts-expect-error untyped font file
import font from '@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2';

export default createGlobalStyle`
    :root {
        --background: #070908;
        --background-secondary: #0b0e0c;
        --sidebar: #080b09;
        --surface: #0d110f;
        --surface-hover: #121713;
        --surface-elevated: #151a16;
        --border: rgba(255, 255, 255, 0.07);
        --border-hover: rgba(255, 255, 255, 0.12);
        --text-primary: #f5f7f5;
        --text-secondary: #9ca39e;
        --text-muted: #626963;
        --shisure: #65ff35;
        --shisure-hover: #78ff4d;
        --shisure-muted: rgba(101, 255, 53, 0.1);
        --shisure-border: rgba(101, 255, 53, 0.25);
        --radius-sm: 8px;
        --radius: 10px;
        --transition: 180ms ease;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        background: var(--background);
    }

    @font-face {
        font-family: 'IBM Plex Sans';
        font-style: normal;
        font-display: swap;
        font-weight: 100 700;
        src: url(${font}) format('woff2-variations');
        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
    }

    body {
        ${tw`font-sans text-neutral-200`};
        background: var(--background);
        letter-spacing: 0.005em;
        min-height: 100vh;
    }

    h1, h2, h3, h4, h5, h6 {
        ${tw`font-medium tracking-normal font-header`};
    }

    p {
        ${tw`text-neutral-200 leading-snug font-sans`};
    }

    a, button, input, select, textarea {
        transition: border-color var(--transition), background-color var(--transition), color var(--transition), opacity var(--transition);
    }

    ::selection {
        color: #061005;
        background: var(--shisure);
    }

    form {
        ${tw`m-0`};
    }

    textarea, select, input, button, button:focus, button:focus-visible {
        ${tw`outline-none`};
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield !important;
    }

    /* Scroll Bar Style */
    ::-webkit-scrollbar {
        background: none;
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-thumb {
        border: solid 0 rgb(0 0 0 / 0%);
        border-right-width: 4px;
        border-left-width: 4px;
        -webkit-border-radius: 9px 4px;
        -webkit-box-shadow: inset 0 0 0 1px var(--surface-elevated), inset 0 0 0 4px var(--text-muted);
    }

    ::-webkit-scrollbar-track-piece {
        margin: 4px 0;
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-right-width: 0;
        border-left-width: 0;
        border-top-width: 4px;
        border-bottom-width: 4px;
        -webkit-border-radius: 4px 9px;
    }

    ::-webkit-scrollbar-corner {
        background: transparent;
    }

    .shisure-sidebar ~ * {
        margin-left: 264px;
    }

    .shisure-sidebar ~ .shisure-mobile-overlay {
        margin-left: 0;
    }

    .shisure-nav-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-height: 42px;
        margin: 2px 0;
        padding: 0 0.875rem;
        color: var(--text-secondary);
        border: 1px solid transparent;
        border-radius: var(--radius-sm);
        text-decoration: none;
        font-size: 0.8125rem;
        font-weight: 500;
        position: relative;
    }

    .shisure-nav-item:hover {
        color: var(--text-primary);
        background: var(--surface-hover);
    }

    .shisure-nav-item.active {
        color: var(--shisure);
        background: var(--shisure-muted);
        border-color: rgba(101, 255, 53, 0.08);
    }

    .shisure-nav-item.active::before {
        content: '';
        position: absolute;
        left: -13px;
        width: 2px;
        height: 22px;
        border-radius: 0 2px 2px 0;
        background: var(--shisure);
    }

    @media (max-width: 1023px) {
        .shisure-sidebar ~ * {
            margin-left: 0;
        }
    }
`;
