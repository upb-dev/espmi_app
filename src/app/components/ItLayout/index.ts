import React from 'react';

export const ItLayouts : Record<string, React.ComponentType<any>>= { layout1: React.lazy(() => import('./Layout1/Layout1')) };
