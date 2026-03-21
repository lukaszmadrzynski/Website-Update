import * as React from 'react';
import { getComponent } from '../components-registry';
import DefaultBaseLayout from './DefaultBaseLayout';

export default function PageLayout(props) {
    const { page, site, tinaFieldPath } = props;
    const { seo, sections = [] } = page;

    return (
        <DefaultBaseLayout site={site}>
            <main id="main" className="sb-layout">
                {seo?.title && <title>{seo.title}</title>}
                {sections.length > 0 && (
                    <div className="flex flex-col">
                        {sections.map((section, index) => {
                            const Component = getComponent(section.__metadata.modelName);
                            if (!Component) {
                                console.warn(`No component found for section type: ${section.__metadata.modelName}`);
                                return null;
                            }
                            // Create field path for Tina visual editing
                            const fieldPath = tinaFieldPath ? `${tinaFieldPath}.sections.${index}` : undefined;
                            return (
                                <Component
                                    key={index}
                                    {...section}
                                    data-tina-field={fieldPath}
                                    sectionIndex={index}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </DefaultBaseLayout>
    );
}
