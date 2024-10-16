import { r as registerInstance, a as createEvent, h, e as Host, g as getElement } from './index-24727495.js';

const debounce = (fn, delay) => {
    let timeoutId = null;
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delay);
    };
};

const customDropdownCss = ":host{font-family:Helvetica, sans-serif;display:block;max-width:24rem;color:var(--custom-dropdown-font-color, #767676);font-weight:var(--custom-dropdown-font-weight, 700)}form{position:relative}label{display:block;margin-bottom:.5rem}.search{padding:.5rem 1rem;width:100%;box-sizing:border-box;font-size:1rem;background-color:var(--custom-dropdown-background-color, #F5F5F7);color:var(--custom-dropdown-font-color, #767676);font-weight:var(--custom-dropdown-font-weight, 700);border:none}.search-wrapper{position:relative;background:none;border:none;width:100%;background-color:var(--custom-dropdown-background-color, #F5F5F7)}.search-wrapper::before{content:'▼';position:absolute;right:.8rem;top:50%;transform:translateY(-50%)}.options{position:absolute;left:0;right:0;padding:0;margin:0;overflow-y:auto;list-style-type:none;transform:scale(1, 0);transform-origin:top left;transition:all 150ms ease-in;pointer-events:none;z-index:2}.options.active{opacity:1;transform:scale(1, 1);pointer-events:auto}";

const CustomDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.changeDropdown = createEvent(this, "changeDropdown", 7);
        /**
         * Time in milliseconds to debounce the handleChangeFilterDebounced
         */
        this.filterDebounceMs = 200;
        this.updateOption = () => {
            const options = this.getVisibleOptions();
            const optEl = options.find(o => document.activeElement === o);
            this.selectedOption = optEl ? { value: optEl.value, label: optEl.innerHTML } : this.selectedOption;
            this.changeDropdown.emit(this.selectedOption ? this.selectedOption.value : '');
        };
        this.getAllOptions = () => Array.from(this.el.querySelectorAll('custom-option'));
        this.getVisibleOptions = () => Array.from(this.el.querySelectorAll('custom-option.visible'));
        this.setOptionFocus = (option) => {
            const optEl = 'label' in option ? this.getVisibleOptions().find(o => o.value === option.value) : option;
            const li = optEl === null || optEl === void 0 ? void 0 : optEl.shadowRoot.querySelector('li');
            li === null || li === void 0 ? void 0 : li.focus();
        };
        this.focusSelectedOption = () => {
            if (this.selectedOption) {
                this.setOptionFocus(this.selectedOption);
            }
            else {
                this.focusNextOption();
            }
        };
        this.focusNextOption = () => {
            if (!this.active) {
                this.changeActiveState(true);
            }
            const options = this.getVisibleOptions();
            const index = options.findIndex(o => document.activeElement === o);
            const option = index === options.length - 1 ? options[0] : options[index + 1];
            this.setOptionFocus(option);
        };
        this.focusPrevOption = () => {
            if (!this.active) {
                this.changeActiveState(true);
            }
            const options = this.getVisibleOptions();
            const index = options.findIndex(o => document.activeElement === o);
            const option = index === 0 || index === -1 ? options[options.length - 1] : options[index - 1];
            this.setOptionFocus(option);
        };
        this.changeActiveState = (active) => {
            if (!this.active) {
                this.el.shadowRoot.querySelector('input').focus();
            }
            if (!active) {
                this.el.focus();
            }
            this.active = active;
        };
        this.toggleDropdown = () => {
            const active = !this.active;
            this.changeActiveState(active);
        };
        this.updateFilter = (value) => {
            this.filter = value;
            this.handleChangeFilterDebounced(this.filter);
        };
        this.optionIsVisible = (filter, option) => filter === '' || option.innerHTML.toLowerCase().includes(filter);
        this.updateOptionVisibility = (filter) => {
            const options = this.getAllOptions();
            options.forEach(option => {
                if (this.optionIsVisible(filter, option)) {
                    option.classList.add('visible');
                }
                else {
                    option.classList.remove('visible');
                }
            });
        };
        this.handleChangeFilterDebounced = debounce((filter) => {
            this.updateOptionVisibility(filter);
        }, this.filterDebounceMs);
        this.handleInput = (event) => {
            const target = event.target;
            const value = target.value;
            this.updateFilter(value);
        };
        this.label = undefined;
        this.active = false;
        this.selectedOption = null;
        this.filter = '';
    }
    componentDidLoad() {
        this.updateOptionVisibility(this.filter);
    }
    handleFocus() {
        this.toggleDropdown();
    }
    handleClick(event) {
        if (event.target instanceof customElements.get('custom-option')) {
            const option = event.target;
            this.selectedOption = { value: option.value, label: option.innerHTML };
            this.updateOption();
            this.toggleDropdown();
        }
    }
    handleDocumentClick(event) {
        if (!this.active) {
            return;
        }
        if (!this.el.contains(event.target)) {
            this.changeActiveState(false);
        }
    }
    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                event.preventDefault();
                if (this.active) {
                    this.updateOption();
                }
                this.toggleDropdown();
                if (this.selectedOption) {
                    this.focusSelectedOption();
                }
                break;
            case 'Escape':
                if (this.active) {
                    this.changeActiveState(false);
                    this.updateFilter(this.selectedOption ? this.selectedOption.label : this.filter);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                this.focusNextOption();
                break;
            case 'ArrowUp':
                event.preventDefault();
                this.focusPrevOption();
                break;
        }
    }
    render() {
        var _a;
        return (h(Host, { key: '4c6783c9cccc65e31901eb8755729147da7c3771' }, h("form", { key: '37490e652c1e7b834311d3258d26a3bb31a323f2' }, h("label", { key: '104d1989b12298d356922ce070a8916622d65fa7', htmlFor: this.label }, this.label), h("div", { key: '20dffae6f62f8b613151834bdd62f934ee14d500', class: "search-wrapper" }, h("input", { key: '003f3271546f31fca96c92c88fc234f10fbf6187', class: "search", type: "text", placeholder: "Select", id: this.label, role: "combobox", "aria-controls": `listbox-${this.label}`, "aria-haspopup": `listbox-${this.label}`, tabindex: "0", "aria-expanded": this.active.toString(), onInput: this.handleInput, value: ((_a = this.selectedOption) === null || _a === void 0 ? void 0 : _a.label) || this.filter })), h("ul", { key: '814796ab6f3799bfa90c00d5fda4c044dcbbddb8', class: `options${this.active ? ' active' : ''}`, role: "listbox", id: `listbox-${this.label}` }, h("slot", { key: 'eab7c3e139fe56b3d56298da06a5d7b585e17e6a' })))));
    }
    get el() { return getElement(this); }
};
CustomDropdown.style = customDropdownCss;

export { CustomDropdown as custom_dropdown };

//# sourceMappingURL=custom-dropdown.entry.js.map