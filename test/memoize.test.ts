import {assert} from 'chai';
import memoize from "../src/memoize";

type XObject = {origin: Foo, x: number};
type ResultObject = {result: string};

class Foo
{
	@memoize
	makeXObject(value:number):XObject
	{
		return {
			origin: this,
			x: value
		};
	}

	// used as a decorator
	@memoize
	bar(x: XObject, y: string, z?:number):ResultObject
	{
		return {
			result: JSON.stringify({x, y, z})
		};
	}

	// used inline
	baz = memoize({
		getAdditionalArgs: () => [this.y],
		function: (x:XObject):ResultObject => this.bar(x, this.y)
	});

	y = 'y';
}

/**
 * Dummy test
 */
describe('memoize', () => {
  it('works as expected', () => {
    let foo = new Foo();
    let foo2 = new Foo();
    let x = foo.makeXObject(123);
    let bar = foo.bar(x, 'y');
    let bar2 = foo2.bar(x, 'y');
    let baz = foo.baz(x);

    assert(x === foo.makeXObject(123), 'memoized makeXObject');
    assert(bar === foo.bar(x, 'y'), 'memoized bar');
    assert(bar !== bar2, 'memoized per instance');
    assert(bar === baz, "foo.y === 'y' when baz was created");
    assert(baz === foo.baz(x), 'memoized baz');
    foo.y = 'yy';
    assert(baz !== foo.baz(x), 'additional args for baz changed');
    assert(foo.bar(x, 'y', 3) === foo.bar(x, 'y', 3), 'supports variable number of arguments');
  })
})
