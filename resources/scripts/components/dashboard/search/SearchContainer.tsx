import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import useEventListener from '@/plugins/useEventListener';
import SearchModal from '@/components/dashboard/search/SearchModal';

export default () => {
    const [visible, setVisible] = useState(false);

    useEventListener('keydown', (e: KeyboardEvent) => {
        if (['input', 'textarea'].indexOf(((e.target as HTMLElement).tagName || 'input').toLowerCase()) < 0) {
            if (!visible && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setVisible(true);
            }
        }
    });

    return (
        <>
            {visible && <SearchModal appear visible={visible} onDismissed={() => setVisible(false)} />}
            <button
                type={'button'}
                onClick={() => setVisible(true)}
                className={
                    'w-full h-10 px-3 flex items-center gap-3 rounded-lg bg-[#0d110f] border border-white/[0.07] hover:border-white/[0.12] text-gray-500'
                }
            >
                <FontAwesomeIcon icon={faSearch} className={'text-gray-400'} />
                <span className={'text-xs flex-1 text-left truncate'}>Search servers, users, etc...</span>
                <kbd
                    className={
                        'hidden sm:inline-flex text-[10px] text-gray-400 bg-[#151a16] border border-white/[0.07] rounded px-1.5 py-0.5'
                    }
                >
                    Ctrl K
                </kbd>
            </button>
        </>
    );
};
