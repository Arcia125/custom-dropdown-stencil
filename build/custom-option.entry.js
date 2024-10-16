import { r as registerInstance, a as createEvent, h, e as Host, g as getElement } from './index-24727495.js';

const customOptionCss = ":host{display:none}:host(.visible){display:block}li{padding:.5rem 1rem;background-color:var(--custom-dropdown-background-color, #F5F5F7);cursor:pointer;transition:all 150ms ease-in;position:relative;font-family:Helvetica, sans-serif;color:var(--custom-dropdown-font-color, #767676)}li:hover{background-color:var(--custom-option-background-color-hover, #E5E5EA)}li:focus{background-color:var(--custom-option-background-color-focus, #D1D1D6)}";

const CustomOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selectOption = createEvent(this, "selectOption", 7);
        this.value = undefined;
    }
    render() {
        return (h(Host, { key: '066fb002820003ddfe5b146e732a3b1a48a8bd7a' }, h("li", { key: '6018a88bbe8598e0d3d9771403e77b64a8e26e8f', role: "option", tabIndex: 0 }, h("slot", { key: '8133005ee6f8aa80a683202efbba680c0c5d3386' }))));
    }
    get el() { return getElement(this); }
};
CustomOption.style = customOptionCss;

export { CustomOption as custom_option };

//# sourceMappingURL=custom-option.entry.js.map