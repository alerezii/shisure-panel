import React, { useState } from 'react';
import { Link, NavLink, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArchive,
    faBars,
    faClock,
    faCogs,
    faDatabase,
    faFolder,
    faHistory,
    faHome,
    faGlobe,
    faLayerGroup,
    faNetworkWired,
    faPlay,
    faServer,
    faSignOutAlt,
    faSlidersH,
    faTerminal,
    faTimes,
    faUserCircle,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Avatar from '@/components/Avatar';
import routes from '@/routers/routes';
import Can from '@/components/elements/Can';

const SHISURE_HOME_URL = 'https://shisure.com';

const icons = {
    Console: faTerminal,
    Files: faFolder,
    Databases: faDatabase,
    Schedules: faClock,
    Users: faUsers,
    Backups: faArchive,
    Network: faNetworkWired,
    Startup: faPlay,
    Settings: faSlidersH,
    Activity: faHistory,
};

const Brand = () => (
    <a href={SHISURE_HOME_URL} className={'flex items-center gap-3 px-5 h-[72px] no-underline border-b border-white/5'}>
        <span
            className={
                'flex items-center justify-center w-9 h-9 rounded-lg bg-shisure-500 text-[#061005] font-bold text-sm'
            }
        >
            SN
        </span>
        <span className={'text-gray-50 font-semibold tracking-[0.16em] text-sm leading-tight'}>
            SHISURE
            <small className={'block text-[10px] tracking-[0.32em] text-gray-400 font-medium mt-0.5'}>NODES</small>
        </span>
    </a>
);

const ServerNavigation = () => {
    const match = useRouteMatch<{ id: string }>('/server/:id');
    if (!match) return null;

    const to = (value: string) =>
        value === '/' ? match.url : `${match.url.replace(/\/*$/, '')}/${value.replace(/^\/+/, '')}`;

    return (
        <>
            <p className={'px-5 pt-6 pb-2 text-[10px] uppercase tracking-[0.18em] text-gray-500'}>Workspace</p>
            <NavLink to={'/'} exact className={'shisure-nav-item'}>
                <FontAwesomeIcon icon={faLayerGroup} fixedWidth />
                <span>Servers</span>
            </NavLink>
            <a href={SHISURE_HOME_URL} className={'shisure-nav-item'}>
                <FontAwesomeIcon icon={faGlobe} fixedWidth />
                <span>Shisure website</span>
            </a>
            <p className={'px-5 pt-6 pb-2 text-[10px] uppercase tracking-[0.18em] text-gray-500'}>Server management</p>
            {routes.server
                .filter((route) => !!route.name)
                .map((route) => {
                    const link = (
                        <NavLink
                            key={route.path}
                            to={to(route.path)}
                            exact={route.exact}
                            className={'shisure-nav-item'}
                        >
                            <FontAwesomeIcon icon={icons[route.name as keyof typeof icons] || faServer} fixedWidth />
                            <span>{route.name}</span>
                        </NavLink>
                    );
                    return route.permission ? (
                        <Can key={route.path} action={route.permission} matchAny>
                            {link}
                        </Can>
                    ) : (
                        link
                    );
                })}
        </>
    );
};

const DashboardNavigation = () => {
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    return (
        <>
            <p className={'px-5 pt-6 pb-2 text-[10px] uppercase tracking-[0.18em] text-gray-500'}>Workspace</p>
            <NavLink to={'/'} exact className={'shisure-nav-item'}>
                <FontAwesomeIcon icon={faLayerGroup} fixedWidth />
                <span>Servers</span>
            </NavLink>
            <NavLink to={'/account'} className={'shisure-nav-item'}>
                <FontAwesomeIcon icon={faUserCircle} fixedWidth />
                <span>Account</span>
            </NavLink>
            <a href={SHISURE_HOME_URL} className={'shisure-nav-item'}>
                <FontAwesomeIcon icon={faGlobe} fixedWidth />
                <span>Shisure website</span>
            </a>
            {rootAdmin && (
                <a href={'/admin'} className={'shisure-nav-item'}>
                    <FontAwesomeIcon icon={faCogs} fixedWidth />
                    <span>Administration</span>
                </a>
            )}
        </>
    );
};

export default ({ server = false }: { server?: boolean }) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = useStoreState((state: ApplicationStore) => state.user.data!);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error location assignment is intentional.
            window.location = '/';
        });
    };

    return (
        <>
            <SpinnerOverlay visible={isLoggingOut} />
            {mobileOpen && (
                <button
                    aria-label={'Close navigation'}
                    className={'shisure-mobile-overlay fixed inset-0 z-40 bg-black/70 lg:hidden'}
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <aside
                className={`shisure-sidebar fixed inset-y-0 left-0 z-50 w-[264px] bg-[#080b09] border-r border-white/[0.07] transform transition-transform duration-200 lg:translate-x-0 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <Brand />
                <nav className={'px-3 pb-5 overflow-y-auto h-[calc(100vh-144px)]'} onClick={() => setMobileOpen(false)}>
                    {server ? <ServerNavigation /> : <DashboardNavigation />}
                </nav>
                <div
                    className={
                        'absolute bottom-0 inset-x-0 h-[72px] px-4 flex items-center border-t border-white/5 bg-[#080b09]'
                    }
                >
                    <Link to={'/account'} className={'flex items-center gap-3 min-w-0 no-underline flex-1'}>
                        <span className={'w-9 h-9 flex-shrink-0'}>
                            <Avatar.User />
                        </span>
                        <span className={'min-w-0'}>
                            <strong className={'block text-sm text-gray-50 font-medium truncate'}>
                                {user.username}
                            </strong>
                            <small className={'block text-[11px] text-gray-500 truncate'}>{user.email}</small>
                        </span>
                    </Link>
                    <button
                        onClick={onTriggerLogout}
                        className={'ml-2 text-gray-500 hover:text-shisure-500 p-2'}
                        aria-label={'Sign out'}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </div>
            </aside>
            <header
                className={
                    'shisure-topbar sticky top-0 z-30 h-[72px] bg-[#070908]/95 border-b border-white/[0.07] backdrop-blur flex items-center px-4 sm:px-6'
                }
            >
                <button
                    className={'lg:hidden mr-3 p-2 text-gray-300 hover:text-white'}
                    onClick={() => setMobileOpen(true)}
                    aria-label={'Open navigation'}
                >
                    <FontAwesomeIcon icon={mobileOpen ? faTimes : faBars} />
                </button>
                <div className={'hidden sm:flex items-center gap-2 text-xs text-gray-500 mr-auto'}>
                    <FontAwesomeIcon icon={faHome} />
                    <span>/</span>
                    <span className={'text-gray-300'}>{server ? 'Server' : 'Dashboard'}</span>
                </div>
                <div className={'w-full sm:w-auto sm:min-w-[360px]'}>
                    <SearchContainer />
                </div>
                <Link to={'/account'} className={'hidden sm:flex ml-4 items-center gap-3 no-underline'}>
                    <span className={'w-8 h-8'}>
                        <Avatar.User />
                    </span>
                    <span className={'hidden xl:block leading-tight'}>
                        <strong className={'block text-xs text-gray-100 font-medium'}>{user.username}</strong>
                        <small className={'text-[10px] text-gray-500'}>
                            {user.rootAdmin ? 'Administrator' : 'Customer'}
                        </small>
                    </span>
                </Link>
            </header>
        </>
    );
};
