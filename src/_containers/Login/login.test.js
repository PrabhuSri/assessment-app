import React from 'react';
import { shallow, mount } from 'enzyme';
import { Login } from './';

describe("Login Component", () => {
    test("renders", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.exists()).toBe(true);
    })
    test("enter username", () => {
        const wrapper = shallow(<Login />);
        wrapper.find("input").simulate("change", { target: { value: "admin" } })
        expect(wrapper.find("input").props().value).toEqual("admin");
    });
    test("enter password", () => {
        const wrapper = shallow(<Login />);
        wrapper.find("input").simulate("change", { target: { value: "admin" } })
        expect(wrapper.find("input").props().value).toEqual("admin");
    })
})