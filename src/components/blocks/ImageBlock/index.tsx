// src/components/blocks/ImageBlock/index.tsx
import * as React from 'react';
import Image from 'next/image'; // <<<<<< ADD THIS IMPORT
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function ImageBlock(props) {
    const {
        elementId,
        className, // For the outer div
        imageClassName, // For the NextImage component itself
        url,
        altText = '',
        styles = {},
        // It's best to pass these from your content JSON if possible for flexibility
        // This allows each image instance to define its own dimensions, layout, and priority
        width: propWidth,
        height: propHeight,
        layout: propLayout,
        priority: propPriority
    } = props;

    if (!url) {
        return null;
    }

    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? {
              'data-sb-field-path': [
                  fieldPath,
                  `${fieldPath}.url#@src`, // Points to the URL for Stackbit editing
                  `${fieldPath}.altText#@alt`, // Points to altText
                  `${fieldPath}.elementId#@id`, // Points to elementId
                  // Add annotations for new props if you want them editable in Stackbit
                  propWidth ? `${fieldPath}.width#@width` : null,
                  propHeight ? `${fieldPath}.height#@height` : null,
                  propLayout ? `${fieldPath}.layout#@layout` : null,
                  propPriority ? `${fieldPath}.priority#@priority` : null
              ]
                  .filter(Boolean) // Remove nulls if props aren't passed
                  .join(' ')
                  .trim()
          }
        : {};

    // --- Determine Image Properties ---
    let imageWidth;
    let imageHeight;
    let imageLayout = propLayout || 'responsive'; // Default to responsive for content images
    let imagePriority = propPriority || false;   // Default to false

    if (url.includes('Logo White.png')) {
        imageWidth = propWidth || 100;   // <<<<< ACTUAL WIDTH of Logo White.png
        imageHeight = propHeight || 100;  // <<<<< ACTUAL HEIGHT of Logo White.png
        imageLayout = propLayout || 'intrinsic'; // 'intrinsic' or 'fixed' is good for logos
        imagePriority = propPriority || true;    // Logos are often priority
    } else if (url.includes('CM Hero2.webp')) {
        imageWidth = propWidth || 1366;  // <<<<< ACTUAL WIDTH of CM Hero2.webp
        imageHeight = propHeight || 768; // <<<<< ACTUAL HEIGHT of CM Hero2.webp
        imageLayout = propLayout || 'responsive';// Responsive is good for hero images
        imagePriority = propPriority || true;     // Hero images are LCP, so priority
    } else {
        // Fallback for other images - requires width/height to be passed as props
        if (!propWidth || !propHeight) {
            console.warn(
                `ImageBlock: width and height props are required for image: ${url} when not explicitly handled. This can cause CLS. Please provide them in your content source or add specific handling in ImageBlock.tsx.`
            );
            // To prevent build errors with next/image when width/height are unknown and layout isn't 'fill',
            // we must provide some values or ensure layout is 'fill' AND parent has dimensions + position:relative.
            // Returning null or an empty fragment might be safer than rendering a broken image.
            // For now, let's log and potentially return null if critical dimensions are missing.
            // If you expect other images, it's best to ensure their dimensions are passed via props.
            return (
                <div
                    id={elementId}
                    className={classNames('sb-component sb-component-block sb-component-image-block image-missing-dims', className)}
                    {...annotations}
                >
                    {/* Optional: Render a placeholder or nothing if dimensions are truly unknown */}
                    {/* <p style={{ color: 'red' }}>Image dimensions missing for: {url}</p> */}
                </div>
            );
        }
        imageWidth = propWidth;
        imageHeight = propHeight;
        // imageLayout remains (propLayout || 'responsive')
        // imagePriority remains (propPriority || false)
    }
    // --- End Determine Image Properties ---

    // Ensure layout is 'fill' only if intended and parent is styled accordingly
    if (imageLayout === 'fill' && (!propWidth || !propHeight)) {
        // If layout is 'fill' but no dimensions were passed to make it fill something,
        // this is problematic. next/image will try to fill its parent.
        // The parent of <Image layout="fill"> MUST have position: relative (or absolute/fixed)
        // and often a defined width/height or aspect-ratio.
        console.warn(`ImageBlock: Layout is "fill" for ${url}, but no explicit width/height props were passed. Ensure the parent container is styled for "fill" layout.`);
    }


    return (
        <div
            id={elementId} // Apply elementId to the wrapper if it's for the whole block
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-image-block',
                className, // className from props applies to this wrapper
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                // Add a class if layout is 'fill' to help style the parent if needed
                imageLayout === 'fill' ? 'next-image-fill-container' : ''
            )}
            style={imageLayout === 'fill' ? { position: 'relative', display: 'block', ... (styles?.self?.width ? {width: styles.self.width} : {}), ... (styles?.self?.height ? {height: styles.self.height} : {}) } : {}} // Ensure parent has position relative for fill
            {...annotations} // Stackbit annotations on the wrapper
        >
            <Image
                className={classNames(
                    imageClassName, // imageClassName from props applies directly to the Image component
                    styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
                    styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
                        ? mapStyles({
                              borderWidth: styles?.self?.borderWidth,
                              borderStyle: styles?.self?.borderStyle,
                              borderColor: styles?.self?.borderColor ?? 'border-primary'
                          })
                        : undefined,
                    styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
                )}
                src={url}
                alt={altText}
                width={imageLayout === 'fill' ? undefined : imageWidth}  // width/height not used with layout="fill"
                height={imageLayout === 'fill' ? undefined : imageHeight} // width/height not used with layout="fill"
                layout={imageLayout}
                priority={imagePriority}
                // For layout="fill", you might want to add objectFit="cover" or "contain"
                // objectFit={imageLayout === 'fill' ? "cover" : undefined}
            />
        </div>
    );
}
