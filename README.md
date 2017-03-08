# Usage

TypeScript example:
```
type XObject = {x: number};
type ResultObject = {result: string};

class Foo
{
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
```

Test:
```
function assert(shouldBeTrue:boolean, msg:string)
{
	if (!shouldBeTrue)
		throw new Error('fail: ' + msg);
}

let foo = new Foo();
let foo2 = new Foo();
let x = {x: 123};
let bar = foo.bar(x, 'y');
let baz = foo.baz(x);

assert(bar === foo.bar(x, 'y'), 'memoized bar');
assert(bar !== foo2.bar(x, 'y'), 'memoized per instance');
assert(bar === baz, "foo.y === 'y' when baz was created");
assert(baz === foo.baz(x), 'memoized baz');
foo.y = 'yy';
assert(baz !== foo.baz(x), 'additional args for baz changed');
assert(foo.bar(x, 'y', 3) === foo.bar(x, 'y', 3), 'supports variable number of arguments');
```
