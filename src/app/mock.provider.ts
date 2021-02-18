import {Component, Directive} from '@angular/core';

// Similar to ng2-mock-component
export function MockDirective(options: Component): Directive {
    const directive: Directive = {
        inputs: options.inputs,
        outputs: options.outputs,
        selector: options.selector,
    };

    return <any>Directive(directive)(class MockDirectiveClass { });
}

export function MockProvider(service: any, methods?: Array<string>, consts?: any) {
    const functions = <any>{};

    if (methods) {
        methods.forEach((method) => {
            functions[method] = (arg: any) => {
                return arg;
            };
        });
    }

    // setup constants for the class.
    if (consts) {
        consts.forEach((cons: any) => {
            for (const key of Object.keys(cons)) {
                functions[key] = cons[key];
            }
        });
    }

    return {
        provide: service,
        useValue: functions
    };
}

