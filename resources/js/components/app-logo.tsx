import { FeatherIcon } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="mr-3">
                    <FeatherIcon className="h-6 w-6 text-gray-900 dark:text-gray-100" />
                </div>
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                    SilentNoir
                </div>
            </div>
        </>
    );
}
