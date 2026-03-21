import * as React from 'react';

export default function BlankBaseLayout({ children, site }) {
    return (
        <div className="min-h-screen flex flex-col">
            <main id="main" className="flex-grow">
                {children}
            </main>
        </div>
    );
}
