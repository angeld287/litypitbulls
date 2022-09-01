import { screen, fireEvent, waitFor, Matcher, queries } from '@testing-library/react';

const writeInInputFoundByPlaceHolder = (body: any, placeHolder: Matcher, text: string) => {
    const input: ReturnType<queries.GetByBoundAttribute<any>> = screen.getAllByPlaceholderText(placeHolder)[0];
    fireEvent.change(input, {
        target: { value: text }
    });
    expect(input.value).toBe(text);
}

const SelectItemInModalFoundByTestId = async (body: string, dataTestId: Matcher, option: Matcher) => {

    // find select by data test id
    let html: HTMLElement = screen.getByTestId(dataTestId);
    let select: Element | null = html.querySelector('[class=ant-select-selection-search-input]');

    // Dropdown the select
    await waitFor(() => {
        if (select)
            fireEvent.mouseDown(select);

    });

    // Select the option
    fireEvent.click(screen.getByText(option));

    // Close the select
    fireEvent.click(screen.getByText(body));
}

const insertFileInInputFileFoundByTestId = async (body: any, dataTestId: Matcher, file: any) => {
    //Get the input file by test id
    let _file: ReturnType<queries.GetByBoundAttribute<any>> = screen.getByTestId(dataTestId);

    //verify if the input file is empty
    expect(_file.files.length).toBe(0);

    //add file to the input file
    await waitFor(() => {
        fireEvent.change(_file, {
            target: { files: [file] },
        })
    });

    //verify if the input file has the new file
    _file = screen.getByTestId(dataTestId);
    expect(_file.files.length).toBe(1);
}

export {
    writeInInputFoundByPlaceHolder,
    SelectItemInModalFoundByTestId,
    insertFileInInputFileFoundByTestId
}