import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';





export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">
                    {props.auth.user ? (
                        <Link href={route('inventario.index')}>
                        <button className="font-semibold bg-indigo-950 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 motion-safe:hover:scale-105 transition-transform duration-250 drop-shadow-2xl">
                          Inventario
                        </button>
                      </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                >
                                <button className="font-semibold bg-indigo-950 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700 motion-safe:hover:scale-105 transition-transform duration-250">
                          Login
                        </button>
                            </Link>
                        </>
                    )}
                </div>
                

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                <div className="flex justify-center">
                <Link href="/">
                <div className="w-400 h-400">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <image
                        className="w-full h-full"
                        href="/img/aurum_logo.png"
                        height=""
                        width=""
                    />
                    </svg>
                </div>
                </Link>


                </div>
                    <div className="mt-16">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            

                        </div>
                    </div>

                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-left">
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/sponsors/taylorotwell"
                                    className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                </a>
                            </div>
                        </div>

                        <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                        Aurum Chemicals. Todos los Derechos Reservados 2023©. (Laravel) {props.laravelVersion} (PHP v{props.phpVersion})
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </>
    );
}
