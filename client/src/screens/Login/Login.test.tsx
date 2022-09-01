import React from 'react';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node'
import handlers from './loginHandlers';

import Login from './index';
import { store } from '../../utils/redux-config';

let component: RenderResult;

const server = setupServer(...handlers)

describe("Login Test Suite", () => {
    beforeAll(() => server.listen({
        onUnhandledRequest: ({ headers, method, url }) => {
            if (headers.get("User-Agent") !== "supertest") {
                throw new Error(`Unhandled ${method} request to ${url}`);
            }
        },
    }));

    beforeEach(() => {
        if (component)
            component.unmount()

        act(() => {
            component = render(
                <Provider store={store}>
                    <Login />
                </Provider>
            )
        });
        server.resetHandlers()
    });

    afterAll(() => server.close())

    test('It must render the component correcly', () => {
        expect(component.asFragment()).toMatchSnapshot();
    })

    test('It must display basic login components', () => {
        expect(component.getByText(/Username/i)).toBeInTheDocument();
        expect(component.getByText(/Password/i)).toBeInTheDocument();
        expect(component.getByText(/Login/i)).toBeInTheDocument();
    });


    test('It must respond "E-mail cannot be blank." when email is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin2807");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            component.rerender(
                <Provider store={store}>
                    <Login />
                </Provider>
            )
            expect(screen.getByText("E-mail cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It must respond "E-mail is not valid" when email is invalid.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin2807");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            component.rerender(
                <Provider store={store}>
                    <Login />
                </Provider>
            )
            expect(screen.getByText("E-mail is not valid.")).toBeInTheDocument();
        });
    });

    test('It must respond "Password cannot be blank" when password is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Password cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It must respond "Password length must be atleast 8 characters." when password is invalid', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "admin");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Password length must be atleast 8 characters.")).toBeInTheDocument();
        });
    });

    test('It must respond "Invalid Username or Password." when password is invalid', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Username/i, "existingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Password/i, "badPass");

        await act(() => {
            fireEvent.click(screen.getByText(/Login/i));
        });

        await waitFor(() => {
            //verify if validation message is shown
            expect(screen.getByText("Invalid Username or Password.")).toBeInTheDocument();
        });
    });
});