import * as React from 'react';
import { getComponent } from '../components-registry';

export default function DefaultBaseLayout({ children, site }) {
    const { header, footer, footer2 } = site;

    return (
        <div className="min-h-screen flex flex-col">
            {header && (
                <header className="sb-layout-header">
                    <HeaderRenderer section={header} />
                </header>
            )}
            <main id="main" className="flex-grow">
                {children}
            </main>
            {footer && (
                <footer className="sb-layout-footer">
                    <FooterRenderer section={footer} />
                </footer>
            )}
            {footer2 && (
                <footer className="sb-layout-footer">
                    <FooterRenderer section={footer2} />
                </footer>
            )}
        </div>
    );
}

function HeaderRenderer({ section }) {
    const Component = getComponent(section.__metadata?.modelName || 'Header');
    if (!Component) {
        return null;
    }
    return <Component {...section} />;
}

function FooterRenderer({ section }) {
    const Component = getComponent(section.__metadata?.modelName || 'Footer');
    if (!Component) {
        return null;
    }
    return <Component {...section} />;
}
