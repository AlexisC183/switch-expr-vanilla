class SwitchBody {
    #cases = [];
    #obj;

    constructor(obj, condition, result) {
        this.#obj = obj;
        this.#cases.push([ condition, typeof result === "function" ? result : o => result ]);
    }

    /**
     * Adds a predicate and its associated truthy result to this switch body.
     * @param { Function } condition A predicate that tests the closed object from the switch head
     * @param { (Function|*) } result A result returned when its associated predicate is true, can be lazy and optionally have a parameter containing the closed object from the switch head like so: `obj => obj`
     * @returns Self
     */
    Case(condition, result) {
        this.#cases.push([ condition, typeof result === "function" ? result : o => result ]);
        return this;
    }

    /**
     * Evaluates the switch expression owner of this instance and returns the result from the first matching case or the provided default.
     * @param { (Function|*) } default_ A default result returned when no matching cases are found, can be lazy and optionally have a parameter containing the closed object from the switch head like so: `obj => obj`
     * @returns Matching result or default
     */
    Default(default_ = null) {
        const lazyDefault = typeof default_ === "function" ? default_ : o => default_;
        const matchingCase = this.#cases.find(c => c[0](this.#obj));

        return matchingCase === undefined ? lazyDefault(this.#obj) : matchingCase[1](this.#obj);
    }
}

class SwitchHead {
    #obj;

    constructor(obj) {
        this.#obj = obj;
    }

    /**
     * Adds a predicate and its associated truthy result to the switch body.
     * @param { Function } condition A predicate that tests the closed object from this switch head
     * @param { (Function|*) } result A result returned when its associated predicate is true, can be lazy and optionally have a parameter containing the closed object from this switch head like so: `obj => obj`
     * @returns Switch body
     */
    Case(condition, result) {
        return new SwitchBody(this.#obj, condition, result);
    }
}

/**
 * Creates a switch head with the provided object to close.
 * @param obj The object used to test if it has certain characteristics
 * @returns Switch head
*/
function Switch(obj) {
    return new SwitchHead(obj);
}

/**
 * Returns a predicate that tests for strict equality against the provided object.
 * @param other One of the operands of `===`
 * @returns Predicate
 */
function equalTo(other) {
    return one => one === other;
}

/**
 * Returns a predicate that tests whether a certain object is included among the provided items.
 * @param items Objects to be compared against a single other object
 * @returns Predicate
 */
function includedIn(...items) {
    return obj => items.includes(obj);
}

export { equalTo, includedIn };
export default Switch;