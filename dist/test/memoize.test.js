"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const memoize_1 = require("../src/memoize");
class Foo {
    constructor() {
        // used inline
        this.baz = memoize_1.default({
            getAdditionalArgs: () => [this.y],
            function: (x) => this.bar(x, this.y)
        });
        this.y = 'y';
    }
    // used as a decorator
    bar(x, y, z) {
        return {
            result: JSON.stringify({ x, y, z })
        };
    }
}
__decorate([
    memoize_1.default
], Foo.prototype, "bar", null);
/**
 * Dummy test
 */
describe('memoize', () => {
    it('works as expected', () => {
        let foo = new Foo();
        let foo2 = new Foo();
        let x = { x: 123 };
        let bar = foo.bar(x, 'y');
        let baz = foo.baz(x);
        chai_1.assert(bar === foo.bar(x, 'y'), 'memoized bar');
        chai_1.assert(bar !== foo2.bar(x, 'y'), 'memoized per instance');
        chai_1.assert(bar === baz, 'foo.y === "y" when baz was created');
        chai_1.assert(baz === foo.baz(x), 'memoized baz');
        foo.y = 'yy';
        chai_1.assert(baz !== foo.baz(x), 'additional args for baz changed');
        chai_1.assert(foo.bar(x, 'y', 3) === foo.bar(x, 'y', 3), 'supports variable number of arguments');
    });
});
//# sourceMappingURL=memoize.test.js.map