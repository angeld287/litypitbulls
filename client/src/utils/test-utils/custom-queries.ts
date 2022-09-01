import { queryHelpers, buildQueries, Matcher, MatcherOptions } from '@testing-library/react'

// The queryAllByAttribute is a shortcut for attribute-based matchers
// You can also use document.querySelector or a combination of existing
// testing library utilities to find matching nodes for your query
const queryAllByDataCy = (container: HTMLElement, id: Matcher, options?: MatcherOptions | undefined) =>
    queryHelpers.queryAllByAttribute('data-cy', container, id, options)

const queryAllByAriaOwns = (container: HTMLElement, id: Matcher, options?: MatcherOptions | undefined) =>
    queryHelpers.queryAllByAttribute('aria-owns', container, id, options)

const queryAllByClass = (container: HTMLElement, id: Matcher, options?: MatcherOptions | undefined) =>
    queryHelpers.queryAllByAttribute('class', container, id, options)

const queryAllByType = (container: HTMLElement, id: Matcher, options?: MatcherOptions | undefined) =>
    queryHelpers.queryAllByAttribute('type', container, id, options)

const getMultipleError = (c: any, value: string) =>
    `Found multiple elements with the attribute: ${value}`
const getMissingError = (c: any, value: string) =>
    `Unable to find an element with the attribute: ${value}`

const [
    queryByDataCy,
    getAllByDataCy,
    getByDataCy,
    findAllByDataCy,
    findByDataCy,
] = buildQueries(queryAllByDataCy, getMultipleError, getMissingError)

const [
    queryByClass,
    getAllByClass,
    getByClass,
    findAllByClass,
    findByClass,
] = buildQueries(queryAllByClass, getMultipleError, getMissingError)

const [
    queryByAriaOwns,
    getAllByAriaOwns,
    getByAriaOwns,
    findAllByAriaOwns,
    findByAriaOwns,
] = buildQueries(queryAllByAriaOwns, getMultipleError, getMissingError)

const [
    queryByType,
    getAllByType,
    getByType,
    findAllByType,
    findByType,
] = buildQueries(queryAllByType, getMultipleError, getMissingError)

export {
    queryByDataCy,
    queryAllByDataCy,
    getByDataCy,
    getAllByDataCy,
    findAllByDataCy,
    findByDataCy,
    getAllByAriaOwns,
    queryByAriaOwns,
    getByAriaOwns,
    findAllByAriaOwns,
    findByAriaOwns,
    queryAllByAriaOwns,
    queryByClass,
    getAllByClass,
    getByClass,
    findAllByClass,
    findByClass,
    queryAllByClass,
    queryByType,
    getAllByType,
    getByType,
    findAllByType,
    findByType,
}