import React from 'react'
import { render } from "@testing-library/react"
import HomeView from '../sections/home/HomeView'
import '@testing-library/jest-dom'


test("Renders simple home component", () => {
    const { getByText } = render(<HomeView />);
    expect(getByText("Witaj w naszym kantorze internetowym!")).toBeInTheDocument();
});
