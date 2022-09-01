import { configureStore } from '@reduxjs/toolkit';
import { setupServer } from 'msw/lib/node';
import React from 'react';
import { Provider } from 'react-redux';
import { userRegisterSlice } from '../../features/userRegister/userRegisterSlice';
import { store } from '../../utils/redux-config';
import { render, RenderResult, functions, fireEvent, screen, waitFor, act } from '../../utils/test-utils';
import Register from './index'
import handlers from './registerHandlers';

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
                    <Register />
                </Provider>
            )
        });

        server.resetHandlers()
    });

    afterAll(() => server.close())

    test('It must render the component correcly', () => {
        expect(component.asFragment()).toMatchSnapshot();
    })

    test('It must display basic register components', () => {
        expect(component.getByText(/Email/i)).toBeInTheDocument();
        expect(component.getByText(/Username/i)).toBeInTheDocument();
        expect(component.getByText(/Phone Number/i)).toBeInTheDocument();
        expect(component.getAllByText(/Password/i)[0]).toBeInTheDocument();
        expect(component.getByText(/Password Confirmation/i)).toBeInTheDocument();
        expect(component.getByText(/Fullname/i)).toBeInTheDocument();
        expect(component.getByText(/Select your Gender/i)).toBeInTheDocument();

        expect(component.getByText(/Sign Up/i)).toBeInTheDocument();
    });

    test('It must respond "E-mail cannot be blank." when email is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("E-mail cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Username cannot be blank." when Username is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Username cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Phone Number cannot be blank." when PhoneNumber is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Phone Number cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Password cannot be blank." when PhoneNumber is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Password cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Confirmation Password cannot be blank." when PhoneNumber is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Confirmation Password cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "fullName cannot be blank." when PhoneNumber is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");

        await waitFor(() => {
            functions.SelectItemInModalFoundByTestId("Gender", "select_id_gender", "Male");
        });

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("fullName cannot be blank.")).toBeInTheDocument();
        });
    });

    test('It should respond "Gender cannot be blank." when PhoneNumber is blank.', async () => {

        functions.writeInInputFoundByPlaceHolder(null, /Type your Username/i, "noexistingadmin");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Email/i, "noexistingadmin@test.com");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Phone Number/i, "8292619117");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Password Confirmation/i, "admin2807");
        functions.writeInInputFoundByPlaceHolder(null, /Type your Fullname/i, "Test User Name");

        await act(() => {
            fireEvent.click(screen.getByText(/Sign Up/i));
        });

        await waitFor(() => {
            expect(screen.getByText("Gender cannot be blank.")).toBeInTheDocument();
        });
    });
});