import React, { memo } from 'react';
import { ServerContext } from '@/state/server';
import Can from '@/components/elements/Can';
import ServerContentBlock from '@/components/elements/ServerContentBlock';
import isEqual from 'react-fast-compare';
import Spinner from '@/components/elements/Spinner';
import Features from '@feature/Features';
import Console from '@/components/server/console/Console';
import StatGraphs from '@/components/server/console/StatGraphs';
import PowerButtons from '@/components/server/console/PowerButtons';
import ServerDetailsBlock from '@/components/server/console/ServerDetailsBlock';
import { Alert } from '@/components/elements/alert';
import { Link } from 'react-router-dom';

export type PowerAction = 'start' | 'stop' | 'restart' | 'kill';

const ServerConsoleContainer = () => {
    const name = ServerContext.useStoreState((state) => state.server.data!.name);
    const description = ServerContext.useStoreState((state) => state.server.data!.description);
    const isInstalling = ServerContext.useStoreState((state) => state.server.isInstalling);
    const isTransferring = ServerContext.useStoreState((state) => state.server.data!.isTransferring);
    const eggFeatures = ServerContext.useStoreState((state) => state.server.data!.eggFeatures, isEqual);
    const isNodeUnderMaintenance = ServerContext.useStoreState((state) => state.server.data!.isNodeUnderMaintenance);
    const status = ServerContext.useStoreState((state) => state.status.value);

    return (
        <ServerContentBlock title={'Console'}>
            {(isNodeUnderMaintenance || isInstalling || isTransferring) && (
                <Alert type={'warning'} className={'mb-4'}>
                    {isNodeUnderMaintenance
                        ? 'The node of this server is currently under maintenance and all actions are unavailable.'
                        : isInstalling
                        ? 'This server is currently running its installation process and most actions are unavailable.'
                        : 'This server is currently being transferred to another node and all actions are unavailable.'}
                </Alert>
            )}
            <div className={'flex items-center gap-2 text-xs text-gray-500 mb-4'}>
                <Link to={'/'} className={'text-gray-500 hover:text-shisure-500 no-underline'}>
                    Servers
                </Link>
                <span>/</span>
                <span className={'text-gray-300 truncate'}>{name}</span>
            </div>
            <div className={'grid grid-cols-4 gap-4 mb-6'}>
                <div className={'col-span-4 sm:col-span-2 lg:col-span-3 pr-4'}>
                    <div className={'flex items-center gap-3'}>
                        <span
                            className={
                                'flex w-10 h-10 items-center justify-center rounded-lg bg-shisure-500/10 border border-shisure-500/20 text-shisure-500 font-semibold'
                            }
                        >
                            {name.slice(0, 2).toUpperCase()}
                        </span>
                        <div className={'min-w-0'}>
                            <div className={'flex items-center gap-2'}>
                                <h1
                                    className={
                                        'font-header font-semibold text-[26px] text-gray-50 leading-tight truncate'
                                    }
                                >
                                    {name}
                                </h1>
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                        status === 'running'
                                            ? 'bg-shisure-500/10 text-shisure-500'
                                            : status === 'offline'
                                            ? 'bg-gray-600 text-gray-300'
                                            : 'bg-yellow-500/10 text-yellow-400'
                                    }`}
                                >
                                    <i
                                        className={`w-1.5 h-1.5 rounded-full ${
                                            status === 'running'
                                                ? 'bg-shisure-500'
                                                : status === 'offline'
                                                ? 'bg-gray-400'
                                                : 'bg-yellow-400'
                                        }`}
                                    />
                                    {status || 'Connecting'}
                                </span>
                            </div>
                            <p className={'text-sm text-gray-400 mt-1 line-clamp-1'}>
                                {description || 'Managed game server'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={'col-span-4 sm:col-span-2 lg:col-span-1 self-end'}>
                    <Can action={['control.start', 'control.stop', 'control.restart']} matchAny>
                        <PowerButtons className={'flex sm:justify-end space-x-2'} />
                    </Can>
                </div>
            </div>
            <div className={'grid grid-cols-12 gap-3 sm:gap-4 mb-4'}>
                <div className={'flex col-span-12 xl:col-span-9 min-w-0'}>
                    <Spinner.Suspense>
                        <Console />
                    </Spinner.Suspense>
                </div>
                <ServerDetailsBlock className={'col-span-12 xl:col-span-3 order-last xl:order-none'} />
            </div>
            <div className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4'}>
                <Spinner.Suspense>
                    <StatGraphs />
                </Spinner.Suspense>
            </div>
            <Features enabled={eggFeatures} />
        </ServerContentBlock>
    );
};

export default memo(ServerConsoleContainer, isEqual);
