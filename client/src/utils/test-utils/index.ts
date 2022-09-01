// test-utils.js
import { render, queries, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react';
import * as customQueries from './custom-queries'
import * as functions from './functionalities';

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { queries: { ...queries, ...customQueries }, ...options })


// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, functions }