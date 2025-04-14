// src/enums.ts
var SamsServers;
((SamsServers2) => {
	SamsServers2["VOLLEYBALL_BUNDESLIGA"] = "https://www.volleyball-bundesliga.de";
	SamsServers2["DVV_LEAGUES"] = "https://www.dvv-ligen.de";
	SamsServers2["REGIONALLIGA_SUED"] = "https://www.volleyball-baden.de";
	SamsServers2["REGIONALLIGA_NORD"] = "https://www.shvv.de";
	SamsServers2["REGIONALLIGA_NORDWEST"] = "https://www.nwvv.de";
	SamsServers2["SCHLESWIG_HOLSTEIN"] = "https://www.shvv.de";
	SamsServers2["RHEINLAND_PFALZ"] = "https://www.vvrp.de";
	SamsServers2["BADEN"] = "https://www.volleyball-baden.de";
	SamsServers2["SACHSEN"] = "https://www.ssvb.org/";
	SamsServers2["NIEDERSACHSEN_BREMEN"] = "https://www.nwvv.de";
	SamsServers2["THUERINGEN"] = "https://www.tv-v.de";
	SamsServers2["WUERTTEMBERG"] = "https://vlw-online.de";
	SamsServers2["HESSEN"] = "https://hessen-volley.de";
	SamsServers2["SAARLAND"] = "https://svv.sams-server.de";
	SamsServers2["BERLIN"] = "https://vvb.sams-server.de";
	SamsServers2["SACHSEN_ANHALT"] = "https://vvsa.sams-server.de";
	SamsServers2["NORDRHEIN_WESTFALEN"] = "https://wvv.sams-server.de";
	SamsServers2["LUXEMBOURG"] = "https://flvb.sams-server.de";
})((SamsServers ||= {}));
// node_modules/zod/lib/index.mjs
var util;
(function (util2) {
	util2.assertEqual = (val) => val;
	function assertIs(_arg) {}
	util2.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	util2.assertNever = assertNever;
	util2.arrayToEnum = (items) => {
		const obj = {};
		for (const item of items) {
			obj[item] = item;
		}
		return obj;
	};
	util2.getValidEnumValues = (obj) => {
		const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
		const filtered = {};
		for (const k of validKeys) {
			filtered[k] = obj[k];
		}
		return util2.objectValues(filtered);
	};
	util2.objectValues = (obj) => {
		return util2.objectKeys(obj).map(function (e) {
			return obj[e];
		});
	};
	util2.objectKeys =
		typeof Object.keys === "function"
			? (obj) => Object.keys(obj)
			: (object) => {
					const keys = [];
					for (const key in object) {
						if (Object.prototype.hasOwnProperty.call(object, key)) {
							keys.push(key);
						}
					}
					return keys;
			  };
	util2.find = (arr, checker) => {
		for (const item of arr) {
			if (checker(item)) return item;
		}
		return;
	};
	util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
	function joinValues(array, separator = " | ") {
		return array.map((val) => (typeof val === "string" ? `'${val}'` : val)).join(separator);
	}
	util2.joinValues = joinValues;
	util2.jsonStringifyReplacer = (_, value) => {
		if (typeof value === "bigint") {
			return value.toString();
		}
		return value;
	};
})(util || (util = {}));
var objectUtil;
(function (objectUtil2) {
	objectUtil2.mergeShapes = (first, second) => {
		return {
			...first,
			...second,
		};
	};
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]);
var getParsedType = (data) => {
	const t = typeof data;
	switch (t) {
		case "undefined":
			return ZodParsedType.undefined;
		case "string":
			return ZodParsedType.string;
		case "number":
			return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
		case "boolean":
			return ZodParsedType.boolean;
		case "function":
			return ZodParsedType.function;
		case "bigint":
			return ZodParsedType.bigint;
		case "symbol":
			return ZodParsedType.symbol;
		case "object":
			if (Array.isArray(data)) {
				return ZodParsedType.array;
			}
			if (data === null) {
				return ZodParsedType.null;
			}
			if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
				return ZodParsedType.promise;
			}
			if (typeof Map !== "undefined" && data instanceof Map) {
				return ZodParsedType.map;
			}
			if (typeof Set !== "undefined" && data instanceof Set) {
				return ZodParsedType.set;
			}
			if (typeof Date !== "undefined" && data instanceof Date) {
				return ZodParsedType.date;
			}
			return ZodParsedType.object;
		default:
			return ZodParsedType.unknown;
	}
};
var ZodIssueCode = util.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]);
var quotelessJson = (obj) => {
	const json = JSON.stringify(obj, null, 2);
	return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
	get errors() {
		return this.issues;
	}
	constructor(issues) {
		super();
		this.issues = [];
		this.addIssue = (sub) => {
			this.issues = [...this.issues, sub];
		};
		this.addIssues = (subs = []) => {
			this.issues = [...this.issues, ...subs];
		};
		const actualProto = new.target.prototype;
		if (Object.setPrototypeOf) {
			Object.setPrototypeOf(this, actualProto);
		} else {
			this.__proto__ = actualProto;
		}
		this.name = "ZodError";
		this.issues = issues;
	}
	format(_mapper) {
		const mapper =
			_mapper ||
			function (issue) {
				return issue.message;
			};
		const fieldErrors = { _errors: [] };
		const processError = (error) => {
			for (const issue of error.issues) {
				if (issue.code === "invalid_union") {
					issue.unionErrors.map(processError);
				} else if (issue.code === "invalid_return_type") {
					processError(issue.returnTypeError);
				} else if (issue.code === "invalid_arguments") {
					processError(issue.argumentsError);
				} else if (issue.path.length === 0) {
					fieldErrors._errors.push(mapper(issue));
				} else {
					let curr = fieldErrors;
					let i = 0;
					while (i < issue.path.length) {
						const el = issue.path[i];
						const terminal = i === issue.path.length - 1;
						if (!terminal) {
							curr[el] = curr[el] || { _errors: [] };
						} else {
							curr[el] = curr[el] || { _errors: [] };
							curr[el]._errors.push(mapper(issue));
						}
						curr = curr[el];
						i++;
					}
				}
			}
		};
		processError(this);
		return fieldErrors;
	}
	static assert(value) {
		if (!(value instanceof ZodError)) {
			throw new Error(`Not a ZodError: ${value}`);
		}
	}
	toString() {
		return this.message;
	}
	get message() {
		return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
	}
	get isEmpty() {
		return this.issues.length === 0;
	}
	flatten(mapper = (issue) => issue.message) {
		const fieldErrors = {};
		const formErrors = [];
		for (const sub of this.issues) {
			if (sub.path.length > 0) {
				fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
				fieldErrors[sub.path[0]].push(mapper(sub));
			} else {
				formErrors.push(mapper(sub));
			}
		}
		return { formErrors, fieldErrors };
	}
	get formErrors() {
		return this.flatten();
	}
}
ZodError.create = (issues) => {
	const error = new ZodError(issues);
	return error;
};
var errorMap = (issue, _ctx) => {
	let message;
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			if (issue.received === ZodParsedType.undefined) {
				message = "Required";
			} else {
				message = `Expected ${issue.expected}, received ${issue.received}`;
			}
			break;
		case ZodIssueCode.invalid_literal:
			message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
			break;
		case ZodIssueCode.unrecognized_keys:
			message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
			break;
		case ZodIssueCode.invalid_union:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_union_discriminator:
			message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
			break;
		case ZodIssueCode.invalid_enum_value:
			message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
			break;
		case ZodIssueCode.invalid_arguments:
			message = `Invalid function arguments`;
			break;
		case ZodIssueCode.invalid_return_type:
			message = `Invalid function return type`;
			break;
		case ZodIssueCode.invalid_date:
			message = `Invalid date`;
			break;
		case ZodIssueCode.invalid_string:
			if (typeof issue.validation === "object") {
				if ("includes" in issue.validation) {
					message = `Invalid input: must include "${issue.validation.includes}"`;
					if (typeof issue.validation.position === "number") {
						message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
					}
				} else if ("startsWith" in issue.validation) {
					message = `Invalid input: must start with "${issue.validation.startsWith}"`;
				} else if ("endsWith" in issue.validation) {
					message = `Invalid input: must end with "${issue.validation.endsWith}"`;
				} else {
					util.assertNever(issue.validation);
				}
			} else if (issue.validation !== "regex") {
				message = `Invalid ${issue.validation}`;
			} else {
				message = "Invalid";
			}
			break;
		case ZodIssueCode.too_small:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.too_big:
			if (issue.type === "array") message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
			else if (issue.type === "string") message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
			else if (issue.type === "number") message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "bigint") message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
			else if (issue.type === "date") message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
			else message = "Invalid input";
			break;
		case ZodIssueCode.custom:
			message = `Invalid input`;
			break;
		case ZodIssueCode.invalid_intersection_types:
			message = `Intersection results could not be merged`;
			break;
		case ZodIssueCode.not_multiple_of:
			message = `Number must be a multiple of ${issue.multipleOf}`;
			break;
		case ZodIssueCode.not_finite:
			message = "Number must be finite";
			break;
		default:
			message = _ctx.defaultError;
			util.assertNever(issue);
	}
	return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
	overrideErrorMap = map;
}
function getErrorMap() {
	return overrideErrorMap;
}
var makeIssue = (params) => {
	const { data, path, errorMaps, issueData } = params;
	const fullPath = [...path, ...(issueData.path || [])];
	const fullIssue = {
		...issueData,
		path: fullPath,
	};
	if (issueData.message !== undefined) {
		return {
			...issueData,
			path: fullPath,
			message: issueData.message,
		};
	}
	let errorMessage = "";
	const maps = errorMaps
		.filter((m) => !!m)
		.slice()
		.reverse();
	for (const map of maps) {
		errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
	}
	return {
		...issueData,
		path: fullPath,
		message: errorMessage,
	};
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
	const overrideMap = getErrorMap();
	const issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, overrideMap, overrideMap === errorMap ? undefined : errorMap].filter((x) => !!x),
	});
	ctx.common.issues.push(issue);
}

class ParseStatus {
	constructor() {
		this.value = "valid";
	}
	dirty() {
		if (this.value === "valid") this.value = "dirty";
	}
	abort() {
		if (this.value !== "aborted") this.value = "aborted";
	}
	static mergeArray(status, results) {
		const arrayValue = [];
		for (const s of results) {
			if (s.status === "aborted") return INVALID;
			if (s.status === "dirty") status.dirty();
			arrayValue.push(s.value);
		}
		return { status: status.value, value: arrayValue };
	}
	static async mergeObjectAsync(status, pairs) {
		const syncPairs = [];
		for (const pair of pairs) {
			const key = await pair.key;
			const value = await pair.value;
			syncPairs.push({
				key,
				value,
			});
		}
		return ParseStatus.mergeObjectSync(status, syncPairs);
	}
	static mergeObjectSync(status, pairs) {
		const finalObject = {};
		for (const pair of pairs) {
			const { key, value } = pair;
			if (key.status === "aborted") return INVALID;
			if (value.status === "aborted") return INVALID;
			if (key.status === "dirty") status.dirty();
			if (value.status === "dirty") status.dirty();
			if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
				finalObject[key.value] = value.value;
			}
		}
		return { status: status.value, value: finalObject };
	}
}
var INVALID = Object.freeze({
	status: "aborted",
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
	return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
	if (kind === "m") throw new TypeError("Private method is not writable");
	if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
	if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
	return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
}
var errorUtil;
(function (errorUtil2) {
	errorUtil2.errToObj = (message) => (typeof message === "string" ? { message } : message || {});
	errorUtil2.toString = (message) => (typeof message === "string" ? message : message === null || message === undefined ? undefined : message.message);
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;

class ParseInputLazyPath {
	constructor(parent, value, path, key) {
		this._cachedPath = [];
		this.parent = parent;
		this.data = value;
		this._path = path;
		this._key = key;
	}
	get path() {
		if (!this._cachedPath.length) {
			if (this._key instanceof Array) {
				this._cachedPath.push(...this._path, ...this._key);
			} else {
				this._cachedPath.push(...this._path, this._key);
			}
		}
		return this._cachedPath;
	}
}
var handleResult = (ctx, result) => {
	if (isValid(result)) {
		return { success: true, data: result.value };
	} else {
		if (!ctx.common.issues.length) {
			throw new Error("Validation failed but no issues detected.");
		}
		return {
			success: false,
			get error() {
				if (this._error) return this._error;
				const error = new ZodError(ctx.common.issues);
				this._error = error;
				return this._error;
			},
		};
	}
};
function processCreateParams(params) {
	if (!params) return {};
	const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
	if (errorMap2 && (invalid_type_error || required_error)) {
		throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
	}
	if (errorMap2) return { errorMap: errorMap2, description };
	const customMap = (iss, ctx) => {
		var _a, _b;
		const { message } = params;
		if (iss.code === "invalid_enum_value") {
			return { message: message !== null && message !== undefined ? message : ctx.defaultError };
		}
		if (typeof ctx.data === "undefined") {
			return { message: (_a = message !== null && message !== undefined ? message : required_error) !== null && _a !== undefined ? _a : ctx.defaultError };
		}
		if (iss.code !== "invalid_type") return { message: ctx.defaultError };
		return { message: (_b = message !== null && message !== undefined ? message : invalid_type_error) !== null && _b !== undefined ? _b : ctx.defaultError };
	};
	return { errorMap: customMap, description };
}

class ZodType {
	get description() {
		return this._def.description;
	}
	_getType(input) {
		return getParsedType(input.data);
	}
	_getOrReturnCtx(input, ctx) {
		return (
			ctx || {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent,
			}
		);
	}
	_processInputParams(input) {
		return {
			status: new ParseStatus(),
			ctx: {
				common: input.parent.common,
				data: input.data,
				parsedType: getParsedType(input.data),
				schemaErrorMap: this._def.errorMap,
				path: input.path,
				parent: input.parent,
			},
		};
	}
	_parseSync(input) {
		const result = this._parse(input);
		if (isAsync(result)) {
			throw new Error("Synchronous parse encountered promise.");
		}
		return result;
	}
	_parseAsync(input) {
		const result = this._parse(input);
		return Promise.resolve(result);
	}
	parse(data, params) {
		const result = this.safeParse(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	safeParse(data, params) {
		var _a;
		const ctx = {
			common: {
				issues: [],
				async: (_a = params === null || params === undefined ? undefined : params.async) !== null && _a !== undefined ? _a : false,
				contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap,
			},
			path: (params === null || params === undefined ? undefined : params.path) || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		const result = this._parseSync({ data, path: ctx.path, parent: ctx });
		return handleResult(ctx, result);
	}
	"~validate"(data) {
		var _a, _b;
		const ctx = {
			common: {
				issues: [],
				async: !!this["~standard"].async,
			},
			path: [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		if (!this["~standard"].async) {
			try {
				const result = this._parseSync({ data, path: [], parent: ctx });
				return isValid(result)
					? {
							value: result.value,
					  }
					: {
							issues: ctx.common.issues,
					  };
			} catch (err) {
				if ((_b = (_a = err === null || err === undefined ? undefined : err.message) === null || _a === undefined ? undefined : _a.toLowerCase()) === null || _b === undefined ? undefined : _b.includes("encountered")) {
					this["~standard"].async = true;
				}
				ctx.common = {
					issues: [],
					async: true,
				};
			}
		}
		return this._parseAsync({ data, path: [], parent: ctx }).then((result) =>
			isValid(result)
				? {
						value: result.value,
				  }
				: {
						issues: ctx.common.issues,
				  }
		);
	}
	async parseAsync(data, params) {
		const result = await this.safeParseAsync(data, params);
		if (result.success) return result.data;
		throw result.error;
	}
	async safeParseAsync(data, params) {
		const ctx = {
			common: {
				issues: [],
				contextualErrorMap: params === null || params === undefined ? undefined : params.errorMap,
				async: true,
			},
			path: (params === null || params === undefined ? undefined : params.path) || [],
			schemaErrorMap: this._def.errorMap,
			parent: null,
			data,
			parsedType: getParsedType(data),
		};
		const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
		const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
		return handleResult(ctx, result);
	}
	refine(check, message) {
		const getIssueProperties = (val) => {
			if (typeof message === "string" || typeof message === "undefined") {
				return { message };
			} else if (typeof message === "function") {
				return message(val);
			} else {
				return message;
			}
		};
		return this._refinement((val, ctx) => {
			const result = check(val);
			const setError = () =>
				ctx.addIssue({
					code: ZodIssueCode.custom,
					...getIssueProperties(val),
				});
			if (typeof Promise !== "undefined" && result instanceof Promise) {
				return result.then((data) => {
					if (!data) {
						setError();
						return false;
					} else {
						return true;
					}
				});
			}
			if (!result) {
				setError();
				return false;
			} else {
				return true;
			}
		});
	}
	refinement(check, refinementData) {
		return this._refinement((val, ctx) => {
			if (!check(val)) {
				ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
				return false;
			} else {
				return true;
			}
		});
	}
	_refinement(refinement) {
		return new ZodEffects({
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: { type: "refinement", refinement },
		});
	}
	superRefine(refinement) {
		return this._refinement(refinement);
	}
	constructor(def) {
		this.spa = this.safeParseAsync;
		this._def = def;
		this.parse = this.parse.bind(this);
		this.safeParse = this.safeParse.bind(this);
		this.parseAsync = this.parseAsync.bind(this);
		this.safeParseAsync = this.safeParseAsync.bind(this);
		this.spa = this.spa.bind(this);
		this.refine = this.refine.bind(this);
		this.refinement = this.refinement.bind(this);
		this.superRefine = this.superRefine.bind(this);
		this.optional = this.optional.bind(this);
		this.nullable = this.nullable.bind(this);
		this.nullish = this.nullish.bind(this);
		this.array = this.array.bind(this);
		this.promise = this.promise.bind(this);
		this.or = this.or.bind(this);
		this.and = this.and.bind(this);
		this.transform = this.transform.bind(this);
		this.brand = this.brand.bind(this);
		this.default = this.default.bind(this);
		this.catch = this.catch.bind(this);
		this.describe = this.describe.bind(this);
		this.pipe = this.pipe.bind(this);
		this.readonly = this.readonly.bind(this);
		this.isNullable = this.isNullable.bind(this);
		this.isOptional = this.isOptional.bind(this);
		this["~standard"] = {
			version: 1,
			vendor: "zod",
			validate: (data) => this["~validate"](data),
		};
	}
	optional() {
		return ZodOptional.create(this, this._def);
	}
	nullable() {
		return ZodNullable.create(this, this._def);
	}
	nullish() {
		return this.nullable().optional();
	}
	array() {
		return ZodArray.create(this);
	}
	promise() {
		return ZodPromise.create(this, this._def);
	}
	or(option) {
		return ZodUnion.create([this, option], this._def);
	}
	and(incoming) {
		return ZodIntersection.create(this, incoming, this._def);
	}
	transform(transform) {
		return new ZodEffects({
			...processCreateParams(this._def),
			schema: this,
			typeName: ZodFirstPartyTypeKind.ZodEffects,
			effect: { type: "transform", transform },
		});
	}
	default(def) {
		const defaultValueFunc = typeof def === "function" ? def : () => def;
		return new ZodDefault({
			...processCreateParams(this._def),
			innerType: this,
			defaultValue: defaultValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodDefault,
		});
	}
	brand() {
		return new ZodBranded({
			typeName: ZodFirstPartyTypeKind.ZodBranded,
			type: this,
			...processCreateParams(this._def),
		});
	}
	catch(def) {
		const catchValueFunc = typeof def === "function" ? def : () => def;
		return new ZodCatch({
			...processCreateParams(this._def),
			innerType: this,
			catchValue: catchValueFunc,
			typeName: ZodFirstPartyTypeKind.ZodCatch,
		});
	}
	describe(description) {
		const This = this.constructor;
		return new This({
			...this._def,
			description,
		});
	}
	pipe(target) {
		return ZodPipeline.create(this, target);
	}
	readonly() {
		return ZodReadonly.create(this);
	}
	isOptional() {
		return this.safeParse(undefined).success;
	}
	isNullable() {
		return this.safeParse(null).success;
	}
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex =
	/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex =
	/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
	let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
	if (args.precision) {
		regex = `${regex}\\.\\d{${args.precision}}`;
	} else if (args.precision == null) {
		regex = `${regex}(\\.\\d+)?`;
	}
	return regex;
}
function timeRegex(args) {
	return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
	let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
	const opts = [];
	opts.push(args.local ? `Z?` : `Z`);
	if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
	regex = `${regex}(${opts.join("|")})`;
	return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
	if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
		return true;
	}
	if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
		return true;
	}
	return false;
}
function isValidJWT(jwt, alg) {
	if (!jwtRegex.test(jwt)) return false;
	try {
		const [header] = jwt.split(".");
		const base64 = header
			.replace(/-/g, "+")
			.replace(/_/g, "/")
			.padEnd(header.length + ((4 - (header.length % 4)) % 4), "=");
		const decoded = JSON.parse(atob(base64));
		if (typeof decoded !== "object" || decoded === null) return false;
		if (!decoded.typ || !decoded.alg) return false;
		if (alg && decoded.alg !== alg) return false;
		return true;
	} catch (_a) {
		return false;
	}
}
function isValidCidr(ip, version) {
	if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
		return true;
	}
	if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
		return true;
	}
	return false;
}

class ZodString extends ZodType {
	_parse(input) {
		if (this._def.coerce) {
			input.data = String(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.string) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.string,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = undefined;
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				if (input.data.length < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.length > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "string",
						inclusive: true,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "length") {
				const tooBig = input.data.length > check.value;
				const tooSmall = input.data.length < check.value;
				if (tooBig || tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					if (tooBig) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							maximum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message,
						});
					} else if (tooSmall) {
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "string",
							inclusive: true,
							exact: true,
							message: check.message,
						});
					}
					status.dirty();
				}
			} else if (check.kind === "email") {
				if (!emailRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "email",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "emoji") {
				if (!emojiRegex) {
					emojiRegex = new RegExp(_emojiRegex, "u");
				}
				if (!emojiRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "emoji",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "uuid") {
				if (!uuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "uuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "nanoid") {
				if (!nanoidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "nanoid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cuid") {
				if (!cuidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cuid2") {
				if (!cuid2Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cuid2",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "ulid") {
				if (!ulidRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ulid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "url") {
				try {
					new URL(input.data);
				} catch (_a) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "url",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "regex") {
				check.regex.lastIndex = 0;
				const testResult = check.regex.test(input.data);
				if (!testResult) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "regex",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "trim") {
				input.data = input.data.trim();
			} else if (check.kind === "includes") {
				if (!input.data.includes(check.value, check.position)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { includes: check.value, position: check.position },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "toLowerCase") {
				input.data = input.data.toLowerCase();
			} else if (check.kind === "toUpperCase") {
				input.data = input.data.toUpperCase();
			} else if (check.kind === "startsWith") {
				if (!input.data.startsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { startsWith: check.value },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "endsWith") {
				if (!input.data.endsWith(check.value)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: { endsWith: check.value },
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "datetime") {
				const regex = datetimeRegex(check);
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "datetime",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "date") {
				const regex = dateRegex;
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "date",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "time") {
				const regex = timeRegex(check);
				if (!regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_string,
						validation: "time",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "duration") {
				if (!durationRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "duration",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "ip") {
				if (!isValidIP(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "ip",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "jwt") {
				if (!isValidJWT(input.data, check.alg)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "jwt",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "cidr") {
				if (!isValidCidr(input.data, check.version)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "cidr",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "base64") {
				if (!base64Regex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "base64url") {
				if (!base64urlRegex.test(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						validation: "base64url",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	_regex(regex, validation, message) {
		return this.refinement((data) => regex.test(data), {
			validation,
			code: ZodIssueCode.invalid_string,
			...errorUtil.errToObj(message),
		});
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	email(message) {
		return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
	}
	url(message) {
		return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
	}
	emoji(message) {
		return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
	}
	uuid(message) {
		return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
	}
	nanoid(message) {
		return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
	}
	cuid(message) {
		return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
	}
	cuid2(message) {
		return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
	}
	ulid(message) {
		return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
	}
	base64(message) {
		return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
	}
	base64url(message) {
		return this._addCheck({
			kind: "base64url",
			...errorUtil.errToObj(message),
		});
	}
	jwt(options) {
		return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
	}
	ip(options) {
		return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
	}
	cidr(options) {
		return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
	}
	datetime(options) {
		var _a, _b;
		if (typeof options === "string") {
			return this._addCheck({
				kind: "datetime",
				precision: null,
				offset: false,
				local: false,
				message: options,
			});
		}
		return this._addCheck({
			kind: "datetime",
			precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
			offset: (_a = options === null || options === undefined ? undefined : options.offset) !== null && _a !== undefined ? _a : false,
			local: (_b = options === null || options === undefined ? undefined : options.local) !== null && _b !== undefined ? _b : false,
			...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message),
		});
	}
	date(message) {
		return this._addCheck({ kind: "date", message });
	}
	time(options) {
		if (typeof options === "string") {
			return this._addCheck({
				kind: "time",
				precision: null,
				message: options,
			});
		}
		return this._addCheck({
			kind: "time",
			precision: typeof (options === null || options === undefined ? undefined : options.precision) === "undefined" ? null : options === null || options === undefined ? undefined : options.precision,
			...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message),
		});
	}
	duration(message) {
		return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message),
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options === null || options === undefined ? undefined : options.position,
			...errorUtil.errToObj(options === null || options === undefined ? undefined : options.message),
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message),
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message),
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message),
		});
	}
	nonempty(message) {
		return this.min(1, errorUtil.errToObj(message));
	}
	trim() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "trim" }],
		});
	}
	toLowerCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toLowerCase" }],
		});
	}
	toUpperCase() {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, { kind: "toUpperCase" }],
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isDate() {
		return !!this._def.checks.find((ch) => ch.kind === "date");
	}
	get isTime() {
		return !!this._def.checks.find((ch) => ch.kind === "time");
	}
	get isDuration() {
		return !!this._def.checks.find((ch) => ch.kind === "duration");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isNANOID() {
		return !!this._def.checks.find((ch) => ch.kind === "nanoid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get isCIDR() {
		return !!this._def.checks.find((ch) => ch.kind === "cidr");
	}
	get isBase64() {
		return !!this._def.checks.find((ch) => ch.kind === "base64");
	}
	get isBase64url() {
		return !!this._def.checks.find((ch) => ch.kind === "base64url");
	}
	get minLength() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxLength() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
}
ZodString.create = (params) => {
	var _a;
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
		...processCreateParams(params),
	});
};
function floatSafeRemainder(val, step) {
	const valDecCount = (val.toString().split(".")[1] || "").length;
	const stepDecCount = (step.toString().split(".")[1] || "").length;
	const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
	const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
	const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
	return (valInt % stepInt) / Math.pow(10, decCount);
}

class ZodNumber extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
		this.step = this.multipleOf;
	}
	_parse(input) {
		if (this._def.coerce) {
			input.data = Number(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.number) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.number,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		let ctx = undefined;
		const status = new ParseStatus();
		for (const check of this._def.checks) {
			if (check.kind === "int") {
				if (!util.isInteger(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: "integer",
						received: "float",
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "min") {
				const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
				if (tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
				if (tooBig) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "number",
						inclusive: check.inclusive,
						exact: false,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (floatSafeRemainder(input.data, check.value) !== 0) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "finite") {
				if (!Number.isFinite(input.data)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_finite,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	gte(value, message) {
		return this.setLimit("min", value, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message),
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message),
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: true,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message),
		})._addCheck({
			kind: "max",
			inclusive: true,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
	get isInt() {
		return !!this._def.checks.find((ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util.isInteger(ch.value)));
	}
	get isFinite() {
		let max = null,
			min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
				return true;
			} else if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			} else if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
}
ZodNumber.create = (params) => {
	return new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
		...processCreateParams(params),
	});
};

class ZodBigInt extends ZodType {
	constructor() {
		super(...arguments);
		this.min = this.gte;
		this.max = this.lte;
	}
	_parse(input) {
		if (this._def.coerce) {
			try {
				input.data = BigInt(input.data);
			} catch (_a) {
				return this._getInvalidInput(input);
			}
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.bigint) {
			return this._getInvalidInput(input);
		}
		let ctx = undefined;
		const status = new ParseStatus();
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
				if (tooSmall) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						type: "bigint",
						minimum: check.value,
						inclusive: check.inclusive,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
				if (tooBig) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						type: "bigint",
						maximum: check.value,
						inclusive: check.inclusive,
						message: check.message,
					});
					status.dirty();
				}
			} else if (check.kind === "multipleOf") {
				if (input.data % check.value !== BigInt(0)) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.not_multiple_of,
						multipleOf: check.value,
						message: check.message,
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return { status: status.value, value: input.data };
	}
	_getInvalidInput(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.bigint,
			received: ctx.parsedType,
		});
		return INVALID;
	}
	gte(value, message) {
		return this.setLimit("min", value, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, false, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, false, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: false,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: true,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min;
	}
	get maxValue() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max;
	}
}
ZodBigInt.create = (params) => {
	var _a;
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: (_a = params === null || params === undefined ? undefined : params.coerce) !== null && _a !== undefined ? _a : false,
		...processCreateParams(params),
	});
};

class ZodBoolean extends ZodType {
	_parse(input) {
		if (this._def.coerce) {
			input.data = Boolean(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.boolean) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.boolean,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
}
ZodBoolean.create = (params) => {
	return new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
		...processCreateParams(params),
	});
};

class ZodDate extends ZodType {
	_parse(input) {
		if (this._def.coerce) {
			input.data = new Date(input.data);
		}
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.date) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.date,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		if (isNaN(input.data.getTime())) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_date,
			});
			return INVALID;
		}
		const status = new ParseStatus();
		let ctx = undefined;
		for (const check of this._def.checks) {
			if (check.kind === "min") {
				if (input.data.getTime() < check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						message: check.message,
						inclusive: true,
						exact: false,
						minimum: check.value,
						type: "date",
					});
					status.dirty();
				}
			} else if (check.kind === "max") {
				if (input.data.getTime() > check.value) {
					ctx = this._getOrReturnCtx(input, ctx);
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						message: check.message,
						inclusive: true,
						exact: false,
						maximum: check.value,
						type: "date",
					});
					status.dirty();
				}
			} else {
				util.assertNever(check);
			}
		}
		return {
			status: status.value,
			value: new Date(input.data.getTime()),
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	get minDate() {
		let min = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "min") {
				if (min === null || ch.value > min) min = ch.value;
			}
		}
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (const ch of this._def.checks) {
			if (ch.kind === "max") {
				if (max === null || ch.value < max) max = ch.value;
			}
		}
		return max != null ? new Date(max) : null;
	}
}
ZodDate.create = (params) => {
	return new ZodDate({
		checks: [],
		coerce: (params === null || params === undefined ? undefined : params.coerce) || false,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params),
	});
};

class ZodSymbol extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.symbol) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.symbol,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
}
ZodSymbol.create = (params) => {
	return new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params),
	});
};

class ZodUndefined extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.undefined,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
}
ZodUndefined.create = (params) => {
	return new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params),
	});
};

class ZodNull extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.null) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.null,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
}
ZodNull.create = (params) => {
	return new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params),
	});
};

class ZodAny extends ZodType {
	constructor() {
		super(...arguments);
		this._any = true;
	}
	_parse(input) {
		return OK(input.data);
	}
}
ZodAny.create = (params) => {
	return new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params),
	});
};

class ZodUnknown extends ZodType {
	constructor() {
		super(...arguments);
		this._unknown = true;
	}
	_parse(input) {
		return OK(input.data);
	}
}
ZodUnknown.create = (params) => {
	return new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params),
	});
};

class ZodNever extends ZodType {
	_parse(input) {
		const ctx = this._getOrReturnCtx(input);
		addIssueToContext(ctx, {
			code: ZodIssueCode.invalid_type,
			expected: ZodParsedType.never,
			received: ctx.parsedType,
		});
		return INVALID;
	}
}
ZodNever.create = (params) => {
	return new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params),
	});
};

class ZodVoid extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.undefined) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.void,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return OK(input.data);
	}
}
ZodVoid.create = (params) => {
	return new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params),
	});
};

class ZodArray extends ZodType {
	_parse(input) {
		const { ctx, status } = this._processInputParams(input);
		const def = this._def;
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		if (def.exactLength !== null) {
			const tooBig = ctx.data.length > def.exactLength.value;
			const tooSmall = ctx.data.length < def.exactLength.value;
			if (tooBig || tooSmall) {
				addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : undefined,
					maximum: tooBig ? def.exactLength.value : undefined,
					type: "array",
					inclusive: true,
					exact: true,
					message: def.exactLength.message,
				});
				status.dirty();
			}
		}
		if (def.minLength !== null) {
			if (ctx.data.length < def.minLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.minLength.message,
				});
				status.dirty();
			}
		}
		if (def.maxLength !== null) {
			if (ctx.data.length > def.maxLength.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: true,
					exact: false,
					message: def.maxLength.message,
				});
				status.dirty();
			}
		}
		if (ctx.common.async) {
			return Promise.all(
				[...ctx.data].map((item, i) => {
					return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
				})
			).then((result2) => {
				return ParseStatus.mergeArray(status, result2);
			});
		}
		const result = [...ctx.data].map((item, i) => {
			return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
		});
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: { value: minLength, message: errorUtil.toString(message) },
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: { value: maxLength, message: errorUtil.toString(message) },
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: { value: len, message: errorUtil.toString(message) },
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
}
ZodArray.create = (schema, params) => {
	return new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params),
	});
};
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		const newShape = {};
		for (const key in schema.shape) {
			const fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape,
		});
	} else if (schema instanceof ZodArray) {
		return new ZodArray({
			...schema._def,
			type: deepPartialify(schema.element),
		});
	} else if (schema instanceof ZodOptional) {
		return ZodOptional.create(deepPartialify(schema.unwrap()));
	} else if (schema instanceof ZodNullable) {
		return ZodNullable.create(deepPartialify(schema.unwrap()));
	} else if (schema instanceof ZodTuple) {
		return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
	} else {
		return schema;
	}
}

class ZodObject extends ZodType {
	constructor() {
		super(...arguments);
		this._cached = null;
		this.nonstrict = this.passthrough;
		this.augment = this.extend;
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		const shape = this._def.shape();
		const keys = util.objectKeys(shape);
		return (this._cached = { shape, keys });
	}
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.object) {
			const ctx2 = this._getOrReturnCtx(input);
			addIssueToContext(ctx2, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx2.parsedType,
			});
			return INVALID;
		}
		const { status, ctx } = this._processInputParams(input);
		const { shape, keys: shapeKeys } = this._getCached();
		const extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
			for (const key in ctx.data) {
				if (!shapeKeys.includes(key)) {
					extraKeys.push(key);
				}
			}
		}
		const pairs = [];
		for (const key of shapeKeys) {
			const keyValidator = shape[key];
			const value = ctx.data[key];
			pairs.push({
				key: { status: "valid", value: key },
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data,
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			const unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough") {
				for (const key of extraKeys) {
					pairs.push({
						key: { status: "valid", value: key },
						value: { status: "valid", value: ctx.data[key] },
					});
				}
			} else if (unknownKeys === "strict") {
				if (extraKeys.length > 0) {
					addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys,
					});
					status.dirty();
				}
			} else if (unknownKeys === "strip");
			else {
				throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
			}
		} else {
			const catchall = this._def.catchall;
			for (const key of extraKeys) {
				const value = ctx.data[key];
				pairs.push({
					key: { status: "valid", value: key },
					value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
					alwaysSet: key in ctx.data,
				});
			}
		}
		if (ctx.common.async) {
			return Promise.resolve()
				.then(async () => {
					const syncPairs = [];
					for (const pair of pairs) {
						const key = await pair.key;
						const value = await pair.value;
						syncPairs.push({
							key,
							value,
							alwaysSet: pair.alwaysSet,
						});
					}
					return syncPairs;
				})
				.then((syncPairs) => {
					return ParseStatus.mergeObjectSync(status, syncPairs);
				});
		} else {
			return ParseStatus.mergeObjectSync(status, pairs);
		}
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		errorUtil.errToObj;
		return new ZodObject({
			...this._def,
			unknownKeys: "strict",
			...(message !== undefined
				? {
						errorMap: (issue, ctx) => {
							var _a, _b, _c, _d;
							const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === undefined ? undefined : _b.call(_a, issue, ctx).message) !== null && _c !== undefined ? _c : ctx.defaultError;
							if (issue.code === "unrecognized_keys")
								return {
									message: (_d = errorUtil.errToObj(message).message) !== null && _d !== undefined ? _d : defaultError,
								};
							return {
								message: defaultError,
							};
						},
				  }
				: {}),
		});
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip",
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough",
		});
	}
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation,
			}),
		});
	}
	merge(merging) {
		const merged = new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape(),
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject,
		});
		return merged;
	}
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index,
		});
	}
	pick(mask) {
		const shape = {};
		util.objectKeys(mask).forEach((key) => {
			if (mask[key] && this.shape[key]) {
				shape[key] = this.shape[key];
			}
		});
		return new ZodObject({
			...this._def,
			shape: () => shape,
		});
	}
	omit(mask) {
		const shape = {};
		util.objectKeys(this.shape).forEach((key) => {
			if (!mask[key]) {
				shape[key] = this.shape[key];
			}
		});
		return new ZodObject({
			...this._def,
			shape: () => shape,
		});
	}
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		const newShape = {};
		util.objectKeys(this.shape).forEach((key) => {
			const fieldSchema = this.shape[key];
			if (mask && !mask[key]) {
				newShape[key] = fieldSchema;
			} else {
				newShape[key] = fieldSchema.optional();
			}
		});
		return new ZodObject({
			...this._def,
			shape: () => newShape,
		});
	}
	required(mask) {
		const newShape = {};
		util.objectKeys(this.shape).forEach((key) => {
			if (mask && !mask[key]) {
				newShape[key] = this.shape[key];
			} else {
				const fieldSchema = this.shape[key];
				let newField = fieldSchema;
				while (newField instanceof ZodOptional) {
					newField = newField._def.innerType;
				}
				newShape[key] = newField;
			}
		});
		return new ZodObject({
			...this._def,
			shape: () => newShape,
		});
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
}
ZodObject.create = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};
ZodObject.strictCreate = (shape, params) => {
	return new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};
ZodObject.lazycreate = (shape, params) => {
	return new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
};

class ZodUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const options = this._def.options;
		function handleResults(results) {
			for (const result of results) {
				if (result.result.status === "valid") {
					return result.result;
				}
			}
			for (const result of results) {
				if (result.result.status === "dirty") {
					ctx.common.issues.push(...result.ctx.common.issues);
					return result.result;
				}
			}
			const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors,
			});
			return INVALID;
		}
		if (ctx.common.async) {
			return Promise.all(
				options.map(async (option) => {
					const childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: [],
						},
						parent: null,
					};
					return {
						result: await option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx,
						}),
						ctx: childCtx,
					};
				})
			).then(handleResults);
		} else {
			let dirty = undefined;
			const issues = [];
			for (const option of options) {
				const childCtx = {
					...ctx,
					common: {
						...ctx.common,
						issues: [],
					},
					parent: null,
				};
				const result = option._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: childCtx,
				});
				if (result.status === "valid") {
					return result;
				} else if (result.status === "dirty" && !dirty) {
					dirty = { result, ctx: childCtx };
				}
				if (childCtx.common.issues.length) {
					issues.push(childCtx.common.issues);
				}
			}
			if (dirty) {
				ctx.common.issues.push(...dirty.ctx.common.issues);
				return dirty.result;
			}
			const unionErrors = issues.map((issues2) => new ZodError(issues2));
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union,
				unionErrors,
			});
			return INVALID;
		}
	}
	get options() {
		return this._def.options;
	}
}
ZodUnion.create = (types, params) => {
	return new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params),
	});
};
var getDiscriminator = (type) => {
	if (type instanceof ZodLazy) {
		return getDiscriminator(type.schema);
	} else if (type instanceof ZodEffects) {
		return getDiscriminator(type.innerType());
	} else if (type instanceof ZodLiteral) {
		return [type.value];
	} else if (type instanceof ZodEnum) {
		return type.options;
	} else if (type instanceof ZodNativeEnum) {
		return util.objectValues(type.enum);
	} else if (type instanceof ZodDefault) {
		return getDiscriminator(type._def.innerType);
	} else if (type instanceof ZodUndefined) {
		return [undefined];
	} else if (type instanceof ZodNull) {
		return [null];
	} else if (type instanceof ZodOptional) {
		return [undefined, ...getDiscriminator(type.unwrap())];
	} else if (type instanceof ZodNullable) {
		return [null, ...getDiscriminator(type.unwrap())];
	} else if (type instanceof ZodBranded) {
		return getDiscriminator(type.unwrap());
	} else if (type instanceof ZodReadonly) {
		return getDiscriminator(type.unwrap());
	} else if (type instanceof ZodCatch) {
		return getDiscriminator(type._def.innerType);
	} else {
		return [];
	}
};

class ZodDiscriminatedUnion extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const discriminator = this.discriminator;
		const discriminatorValue = ctx.data[discriminator];
		const option = this.optionsMap.get(discriminatorValue);
		if (!option) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_union_discriminator,
				options: Array.from(this.optionsMap.keys()),
				path: [discriminator],
			});
			return INVALID;
		}
		if (ctx.common.async) {
			return option._parseAsync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
		} else {
			return option._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
		}
	}
	get discriminator() {
		return this._def.discriminator;
	}
	get options() {
		return this._def.options;
	}
	get optionsMap() {
		return this._def.optionsMap;
	}
	static create(discriminator, options, params) {
		const optionsMap = new Map();
		for (const type of options) {
			const discriminatorValues = getDiscriminator(type.shape[discriminator]);
			if (!discriminatorValues.length) {
				throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
			}
			for (const value of discriminatorValues) {
				if (optionsMap.has(value)) {
					throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
				}
				optionsMap.set(value, type);
			}
		}
		return new ZodDiscriminatedUnion({
			typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
			discriminator,
			options,
			optionsMap,
			...processCreateParams(params),
		});
	}
}
function mergeValues(a, b) {
	const aType = getParsedType(a);
	const bType = getParsedType(b);
	if (a === b) {
		return { valid: true, data: a };
	} else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		const bKeys = util.objectKeys(b);
		const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
		const newObj = { ...a, ...b };
		for (const key of sharedKeys) {
			const sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) {
				return { valid: false };
			}
			newObj[key] = sharedValue.data;
		}
		return { valid: true, data: newObj };
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) {
			return { valid: false };
		}
		const newArray = [];
		for (let index = 0; index < a.length; index++) {
			const itemA = a[index];
			const itemB = b[index];
			const sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) {
				return { valid: false };
			}
			newArray.push(sharedValue.data);
		}
		return { valid: true, data: newArray };
	} else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
		return { valid: true, data: a };
	} else {
		return { valid: false };
	}
}

class ZodIntersection extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const handleParsed = (parsedLeft, parsedRight) => {
			if (isAborted(parsedLeft) || isAborted(parsedRight)) {
				return INVALID;
			}
			const merged = mergeValues(parsedLeft.value, parsedRight.value);
			if (!merged.valid) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_intersection_types,
				});
				return INVALID;
			}
			if (isDirty(parsedLeft) || isDirty(parsedRight)) {
				status.dirty();
			}
			return { status: status.value, value: merged.data };
		};
		if (ctx.common.async) {
			return Promise.all([
				this._def.left._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
				this._def.right._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
			]).then(([left, right]) => handleParsed(left, right));
		} else {
			return handleParsed(
				this._def.left._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				}),
				this._def.right._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				})
			);
		}
	}
}
ZodIntersection.create = (left, right, params) => {
	return new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params),
	});
};

class ZodTuple extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.array,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		if (ctx.data.length < this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array",
			});
			return INVALID;
		}
		const rest = this._def.rest;
		if (!rest && ctx.data.length > this._def.items.length) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: true,
				exact: false,
				type: "array",
			});
			status.dirty();
		}
		const items = [...ctx.data]
			.map((item, itemIndex) => {
				const schema = this._def.items[itemIndex] || this._def.rest;
				if (!schema) return null;
				return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
			})
			.filter((x) => !!x);
		if (ctx.common.async) {
			return Promise.all(items).then((results) => {
				return ParseStatus.mergeArray(status, results);
			});
		} else {
			return ParseStatus.mergeArray(status, items);
		}
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest,
		});
	}
}
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas)) {
		throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	}
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params),
	});
};

class ZodRecord extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.object) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.object,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const pairs = [];
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		for (const key in ctx.data) {
			pairs.push({
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
				value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
				alwaysSet: key in ctx.data,
			});
		}
		if (ctx.common.async) {
			return ParseStatus.mergeObjectAsync(status, pairs);
		} else {
			return ParseStatus.mergeObjectSync(status, pairs);
		}
	}
	get element() {
		return this._def.valueType;
	}
	static create(first, second, third) {
		if (second instanceof ZodType) {
			return new ZodRecord({
				keyType: first,
				valueType: second,
				typeName: ZodFirstPartyTypeKind.ZodRecord,
				...processCreateParams(third),
			});
		}
		return new ZodRecord({
			keyType: ZodString.create(),
			valueType: first,
			typeName: ZodFirstPartyTypeKind.ZodRecord,
			...processCreateParams(second),
		});
	}
}

class ZodMap extends ZodType {
	get keySchema() {
		return this._def.keyType;
	}
	get valueSchema() {
		return this._def.valueType;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.map) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.map,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const keyType = this._def.keyType;
		const valueType = this._def.valueType;
		const pairs = [...ctx.data.entries()].map(([key, value], index) => {
			return {
				key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
				value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
			};
		});
		if (ctx.common.async) {
			const finalMap = new Map();
			return Promise.resolve().then(async () => {
				for (const pair of pairs) {
					const key = await pair.key;
					const value = await pair.value;
					if (key.status === "aborted" || value.status === "aborted") {
						return INVALID;
					}
					if (key.status === "dirty" || value.status === "dirty") {
						status.dirty();
					}
					finalMap.set(key.value, value.value);
				}
				return { status: status.value, value: finalMap };
			});
		} else {
			const finalMap = new Map();
			for (const pair of pairs) {
				const key = pair.key;
				const value = pair.value;
				if (key.status === "aborted" || value.status === "aborted") {
					return INVALID;
				}
				if (key.status === "dirty" || value.status === "dirty") {
					status.dirty();
				}
				finalMap.set(key.value, value.value);
			}
			return { status: status.value, value: finalMap };
		}
	}
}
ZodMap.create = (keyType, valueType, params) => {
	return new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params),
	});
};

class ZodSet extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.set,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const def = this._def;
		if (def.minSize !== null) {
			if (ctx.data.size < def.minSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.minSize.message,
				});
				status.dirty();
			}
		}
		if (def.maxSize !== null) {
			if (ctx.data.size > def.maxSize.value) {
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: true,
					exact: false,
					message: def.maxSize.message,
				});
				status.dirty();
			}
		}
		const valueType = this._def.valueType;
		function finalizeSet(elements2) {
			const parsedSet = new Set();
			for (const element of elements2) {
				if (element.status === "aborted") return INVALID;
				if (element.status === "dirty") status.dirty();
				parsedSet.add(element.value);
			}
			return { status: status.value, value: parsedSet };
		}
		const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
		if (ctx.common.async) {
			return Promise.all(elements).then((elements2) => finalizeSet(elements2));
		} else {
			return finalizeSet(elements);
		}
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: { value: minSize, message: errorUtil.toString(message) },
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: { value: maxSize, message: errorUtil.toString(message) },
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
}
ZodSet.create = (valueType, params) => {
	return new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params),
	});
};

class ZodFunction extends ZodType {
	constructor() {
		super(...arguments);
		this.validate = this.implement;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.function) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.function,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		function makeArgsIssue(args, error) {
			return makeIssue({
				data: args,
				path: ctx.path,
				errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_arguments,
					argumentsError: error,
				},
			});
		}
		function makeReturnsIssue(returns, error) {
			return makeIssue({
				data: returns,
				path: ctx.path,
				errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), errorMap].filter((x) => !!x),
				issueData: {
					code: ZodIssueCode.invalid_return_type,
					returnTypeError: error,
				},
			});
		}
		const params = { errorMap: ctx.common.contextualErrorMap };
		const fn = ctx.data;
		if (this._def.returns instanceof ZodPromise) {
			const me = this;
			return OK(async function (...args) {
				const error = new ZodError([]);
				const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
					error.addIssue(makeArgsIssue(args, e));
					throw error;
				});
				const result = await Reflect.apply(fn, this, parsedArgs);
				const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
					error.addIssue(makeReturnsIssue(result, e));
					throw error;
				});
				return parsedReturns;
			});
		} else {
			const me = this;
			return OK(function (...args) {
				const parsedArgs = me._def.args.safeParse(args, params);
				if (!parsedArgs.success) {
					throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
				}
				const result = Reflect.apply(fn, this, parsedArgs.data);
				const parsedReturns = me._def.returns.safeParse(result, params);
				if (!parsedReturns.success) {
					throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
				}
				return parsedReturns.data;
			});
		}
	}
	parameters() {
		return this._def.args;
	}
	returnType() {
		return this._def.returns;
	}
	args(...items) {
		return new ZodFunction({
			...this._def,
			args: ZodTuple.create(items).rest(ZodUnknown.create()),
		});
	}
	returns(returnType) {
		return new ZodFunction({
			...this._def,
			returns: returnType,
		});
	}
	implement(func) {
		const validatedFunc = this.parse(func);
		return validatedFunc;
	}
	strictImplement(func) {
		const validatedFunc = this.parse(func);
		return validatedFunc;
	}
	static create(args, returns, params) {
		return new ZodFunction({
			args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
			returns: returns || ZodUnknown.create(),
			typeName: ZodFirstPartyTypeKind.ZodFunction,
			...processCreateParams(params),
		});
	}
}

class ZodLazy extends ZodType {
	get schema() {
		return this._def.getter();
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const lazySchema = this._def.getter();
		return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
	}
}
ZodLazy.create = (getter, params) => {
	return new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params),
	});
};

class ZodLiteral extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_literal,
				expected: this._def.value,
			});
			return INVALID;
		}
		return { status: "valid", value: input.data };
	}
	get value() {
		return this._def.value;
	}
}
ZodLiteral.create = (value, params) => {
	return new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params),
	});
};
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params),
	});
}

class ZodEnum extends ZodType {
	constructor() {
		super(...arguments);
		_ZodEnum_cache.set(this, undefined);
	}
	_parse(input) {
		if (typeof input.data !== "string") {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type,
			});
			return INVALID;
		}
		if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
			__classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
		}
		if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
			const ctx = this._getOrReturnCtx(input);
			const expectedValues = this._def.values;
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues,
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	get Values() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	get Enum() {
		const enumValues = {};
		for (const val of this._def.values) {
			enumValues[val] = val;
		}
		return enumValues;
	}
	extract(values, newDef = this._def) {
		return ZodEnum.create(values, {
			...this._def,
			...newDef,
		});
	}
	exclude(values, newDef = this._def) {
		return ZodEnum.create(
			this.options.filter((opt) => !values.includes(opt)),
			{
				...this._def,
				...newDef,
			}
		);
	}
}
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
	constructor() {
		super(...arguments);
		_ZodNativeEnum_cache.set(this, undefined);
	}
	_parse(input) {
		const nativeEnumValues = util.getValidEnumValues(this._def.values);
		const ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				expected: util.joinValues(expectedValues),
				received: ctx.parsedType,
				code: ZodIssueCode.invalid_type,
			});
			return INVALID;
		}
		if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
			__classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
		}
		if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
			const expectedValues = util.objectValues(nativeEnumValues);
			addIssueToContext(ctx, {
				received: ctx.data,
				code: ZodIssueCode.invalid_enum_value,
				options: expectedValues,
			});
			return INVALID;
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
}
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
	return new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params),
	});
};

class ZodPromise extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.promise,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
		return OK(
			promisified.then((data) => {
				return this._def.type.parseAsync(data, {
					path: ctx.path,
					errorMap: ctx.common.contextualErrorMap,
				});
			})
		);
	}
}
ZodPromise.create = (schema, params) => {
	return new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params),
	});
};

class ZodEffects extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
	}
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		const effect = this._def.effect || null;
		const checkCtx = {
			addIssue: (arg) => {
				addIssueToContext(ctx, arg);
				if (arg.fatal) {
					status.abort();
				} else {
					status.dirty();
				}
			},
			get path() {
				return ctx.path;
			},
		};
		checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
		if (effect.type === "preprocess") {
			const processed = effect.transform(ctx.data, checkCtx);
			if (ctx.common.async) {
				return Promise.resolve(processed).then(async (processed2) => {
					if (status.value === "aborted") return INVALID;
					const result = await this._def.schema._parseAsync({
						data: processed2,
						path: ctx.path,
						parent: ctx,
					});
					if (result.status === "aborted") return INVALID;
					if (result.status === "dirty") return DIRTY(result.value);
					if (status.value === "dirty") return DIRTY(result.value);
					return result;
				});
			} else {
				if (status.value === "aborted") return INVALID;
				const result = this._def.schema._parseSync({
					data: processed,
					path: ctx.path,
					parent: ctx,
				});
				if (result.status === "aborted") return INVALID;
				if (result.status === "dirty") return DIRTY(result.value);
				if (status.value === "dirty") return DIRTY(result.value);
				return result;
			}
		}
		if (effect.type === "refinement") {
			const executeRefinement = (acc) => {
				const result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) {
					return Promise.resolve(result);
				}
				if (result instanceof Promise) {
					throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
				}
				return acc;
			};
			if (ctx.common.async === false) {
				const inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (inner.status === "aborted") return INVALID;
				if (inner.status === "dirty") status.dirty();
				executeRefinement(inner.value);
				return { status: status.value, value: inner.value };
			} else {
				return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
					if (inner.status === "aborted") return INVALID;
					if (inner.status === "dirty") status.dirty();
					return executeRefinement(inner.value).then(() => {
						return { status: status.value, value: inner.value };
					});
				});
			}
		}
		if (effect.type === "transform") {
			if (ctx.common.async === false) {
				const base = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (!isValid(base)) return base;
				const result = effect.transform(base.value, checkCtx);
				if (result instanceof Promise) {
					throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
				}
				return { status: status.value, value: result };
			} else {
				return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
					if (!isValid(base)) return base;
					return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
				});
			}
		}
		util.assertNever(effect);
	}
}
ZodEffects.create = (schema, effect, params) => {
	return new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params),
	});
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
	return new ZodEffects({
		schema,
		effect: { type: "preprocess", transform: preprocess },
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params),
	});
};

class ZodOptional extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType === ZodParsedType.undefined) {
			return OK(undefined);
		}
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
}
ZodOptional.create = (type, params) => {
	return new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params),
	});
};

class ZodNullable extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType === ZodParsedType.null) {
			return OK(null);
		}
		return this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
}
ZodNullable.create = (type, params) => {
	return new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params),
	});
};

class ZodDefault extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		let data = ctx.data;
		if (ctx.parsedType === ZodParsedType.undefined) {
			data = this._def.defaultValue();
		}
		return this._def.innerType._parse({
			data,
			path: ctx.path,
			parent: ctx,
		});
	}
	removeDefault() {
		return this._def.innerType;
	}
}
ZodDefault.create = (type, params) => {
	return new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default === "function" ? params.default : () => params.default,
		...processCreateParams(params),
	});
};

class ZodCatch extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const newCtx = {
			...ctx,
			common: {
				...ctx.common,
				issues: [],
			},
		};
		const result = this._def.innerType._parse({
			data: newCtx.data,
			path: newCtx.path,
			parent: {
				...newCtx,
			},
		});
		if (isAsync(result)) {
			return result.then((result2) => {
				return {
					status: "valid",
					value:
						result2.status === "valid"
							? result2.value
							: this._def.catchValue({
									get error() {
										return new ZodError(newCtx.common.issues);
									},
									input: newCtx.data,
							  }),
				};
			});
		} else {
			return {
				status: "valid",
				value:
					result.status === "valid"
						? result.value
						: this._def.catchValue({
								get error() {
									return new ZodError(newCtx.common.issues);
								},
								input: newCtx.data,
						  }),
			};
		}
	}
	removeCatch() {
		return this._def.innerType;
	}
}
ZodCatch.create = (type, params) => {
	return new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
		...processCreateParams(params),
	});
};

class ZodNaN extends ZodType {
	_parse(input) {
		const parsedType = this._getType(input);
		if (parsedType !== ZodParsedType.nan) {
			const ctx = this._getOrReturnCtx(input);
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.nan,
				received: ctx.parsedType,
			});
			return INVALID;
		}
		return { status: "valid", value: input.data };
	}
}
ZodNaN.create = (params) => {
	return new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params),
	});
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
	_parse(input) {
		const { ctx } = this._processInputParams(input);
		const data = ctx.data;
		return this._def.type._parse({
			data,
			path: ctx.path,
			parent: ctx,
		});
	}
	unwrap() {
		return this._def.type;
	}
}

class ZodPipeline extends ZodType {
	_parse(input) {
		const { status, ctx } = this._processInputParams(input);
		if (ctx.common.async) {
			const handleAsync = async () => {
				const inResult = await this._def.in._parseAsync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (inResult.status === "aborted") return INVALID;
				if (inResult.status === "dirty") {
					status.dirty();
					return DIRTY(inResult.value);
				} else {
					return this._def.out._parseAsync({
						data: inResult.value,
						path: ctx.path,
						parent: ctx,
					});
				}
			};
			return handleAsync();
		} else {
			const inResult = this._def.in._parseSync({
				data: ctx.data,
				path: ctx.path,
				parent: ctx,
			});
			if (inResult.status === "aborted") return INVALID;
			if (inResult.status === "dirty") {
				status.dirty();
				return {
					status: "dirty",
					value: inResult.value,
				};
			} else {
				return this._def.out._parseSync({
					data: inResult.value,
					path: ctx.path,
					parent: ctx,
				});
			}
		}
	}
	static create(a, b) {
		return new ZodPipeline({
			in: a,
			out: b,
			typeName: ZodFirstPartyTypeKind.ZodPipeline,
		});
	}
}

class ZodReadonly extends ZodType {
	_parse(input) {
		const result = this._def.innerType._parse(input);
		const freeze = (data) => {
			if (isValid(data)) {
				data.value = Object.freeze(data.value);
			}
			return data;
		};
		return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
	}
	unwrap() {
		return this._def.innerType;
	}
}
ZodReadonly.create = (type, params) => {
	return new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params),
	});
};
function cleanParams(params, data) {
	const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
	const p2 = typeof p === "string" ? { message: p } : p;
	return p2;
}
function custom(check, _params = {}, fatal) {
	if (check)
		return ZodAny.create().superRefine((data, ctx) => {
			var _a, _b;
			const r = check(data);
			if (r instanceof Promise) {
				return r.then((r2) => {
					var _a2, _b2;
					if (!r2) {
						const params = cleanParams(_params, data);
						const _fatal = (_b2 = (_a2 = params.fatal) !== null && _a2 !== undefined ? _a2 : fatal) !== null && _b2 !== undefined ? _b2 : true;
						ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
					}
				});
			}
			if (!r) {
				const params = cleanParams(_params, data);
				const _fatal = (_b = (_a = params.fatal) !== null && _a !== undefined ? _a : fatal) !== null && _b !== undefined ? _b : true;
				ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
			}
			return;
		});
	return ZodAny.create();
}
var late = {
	object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind2) {
	ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
	ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
	ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
	ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
	ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
	ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
	ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
	ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
	ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
	ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
	ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
	ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
	ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
	ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
	ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
	ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
	ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
	ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
	ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
	ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
	ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
	ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
	ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
	ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
	ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
	ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
	ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
	ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
	ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
	ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
	ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
	ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
	ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
	ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
	ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
	ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (
	cls,
	params = {
		message: `Input not instance of ${cls.name}`,
	}
) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
	string: (arg) => ZodString.create({ ...arg, coerce: true }),
	number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
	boolean: (arg) =>
		ZodBoolean.create({
			...arg,
			coerce: true,
		}),
	bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
	date: (arg) => ZodDate.create({ ...arg, coerce: true }),
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
	__proto__: null,
	defaultErrorMap: errorMap,
	setErrorMap,
	getErrorMap,
	makeIssue,
	EMPTY_PATH,
	addIssueToContext,
	ParseStatus,
	INVALID,
	DIRTY,
	OK,
	isAborted,
	isDirty,
	isValid,
	isAsync,
	get util() {
		return util;
	},
	get objectUtil() {
		return objectUtil;
	},
	ZodParsedType,
	getParsedType,
	ZodType,
	datetimeRegex,
	ZodString,
	ZodNumber,
	ZodBigInt,
	ZodBoolean,
	ZodDate,
	ZodSymbol,
	ZodUndefined,
	ZodNull,
	ZodAny,
	ZodUnknown,
	ZodNever,
	ZodVoid,
	ZodArray,
	ZodObject,
	ZodUnion,
	ZodDiscriminatedUnion,
	ZodIntersection,
	ZodTuple,
	ZodRecord,
	ZodMap,
	ZodSet,
	ZodFunction,
	ZodLazy,
	ZodLiteral,
	ZodEnum,
	ZodNativeEnum,
	ZodPromise,
	ZodEffects,
	ZodTransformer: ZodEffects,
	ZodOptional,
	ZodNullable,
	ZodDefault,
	ZodCatch,
	ZodNaN,
	BRAND,
	ZodBranded,
	ZodPipeline,
	ZodReadonly,
	custom,
	Schema: ZodType,
	ZodSchema: ZodType,
	late,
	get ZodFirstPartyTypeKind() {
		return ZodFirstPartyTypeKind;
	},
	coerce,
	any: anyType,
	array: arrayType,
	bigint: bigIntType,
	boolean: booleanType,
	date: dateType,
	discriminatedUnion: discriminatedUnionType,
	effect: effectsType,
	enum: enumType,
	function: functionType,
	instanceof: instanceOfType,
	intersection: intersectionType,
	lazy: lazyType,
	literal: literalType,
	map: mapType,
	nan: nanType,
	nativeEnum: nativeEnumType,
	never: neverType,
	null: nullType,
	nullable: nullableType,
	number: numberType,
	object: objectType,
	oboolean,
	onumber,
	optional: optionalType,
	ostring,
	pipeline: pipelineType,
	preprocess: preprocessType,
	promise: promiseType,
	record: recordType,
	set: setType,
	strictObject: strictObjectType,
	string: stringType,
	symbol: symbolType,
	transformer: effectsType,
	tuple: tupleType,
	undefined: undefinedType,
	union: unionType,
	unknown: unknownType,
	void: voidType,
	NEVER,
	ZodIssueCode,
	quotelessJson,
	ZodError,
});

// src/utils/credentials.ts
var ServerSchema = z.string().url();
function verifyCredentials(rawApiKey, rawserverUrl) {
	const apiKeyOrEnv = rawApiKey || process.env.SAMS_API_KEY;
	if (!apiKeyOrEnv) throw new Error("API key is required! Include key as function prop or set the env SAMS_API_KEY");
	const serverOrEnv = rawserverUrl || process.env.SAMS_SERVER;
	const validateServer = ServerSchema.safeParse(serverOrEnv?.trim());
	if (!validateServer.success) throw new Error("Sams server required! Include server as function prop or set the env SAMS_SERVER");
	const sanitizedServerUrl = validateServer.data.endsWith("/") ? validateServer.data.slice(0, -1) : validateServer.data;
	return {
		apiKey: apiKeyOrEnv,
		serverUrl: sanitizedServerUrl,
	};
}

// node_modules/fast-xml-parser/src/util.js
var nameStartChar = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
var nameChar = nameStartChar + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
var nameRegexp = "[" + nameStartChar + "][" + nameChar + "]*";
var regexName = new RegExp("^" + nameRegexp + "$");
function getAllMatches(string, regex) {
	const matches = [];
	let match = regex.exec(string);
	while (match) {
		const allmatches = [];
		allmatches.startIndex = regex.lastIndex - match[0].length;
		const len = match.length;
		for (let index = 0; index < len; index++) {
			allmatches.push(match[index]);
		}
		matches.push(allmatches);
		match = regex.exec(string);
	}
	return matches;
}
var isName = function (string) {
	const match = regexName.exec(string);
	return !(match === null || typeof match === "undefined");
};
function isExist(v) {
	return typeof v !== "undefined";
}

// node_modules/fast-xml-parser/src/validator.js
var defaultOptions = {
	allowBooleanAttributes: false,
	unpairedTags: [],
};
function validate(xmlData, options) {
	options = Object.assign({}, defaultOptions, options);
	const tags = [];
	let tagFound = false;
	let reachedRoot = false;
	if (xmlData[0] === "\uFEFF") {
		xmlData = xmlData.substr(1);
	}
	for (let i = 0; i < xmlData.length; i++) {
		if (xmlData[i] === "<" && xmlData[i + 1] === "?") {
			i += 2;
			i = readPI(xmlData, i);
			if (i.err) return i;
		} else if (xmlData[i] === "<") {
			let tagStartPos = i;
			i++;
			if (xmlData[i] === "!") {
				i = readCommentAndCDATA(xmlData, i);
				continue;
			} else {
				let closingTag = false;
				if (xmlData[i] === "/") {
					closingTag = true;
					i++;
				}
				let tagName = "";
				for (
					;
					i < xmlData.length &&
					xmlData[i] !== ">" &&
					xmlData[i] !== " " &&
					xmlData[i] !== "\t" &&
					xmlData[i] !==
						`
` &&
					xmlData[i] !== "\r";
					i++
				) {
					tagName += xmlData[i];
				}
				tagName = tagName.trim();
				if (tagName[tagName.length - 1] === "/") {
					tagName = tagName.substring(0, tagName.length - 1);
					i--;
				}
				if (!validateTagName(tagName)) {
					let msg;
					if (tagName.trim().length === 0) {
						msg = "Invalid space after '<'.";
					} else {
						msg = "Tag '" + tagName + "' is an invalid name.";
					}
					return getErrorObject("InvalidTag", msg, getLineNumberForPosition(xmlData, i));
				}
				const result = readAttributeStr(xmlData, i);
				if (result === false) {
					return getErrorObject("InvalidAttr", "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
				}
				let attrStr = result.value;
				i = result.index;
				if (attrStr[attrStr.length - 1] === "/") {
					const attrStrStart = i - attrStr.length;
					attrStr = attrStr.substring(0, attrStr.length - 1);
					const isValid2 = validateAttributeString(attrStr, options);
					if (isValid2 === true) {
						tagFound = true;
					} else {
						return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid2.err.line));
					}
				} else if (closingTag) {
					if (!result.tagClosed) {
						return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
					} else if (attrStr.trim().length > 0) {
						return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
					} else if (tags.length === 0) {
						return getErrorObject("InvalidTag", "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
					} else {
						const otg = tags.pop();
						if (tagName !== otg.tagName) {
							let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
							return getErrorObject("InvalidTag", "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
						}
						if (tags.length == 0) {
							reachedRoot = true;
						}
					}
				} else {
					const isValid2 = validateAttributeString(attrStr, options);
					if (isValid2 !== true) {
						return getErrorObject(isValid2.err.code, isValid2.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid2.err.line));
					}
					if (reachedRoot === true) {
						return getErrorObject("InvalidXml", "Multiple possible root nodes found.", getLineNumberForPosition(xmlData, i));
					} else if (options.unpairedTags.indexOf(tagName) !== -1) {
					} else {
						tags.push({ tagName, tagStartPos });
					}
					tagFound = true;
				}
				for (i++; i < xmlData.length; i++) {
					if (xmlData[i] === "<") {
						if (xmlData[i + 1] === "!") {
							i++;
							i = readCommentAndCDATA(xmlData, i);
							continue;
						} else if (xmlData[i + 1] === "?") {
							i = readPI(xmlData, ++i);
							if (i.err) return i;
						} else {
							break;
						}
					} else if (xmlData[i] === "&") {
						const afterAmp = validateAmpersand(xmlData, i);
						if (afterAmp == -1) return getErrorObject("InvalidChar", "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
						i = afterAmp;
					} else {
						if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
							return getErrorObject("InvalidXml", "Extra text at the end", getLineNumberForPosition(xmlData, i));
						}
					}
				}
				if (xmlData[i] === "<") {
					i--;
				}
			}
		} else {
			if (isWhiteSpace(xmlData[i])) {
				continue;
			}
			return getErrorObject("InvalidChar", "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
		}
	}
	if (!tagFound) {
		return getErrorObject("InvalidXml", "Start tag expected.", 1);
	} else if (tags.length == 1) {
		return getErrorObject("InvalidTag", "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
	} else if (tags.length > 0) {
		return getErrorObject(
			"InvalidXml",
			"Invalid '" +
				JSON.stringify(
					tags.map((t) => t.tagName),
					null,
					4
				).replace(/\r?\n/g, "") +
				"' found.",
			{ line: 1, col: 1 }
		);
	}
	return true;
}
function isWhiteSpace(char) {
	return (
		char === " " ||
		char === "\t" ||
		char ===
			`
` ||
		char === "\r"
	);
}
function readPI(xmlData, i) {
	const start = i;
	for (; i < xmlData.length; i++) {
		if (xmlData[i] == "?" || xmlData[i] == " ") {
			const tagname = xmlData.substr(start, i - start);
			if (i > 5 && tagname === "xml") {
				return getErrorObject("InvalidXml", "XML declaration allowed only at the start of the document.", getLineNumberForPosition(xmlData, i));
			} else if (xmlData[i] == "?" && xmlData[i + 1] == ">") {
				i++;
				break;
			} else {
				continue;
			}
		}
	}
	return i;
}
function readCommentAndCDATA(xmlData, i) {
	if (xmlData.length > i + 5 && xmlData[i + 1] === "-" && xmlData[i + 2] === "-") {
		for (i += 3; i < xmlData.length; i++) {
			if (xmlData[i] === "-" && xmlData[i + 1] === "-" && xmlData[i + 2] === ">") {
				i += 2;
				break;
			}
		}
	} else if (xmlData.length > i + 8 && xmlData[i + 1] === "D" && xmlData[i + 2] === "O" && xmlData[i + 3] === "C" && xmlData[i + 4] === "T" && xmlData[i + 5] === "Y" && xmlData[i + 6] === "P" && xmlData[i + 7] === "E") {
		let angleBracketsCount = 1;
		for (i += 8; i < xmlData.length; i++) {
			if (xmlData[i] === "<") {
				angleBracketsCount++;
			} else if (xmlData[i] === ">") {
				angleBracketsCount--;
				if (angleBracketsCount === 0) {
					break;
				}
			}
		}
	} else if (xmlData.length > i + 9 && xmlData[i + 1] === "[" && xmlData[i + 2] === "C" && xmlData[i + 3] === "D" && xmlData[i + 4] === "A" && xmlData[i + 5] === "T" && xmlData[i + 6] === "A" && xmlData[i + 7] === "[") {
		for (i += 8; i < xmlData.length; i++) {
			if (xmlData[i] === "]" && xmlData[i + 1] === "]" && xmlData[i + 2] === ">") {
				i += 2;
				break;
			}
		}
	}
	return i;
}
var doubleQuote = '"';
var singleQuote = "'";
function readAttributeStr(xmlData, i) {
	let attrStr = "";
	let startChar = "";
	let tagClosed = false;
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
			if (startChar === "") {
				startChar = xmlData[i];
			} else if (startChar !== xmlData[i]) {
			} else {
				startChar = "";
			}
		} else if (xmlData[i] === ">") {
			if (startChar === "") {
				tagClosed = true;
				break;
			}
		}
		attrStr += xmlData[i];
	}
	if (startChar !== "") {
		return false;
	}
	return {
		value: attrStr,
		index: i,
		tagClosed,
	};
}
var validAttrStrRegxp = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
function validateAttributeString(attrStr, options) {
	const matches = getAllMatches(attrStr, validAttrStrRegxp);
	const attrNames = {};
	for (let i = 0; i < matches.length; i++) {
		if (matches[i][1].length === 0) {
			return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
		} else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
			return getErrorObject("InvalidAttr", "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
		} else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
			return getErrorObject("InvalidAttr", "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
		}
		const attrName = matches[i][2];
		if (!validateAttrName(attrName)) {
			return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
		}
		if (!attrNames.hasOwnProperty(attrName)) {
			attrNames[attrName] = 1;
		} else {
			return getErrorObject("InvalidAttr", "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
		}
	}
	return true;
}
function validateNumberAmpersand(xmlData, i) {
	let re = /\d/;
	if (xmlData[i] === "x") {
		i++;
		re = /[\da-fA-F]/;
	}
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === ";") return i;
		if (!xmlData[i].match(re)) break;
	}
	return -1;
}
function validateAmpersand(xmlData, i) {
	i++;
	if (xmlData[i] === ";") return -1;
	if (xmlData[i] === "#") {
		i++;
		return validateNumberAmpersand(xmlData, i);
	}
	let count = 0;
	for (; i < xmlData.length; i++, count++) {
		if (xmlData[i].match(/\w/) && count < 20) continue;
		if (xmlData[i] === ";") break;
		return -1;
	}
	return i;
}
function getErrorObject(code, message, lineNumber) {
	return {
		err: {
			code,
			msg: message,
			line: lineNumber.line || lineNumber,
			col: lineNumber.col,
		},
	};
}
function validateAttrName(attrName) {
	return isName(attrName);
}
function validateTagName(tagname) {
	return isName(tagname);
}
function getLineNumberForPosition(xmlData, index) {
	const lines = xmlData.substring(0, index).split(/\r?\n/);
	return {
		line: lines.length,
		col: lines[lines.length - 1].length + 1,
	};
}
function getPositionFromMatch(match) {
	return match.startIndex + match[1].length;
}

// node_modules/fast-xml-parser/src/xmlparser/OptionsBuilder.js
var defaultOptions2 = {
	preserveOrder: false,
	attributeNamePrefix: "@_",
	attributesGroupName: false,
	textNodeName: "#text",
	ignoreAttributes: true,
	removeNSPrefix: false,
	allowBooleanAttributes: false,
	parseTagValue: true,
	parseAttributeValue: false,
	trimValues: true,
	cdataPropName: false,
	numberParseOptions: {
		hex: true,
		leadingZeros: true,
		eNotation: true,
	},
	tagValueProcessor: function (tagName, val) {
		return val;
	},
	attributeValueProcessor: function (attrName, val) {
		return val;
	},
	stopNodes: [],
	alwaysCreateTextNode: false,
	isArray: () => false,
	commentPropName: false,
	unpairedTags: [],
	processEntities: true,
	htmlEntities: false,
	ignoreDeclaration: false,
	ignorePiTags: false,
	transformTagName: false,
	transformAttributeName: false,
	updateTag: function (tagName, jPath, attrs) {
		return tagName;
	},
	captureMetaData: false,
};
var buildOptions = function (options) {
	return Object.assign({}, defaultOptions2, options);
};

// node_modules/fast-xml-parser/src/xmlparser/xmlNode.js
var METADATA_SYMBOL;
if (typeof Symbol !== "function") {
	METADATA_SYMBOL = "@@xmlMetadata";
} else {
	METADATA_SYMBOL = Symbol("XML Node Metadata");
}

class XmlNode {
	constructor(tagname) {
		this.tagname = tagname;
		this.child = [];
		this[":@"] = {};
	}
	add(key, val) {
		if (key === "__proto__") key = "#__proto__";
		this.child.push({ [key]: val });
	}
	addChild(node, startIndex) {
		if (node.tagname === "__proto__") node.tagname = "#__proto__";
		if (node[":@"] && Object.keys(node[":@"]).length > 0) {
			this.child.push({ [node.tagname]: node.child, [":@"]: node[":@"] });
		} else {
			this.child.push({ [node.tagname]: node.child });
		}
		if (startIndex !== undefined) {
			this.child[this.child.length - 1][METADATA_SYMBOL] = { startIndex };
		}
	}
	static getMetaDataSymbol() {
		return METADATA_SYMBOL;
	}
}

// node_modules/fast-xml-parser/src/xmlparser/DocTypeReader.js
function readDocType(xmlData, i) {
	const entities = {};
	if (xmlData[i + 3] === "O" && xmlData[i + 4] === "C" && xmlData[i + 5] === "T" && xmlData[i + 6] === "Y" && xmlData[i + 7] === "P" && xmlData[i + 8] === "E") {
		i = i + 9;
		let angleBracketsCount = 1;
		let hasBody = false,
			comment = false;
		let exp = "";
		for (; i < xmlData.length; i++) {
			if (xmlData[i] === "<" && !comment) {
				if (hasBody && isEntity(xmlData, i)) {
					i += 7;
					let entityName, val;
					[entityName, val, i] = readEntityExp(xmlData, i + 1);
					if (val.indexOf("&") === -1)
						entities[validateEntityName(entityName)] = {
							regx: RegExp(`&${entityName};`, "g"),
							val,
						};
				} else if (hasBody && isElement(xmlData, i)) i += 8;
				else if (hasBody && isAttlist(xmlData, i)) i += 8;
				else if (hasBody && isNotation(xmlData, i)) i += 9;
				else if (isComment) comment = true;
				else throw new Error("Invalid DOCTYPE");
				angleBracketsCount++;
				exp = "";
			} else if (xmlData[i] === ">") {
				if (comment) {
					if (xmlData[i - 1] === "-" && xmlData[i - 2] === "-") {
						comment = false;
						angleBracketsCount--;
					}
				} else {
					angleBracketsCount--;
				}
				if (angleBracketsCount === 0) {
					break;
				}
			} else if (xmlData[i] === "[") {
				hasBody = true;
			} else {
				exp += xmlData[i];
			}
		}
		if (angleBracketsCount !== 0) {
			throw new Error(`Unclosed DOCTYPE`);
		}
	} else {
		throw new Error(`Invalid Tag instead of DOCTYPE`);
	}
	return { entities, i };
}
function readEntityExp(xmlData, i) {
	let entityName = "";
	for (; i < xmlData.length && xmlData[i] !== "'" && xmlData[i] !== '"'; i++) {
		entityName += xmlData[i];
	}
	entityName = entityName.trim();
	if (entityName.indexOf(" ") !== -1) throw new Error("External entites are not supported");
	const startChar = xmlData[i++];
	let val = "";
	for (; i < xmlData.length && xmlData[i] !== startChar; i++) {
		val += xmlData[i];
	}
	return [entityName, val, i];
}
function isComment(xmlData, i) {
	if (xmlData[i + 1] === "!" && xmlData[i + 2] === "-" && xmlData[i + 3] === "-") return true;
	return false;
}
function isEntity(xmlData, i) {
	if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "N" && xmlData[i + 4] === "T" && xmlData[i + 5] === "I" && xmlData[i + 6] === "T" && xmlData[i + 7] === "Y") return true;
	return false;
}
function isElement(xmlData, i) {
	if (xmlData[i + 1] === "!" && xmlData[i + 2] === "E" && xmlData[i + 3] === "L" && xmlData[i + 4] === "E" && xmlData[i + 5] === "M" && xmlData[i + 6] === "E" && xmlData[i + 7] === "N" && xmlData[i + 8] === "T") return true;
	return false;
}
function isAttlist(xmlData, i) {
	if (xmlData[i + 1] === "!" && xmlData[i + 2] === "A" && xmlData[i + 3] === "T" && xmlData[i + 4] === "T" && xmlData[i + 5] === "L" && xmlData[i + 6] === "I" && xmlData[i + 7] === "S" && xmlData[i + 8] === "T") return true;
	return false;
}
function isNotation(xmlData, i) {
	if (xmlData[i + 1] === "!" && xmlData[i + 2] === "N" && xmlData[i + 3] === "O" && xmlData[i + 4] === "T" && xmlData[i + 5] === "A" && xmlData[i + 6] === "T" && xmlData[i + 7] === "I" && xmlData[i + 8] === "O" && xmlData[i + 9] === "N") return true;
	return false;
}
function validateEntityName(name) {
	if (isName(name)) return name;
	else throw new Error(`Invalid entity name ${name}`);
}

// node_modules/strnum/strnum.js
var hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
var numRegex = /^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/;
var consider = {
	hex: true,
	leadingZeros: true,
	decimalPoint: ".",
	eNotation: true,
};
function toNumber(str, options = {}) {
	options = Object.assign({}, consider, options);
	if (!str || typeof str !== "string") return str;
	let trimmedStr = str.trim();
	if (options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;
	else if (str === "0") return 0;
	else if (options.hex && hexRegex.test(trimmedStr)) {
		return parse_int(trimmedStr, 16);
	} else if (trimmedStr.search(/[eE]/) !== -1) {
		const notation = trimmedStr.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);
		if (notation) {
			if (options.leadingZeros) {
				trimmedStr = (notation[1] || "") + notation[3];
			} else {
				if (notation[2] === "0" && notation[3][0] === ".") {
				} else {
					return str;
				}
			}
			return options.eNotation ? Number(trimmedStr) : str;
		} else {
			return str;
		}
	} else {
		const match = numRegex.exec(trimmedStr);
		if (match) {
			const sign = match[1];
			const leadingZeros = match[2];
			let numTrimmedByZeros = trimZeros(match[3]);
			if (!options.leadingZeros && leadingZeros.length > 0 && sign && trimmedStr[2] !== ".") return str;
			else if (!options.leadingZeros && leadingZeros.length > 0 && !sign && trimmedStr[1] !== ".") return str;
			else if (options.leadingZeros && leadingZeros === str) return 0;
			else {
				const num = Number(trimmedStr);
				const numStr = "" + num;
				if (numStr.search(/[eE]/) !== -1) {
					if (options.eNotation) return num;
					else return str;
				} else if (trimmedStr.indexOf(".") !== -1) {
					if (numStr === "0" && numTrimmedByZeros === "") return num;
					else if (numStr === numTrimmedByZeros) return num;
					else if (sign && numStr === "-" + numTrimmedByZeros) return num;
					else return str;
				}
				if (leadingZeros) {
					return numTrimmedByZeros === numStr || sign + numTrimmedByZeros === numStr ? num : str;
				} else {
					return trimmedStr === numStr || trimmedStr === sign + numStr ? num : str;
				}
			}
		} else {
			return str;
		}
	}
}
function trimZeros(numStr) {
	if (numStr && numStr.indexOf(".") !== -1) {
		numStr = numStr.replace(/0+$/, "");
		if (numStr === ".") numStr = "0";
		else if (numStr[0] === ".") numStr = "0" + numStr;
		else if (numStr[numStr.length - 1] === ".") numStr = numStr.substr(0, numStr.length - 1);
		return numStr;
	}
	return numStr;
}
function parse_int(numStr, base) {
	if (parseInt) return parseInt(numStr, base);
	else if (Number.parseInt) return Number.parseInt(numStr, base);
	else if (window && window.parseInt) return window.parseInt(numStr, base);
	else throw new Error("parseInt, Number.parseInt, window.parseInt are not supported");
}

// node_modules/fast-xml-parser/src/ignoreAttributes.js
function getIgnoreAttributesFn(ignoreAttributes) {
	if (typeof ignoreAttributes === "function") {
		return ignoreAttributes;
	}
	if (Array.isArray(ignoreAttributes)) {
		return (attrName) => {
			for (const pattern of ignoreAttributes) {
				if (typeof pattern === "string" && attrName === pattern) {
					return true;
				}
				if (pattern instanceof RegExp && pattern.test(attrName)) {
					return true;
				}
			}
		};
	}
	return () => false;
}

// node_modules/fast-xml-parser/src/xmlparser/OrderedObjParser.js
class OrderedObjParser {
	constructor(options) {
		this.options = options;
		this.currentNode = null;
		this.tagsNodeStack = [];
		this.docTypeEntities = {};
		this.lastEntities = {
			apos: { regex: /&(apos|#39|#x27);/g, val: "'" },
			gt: { regex: /&(gt|#62|#x3E);/g, val: ">" },
			lt: { regex: /&(lt|#60|#x3C);/g, val: "<" },
			quot: { regex: /&(quot|#34|#x22);/g, val: '"' },
		};
		this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" };
		this.htmlEntities = {
			space: { regex: /&(nbsp|#160);/g, val: " " },
			cent: { regex: /&(cent|#162);/g, val: "¢" },
			pound: { regex: /&(pound|#163);/g, val: "£" },
			yen: { regex: /&(yen|#165);/g, val: "¥" },
			euro: { regex: /&(euro|#8364);/g, val: "€" },
			copyright: { regex: /&(copy|#169);/g, val: "©" },
			reg: { regex: /&(reg|#174);/g, val: "®" },
			inr: { regex: /&(inr|#8377);/g, val: "₹" },
			num_dec: { regex: /&#([0-9]{1,7});/g, val: (_, str) => String.fromCodePoint(Number.parseInt(str, 10)) },
			num_hex: { regex: /&#x([0-9a-fA-F]{1,6});/g, val: (_, str) => String.fromCodePoint(Number.parseInt(str, 16)) },
		};
		this.addExternalEntities = addExternalEntities;
		this.parseXml = parseXml;
		this.parseTextData = parseTextData;
		this.resolveNameSpace = resolveNameSpace;
		this.buildAttributesMap = buildAttributesMap;
		this.isItStopNode = isItStopNode;
		this.replaceEntitiesValue = replaceEntitiesValue;
		this.readStopNodeData = readStopNodeData;
		this.saveTextToParentTag = saveTextToParentTag;
		this.addChild = addChild;
		this.ignoreAttributesFn = getIgnoreAttributesFn(this.options.ignoreAttributes);
	}
}
function addExternalEntities(externalEntities) {
	const entKeys = Object.keys(externalEntities);
	for (let i = 0; i < entKeys.length; i++) {
		const ent = entKeys[i];
		this.lastEntities[ent] = {
			regex: new RegExp("&" + ent + ";", "g"),
			val: externalEntities[ent],
		};
	}
}
function parseTextData(val, tagName, jPath, dontTrim, hasAttributes, isLeafNode, escapeEntities) {
	if (val !== undefined) {
		if (this.options.trimValues && !dontTrim) {
			val = val.trim();
		}
		if (val.length > 0) {
			if (!escapeEntities) val = this.replaceEntitiesValue(val);
			const newval = this.options.tagValueProcessor(tagName, val, jPath, hasAttributes, isLeafNode);
			if (newval === null || newval === undefined) {
				return val;
			} else if (typeof newval !== typeof val || newval !== val) {
				return newval;
			} else if (this.options.trimValues) {
				return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
			} else {
				const trimmedVal = val.trim();
				if (trimmedVal === val) {
					return parseValue(val, this.options.parseTagValue, this.options.numberParseOptions);
				} else {
					return val;
				}
			}
		}
	}
}
function resolveNameSpace(tagname) {
	if (this.options.removeNSPrefix) {
		const tags = tagname.split(":");
		const prefix = tagname.charAt(0) === "/" ? "/" : "";
		if (tags[0] === "xmlns") {
			return "";
		}
		if (tags.length === 2) {
			tagname = prefix + tags[1];
		}
	}
	return tagname;
}
var attrsRegx = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
function buildAttributesMap(attrStr, jPath, tagName) {
	if (this.options.ignoreAttributes !== true && typeof attrStr === "string") {
		const matches = getAllMatches(attrStr, attrsRegx);
		const len = matches.length;
		const attrs = {};
		for (let i = 0; i < len; i++) {
			const attrName = this.resolveNameSpace(matches[i][1]);
			if (this.ignoreAttributesFn(attrName, jPath)) {
				continue;
			}
			let oldVal = matches[i][4];
			let aName = this.options.attributeNamePrefix + attrName;
			if (attrName.length) {
				if (this.options.transformAttributeName) {
					aName = this.options.transformAttributeName(aName);
				}
				if (aName === "__proto__") aName = "#__proto__";
				if (oldVal !== undefined) {
					if (this.options.trimValues) {
						oldVal = oldVal.trim();
					}
					oldVal = this.replaceEntitiesValue(oldVal);
					const newVal = this.options.attributeValueProcessor(attrName, oldVal, jPath);
					if (newVal === null || newVal === undefined) {
						attrs[aName] = oldVal;
					} else if (typeof newVal !== typeof oldVal || newVal !== oldVal) {
						attrs[aName] = newVal;
					} else {
						attrs[aName] = parseValue(oldVal, this.options.parseAttributeValue, this.options.numberParseOptions);
					}
				} else if (this.options.allowBooleanAttributes) {
					attrs[aName] = true;
				}
			}
		}
		if (!Object.keys(attrs).length) {
			return;
		}
		if (this.options.attributesGroupName) {
			const attrCollection = {};
			attrCollection[this.options.attributesGroupName] = attrs;
			return attrCollection;
		}
		return attrs;
	}
}
var parseXml = function (xmlData) {
	xmlData = xmlData.replace(
		/\r\n?/g,
		`
`
	);
	const xmlObj = new XmlNode("!xml");
	let currentNode = xmlObj;
	let textData = "";
	let jPath = "";
	for (let i = 0; i < xmlData.length; i++) {
		const ch = xmlData[i];
		if (ch === "<") {
			if (xmlData[i + 1] === "/") {
				const closeIndex = findClosingIndex(xmlData, ">", i, "Closing Tag is not closed.");
				let tagName = xmlData.substring(i + 2, closeIndex).trim();
				if (this.options.removeNSPrefix) {
					const colonIndex = tagName.indexOf(":");
					if (colonIndex !== -1) {
						tagName = tagName.substr(colonIndex + 1);
					}
				}
				if (this.options.transformTagName) {
					tagName = this.options.transformTagName(tagName);
				}
				if (currentNode) {
					textData = this.saveTextToParentTag(textData, currentNode, jPath);
				}
				const lastTagName = jPath.substring(jPath.lastIndexOf(".") + 1);
				if (tagName && this.options.unpairedTags.indexOf(tagName) !== -1) {
					throw new Error(`Unpaired tag can not be used as closing tag: </${tagName}>`);
				}
				let propIndex = 0;
				if (lastTagName && this.options.unpairedTags.indexOf(lastTagName) !== -1) {
					propIndex = jPath.lastIndexOf(".", jPath.lastIndexOf(".") - 1);
					this.tagsNodeStack.pop();
				} else {
					propIndex = jPath.lastIndexOf(".");
				}
				jPath = jPath.substring(0, propIndex);
				currentNode = this.tagsNodeStack.pop();
				textData = "";
				i = closeIndex;
			} else if (xmlData[i + 1] === "?") {
				let tagData = readTagExp(xmlData, i, false, "?>");
				if (!tagData) throw new Error("Pi Tag is not closed.");
				textData = this.saveTextToParentTag(textData, currentNode, jPath);
				if ((this.options.ignoreDeclaration && tagData.tagName === "?xml") || this.options.ignorePiTags) {
				} else {
					const childNode = new XmlNode(tagData.tagName);
					childNode.add(this.options.textNodeName, "");
					if (tagData.tagName !== tagData.tagExp && tagData.attrExpPresent) {
						childNode[":@"] = this.buildAttributesMap(tagData.tagExp, jPath, tagData.tagName);
					}
					this.addChild(currentNode, childNode, jPath, i);
				}
				i = tagData.closeIndex + 1;
			} else if (xmlData.substr(i + 1, 3) === "!--") {
				const endIndex = findClosingIndex(xmlData, "-->", i + 4, "Comment is not closed.");
				if (this.options.commentPropName) {
					const comment = xmlData.substring(i + 4, endIndex - 2);
					textData = this.saveTextToParentTag(textData, currentNode, jPath);
					currentNode.add(this.options.commentPropName, [{ [this.options.textNodeName]: comment }]);
				}
				i = endIndex;
			} else if (xmlData.substr(i + 1, 2) === "!D") {
				const result = readDocType(xmlData, i);
				this.docTypeEntities = result.entities;
				i = result.i;
			} else if (xmlData.substr(i + 1, 2) === "![") {
				const closeIndex = findClosingIndex(xmlData, "]]>", i, "CDATA is not closed.") - 2;
				const tagExp = xmlData.substring(i + 9, closeIndex);
				textData = this.saveTextToParentTag(textData, currentNode, jPath);
				let val = this.parseTextData(tagExp, currentNode.tagname, jPath, false);
				if (val == undefined) val = "";
				if (this.options.cdataPropName) {
					currentNode.add(this.options.cdataPropName, [{ [this.options.textNodeName]: tagExp }]);
				} else {
					currentNode.add(this.options.textNodeName, val);
				}
				i = closeIndex + 2;
			} else {
				let result = readTagExp(xmlData, i, this.options.removeNSPrefix);
				let tagName = result.tagName;
				const rawTagName = result.rawTagName;
				let tagExp = result.tagExp;
				let attrExpPresent = result.attrExpPresent;
				let closeIndex = result.closeIndex;
				if (this.options.transformTagName) {
					tagName = this.options.transformTagName(tagName);
				}
				if (currentNode && textData) {
					if (currentNode.tagname !== "!xml") {
						textData = this.saveTextToParentTag(textData, currentNode, jPath, false);
					}
				}
				const lastTag = currentNode;
				if (lastTag && this.options.unpairedTags.indexOf(lastTag.tagname) !== -1) {
					currentNode = this.tagsNodeStack.pop();
					jPath = jPath.substring(0, jPath.lastIndexOf("."));
				}
				if (tagName !== xmlObj.tagname) {
					jPath += jPath ? "." + tagName : tagName;
				}
				const startIndex = i;
				if (this.isItStopNode(this.options.stopNodes, jPath, tagName)) {
					let tagContent = "";
					if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
						if (tagName[tagName.length - 1] === "/") {
							tagName = tagName.substr(0, tagName.length - 1);
							jPath = jPath.substr(0, jPath.length - 1);
							tagExp = tagName;
						} else {
							tagExp = tagExp.substr(0, tagExp.length - 1);
						}
						i = result.closeIndex;
					} else if (this.options.unpairedTags.indexOf(tagName) !== -1) {
						i = result.closeIndex;
					} else {
						const result2 = this.readStopNodeData(xmlData, rawTagName, closeIndex + 1);
						if (!result2) throw new Error(`Unexpected end of ${rawTagName}`);
						i = result2.i;
						tagContent = result2.tagContent;
					}
					const childNode = new XmlNode(tagName);
					if (tagName !== tagExp && attrExpPresent) {
						childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
					}
					if (tagContent) {
						tagContent = this.parseTextData(tagContent, tagName, jPath, attrExpPresent);
					}
					jPath = jPath.substr(0, jPath.lastIndexOf("."));
					childNode.add(this.options.textNodeName, tagContent);
					this.addChild(currentNode, childNode, jPath, startIndex);
				} else {
					if (tagExp.length > 0 && tagExp.lastIndexOf("/") === tagExp.length - 1) {
						if (tagName[tagName.length - 1] === "/") {
							tagName = tagName.substr(0, tagName.length - 1);
							jPath = jPath.substr(0, jPath.length - 1);
							tagExp = tagName;
						} else {
							tagExp = tagExp.substr(0, tagExp.length - 1);
						}
						if (this.options.transformTagName) {
							tagName = this.options.transformTagName(tagName);
						}
						const childNode = new XmlNode(tagName);
						if (tagName !== tagExp && attrExpPresent) {
							childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
						}
						this.addChild(currentNode, childNode, jPath, startIndex);
						jPath = jPath.substr(0, jPath.lastIndexOf("."));
					} else {
						const childNode = new XmlNode(tagName);
						this.tagsNodeStack.push(currentNode);
						if (tagName !== tagExp && attrExpPresent) {
							childNode[":@"] = this.buildAttributesMap(tagExp, jPath, tagName);
						}
						this.addChild(currentNode, childNode, jPath, startIndex);
						currentNode = childNode;
					}
					textData = "";
					i = closeIndex;
				}
			}
		} else {
			textData += xmlData[i];
		}
	}
	return xmlObj.child;
};
function addChild(currentNode, childNode, jPath, startIndex) {
	if (!this.options.captureMetaData) startIndex = undefined;
	const result = this.options.updateTag(childNode.tagname, jPath, childNode[":@"]);
	if (result === false) {
	} else if (typeof result === "string") {
		childNode.tagname = result;
		currentNode.addChild(childNode, startIndex);
	} else {
		currentNode.addChild(childNode, startIndex);
	}
}
var replaceEntitiesValue = function (val) {
	if (this.options.processEntities) {
		for (let entityName in this.docTypeEntities) {
			const entity = this.docTypeEntities[entityName];
			val = val.replace(entity.regx, entity.val);
		}
		for (let entityName in this.lastEntities) {
			const entity = this.lastEntities[entityName];
			val = val.replace(entity.regex, entity.val);
		}
		if (this.options.htmlEntities) {
			for (let entityName in this.htmlEntities) {
				const entity = this.htmlEntities[entityName];
				val = val.replace(entity.regex, entity.val);
			}
		}
		val = val.replace(this.ampEntity.regex, this.ampEntity.val);
	}
	return val;
};
function saveTextToParentTag(textData, currentNode, jPath, isLeafNode) {
	if (textData) {
		if (isLeafNode === undefined) isLeafNode = currentNode.child.length === 0;
		textData = this.parseTextData(textData, currentNode.tagname, jPath, false, currentNode[":@"] ? Object.keys(currentNode[":@"]).length !== 0 : false, isLeafNode);
		if (textData !== undefined && textData !== "") currentNode.add(this.options.textNodeName, textData);
		textData = "";
	}
	return textData;
}
function isItStopNode(stopNodes, jPath, currentTagName) {
	const allNodesExp = "*." + currentTagName;
	for (const stopNodePath in stopNodes) {
		const stopNodeExp = stopNodes[stopNodePath];
		if (allNodesExp === stopNodeExp || jPath === stopNodeExp) return true;
	}
	return false;
}
function tagExpWithClosingIndex(xmlData, i, closingChar = ">") {
	let attrBoundary;
	let tagExp = "";
	for (let index = i; index < xmlData.length; index++) {
		let ch = xmlData[index];
		if (attrBoundary) {
			if (ch === attrBoundary) attrBoundary = "";
		} else if (ch === '"' || ch === "'") {
			attrBoundary = ch;
		} else if (ch === closingChar[0]) {
			if (closingChar[1]) {
				if (xmlData[index + 1] === closingChar[1]) {
					return {
						data: tagExp,
						index,
					};
				}
			} else {
				return {
					data: tagExp,
					index,
				};
			}
		} else if (ch === "\t") {
			ch = " ";
		}
		tagExp += ch;
	}
}
function findClosingIndex(xmlData, str, i, errMsg) {
	const closingIndex = xmlData.indexOf(str, i);
	if (closingIndex === -1) {
		throw new Error(errMsg);
	} else {
		return closingIndex + str.length - 1;
	}
}
function readTagExp(xmlData, i, removeNSPrefix, closingChar = ">") {
	const result = tagExpWithClosingIndex(xmlData, i + 1, closingChar);
	if (!result) return;
	let tagExp = result.data;
	const closeIndex = result.index;
	const separatorIndex = tagExp.search(/\s/);
	let tagName = tagExp;
	let attrExpPresent = true;
	if (separatorIndex !== -1) {
		tagName = tagExp.substring(0, separatorIndex);
		tagExp = tagExp.substring(separatorIndex + 1).trimStart();
	}
	const rawTagName = tagName;
	if (removeNSPrefix) {
		const colonIndex = tagName.indexOf(":");
		if (colonIndex !== -1) {
			tagName = tagName.substr(colonIndex + 1);
			attrExpPresent = tagName !== result.data.substr(colonIndex + 1);
		}
	}
	return {
		tagName,
		tagExp,
		closeIndex,
		attrExpPresent,
		rawTagName,
	};
}
function readStopNodeData(xmlData, tagName, i) {
	const startIndex = i;
	let openTagCount = 1;
	for (; i < xmlData.length; i++) {
		if (xmlData[i] === "<") {
			if (xmlData[i + 1] === "/") {
				const closeIndex = findClosingIndex(xmlData, ">", i, `${tagName} is not closed`);
				let closeTagName = xmlData.substring(i + 2, closeIndex).trim();
				if (closeTagName === tagName) {
					openTagCount--;
					if (openTagCount === 0) {
						return {
							tagContent: xmlData.substring(startIndex, i),
							i: closeIndex,
						};
					}
				}
				i = closeIndex;
			} else if (xmlData[i + 1] === "?") {
				const closeIndex = findClosingIndex(xmlData, "?>", i + 1, "StopNode is not closed.");
				i = closeIndex;
			} else if (xmlData.substr(i + 1, 3) === "!--") {
				const closeIndex = findClosingIndex(xmlData, "-->", i + 3, "StopNode is not closed.");
				i = closeIndex;
			} else if (xmlData.substr(i + 1, 2) === "![") {
				const closeIndex = findClosingIndex(xmlData, "]]>", i, "StopNode is not closed.") - 2;
				i = closeIndex;
			} else {
				const tagData = readTagExp(xmlData, i, ">");
				if (tagData) {
					const openTagName = tagData && tagData.tagName;
					if (openTagName === tagName && tagData.tagExp[tagData.tagExp.length - 1] !== "/") {
						openTagCount++;
					}
					i = tagData.closeIndex;
				}
			}
		}
	}
}
function parseValue(val, shouldParse, options) {
	if (shouldParse && typeof val === "string") {
		const newval = val.trim();
		if (newval === "true") return true;
		else if (newval === "false") return false;
		else return toNumber(val, options);
	} else {
		if (isExist(val)) {
			return val;
		} else {
			return "";
		}
	}
}

// node_modules/fast-xml-parser/src/xmlparser/node2json.js
var METADATA_SYMBOL2 = XmlNode.getMetaDataSymbol();
function prettify(node, options) {
	return compress(node, options);
}
function compress(arr, options, jPath) {
	let text;
	const compressedObj = {};
	for (let i = 0; i < arr.length; i++) {
		const tagObj = arr[i];
		const property = propName(tagObj);
		let newJpath = "";
		if (jPath === undefined) newJpath = property;
		else newJpath = jPath + "." + property;
		if (property === options.textNodeName) {
			if (text === undefined) text = tagObj[property];
			else text += "" + tagObj[property];
		} else if (property === undefined) {
			continue;
		} else if (tagObj[property]) {
			let val = compress(tagObj[property], options, newJpath);
			const isLeaf = isLeafTag(val, options);
			if (tagObj[METADATA_SYMBOL2] !== undefined) {
				val[METADATA_SYMBOL2] = tagObj[METADATA_SYMBOL2];
			}
			if (tagObj[":@"]) {
				assignAttributes(val, tagObj[":@"], newJpath, options);
			} else if (Object.keys(val).length === 1 && val[options.textNodeName] !== undefined && !options.alwaysCreateTextNode) {
				val = val[options.textNodeName];
			} else if (Object.keys(val).length === 0) {
				if (options.alwaysCreateTextNode) val[options.textNodeName] = "";
				else val = "";
			}
			if (compressedObj[property] !== undefined && compressedObj.hasOwnProperty(property)) {
				if (!Array.isArray(compressedObj[property])) {
					compressedObj[property] = [compressedObj[property]];
				}
				compressedObj[property].push(val);
			} else {
				if (options.isArray(property, newJpath, isLeaf)) {
					compressedObj[property] = [val];
				} else {
					compressedObj[property] = val;
				}
			}
		}
	}
	if (typeof text === "string") {
		if (text.length > 0) compressedObj[options.textNodeName] = text;
	} else if (text !== undefined) compressedObj[options.textNodeName] = text;
	return compressedObj;
}
function propName(obj) {
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (key !== ":@") return key;
	}
}
function assignAttributes(obj, attrMap, jpath, options) {
	if (attrMap) {
		const keys = Object.keys(attrMap);
		const len = keys.length;
		for (let i = 0; i < len; i++) {
			const atrrName = keys[i];
			if (options.isArray(atrrName, jpath + "." + atrrName)) {
				obj[atrrName] = [attrMap[atrrName]];
			} else {
				obj[atrrName] = attrMap[atrrName];
			}
		}
	}
}
function isLeafTag(obj, options) {
	const { textNodeName } = options;
	const propCount = Object.keys(obj).length;
	if (propCount === 0) {
		return true;
	}
	if (propCount === 1 && (obj[textNodeName] || typeof obj[textNodeName] === "boolean" || obj[textNodeName] === 0)) {
		return true;
	}
	return false;
}

// node_modules/fast-xml-parser/src/xmlparser/XMLParser.js
class XMLParser {
	constructor(options) {
		this.externalEntities = {};
		this.options = buildOptions(options);
	}
	parse(xmlData, validationOption) {
		if (typeof xmlData === "string") {
		} else if (xmlData.toString) {
			xmlData = xmlData.toString();
		} else {
			throw new Error("XML data is accepted in String or Bytes[] form.");
		}
		if (validationOption) {
			if (validationOption === true) validationOption = {};
			const result = validate(xmlData, validationOption);
			if (result !== true) {
				throw Error(`${result.err.msg}:${result.err.line}:${result.err.col}`);
			}
		}
		const orderedObjParser = new OrderedObjParser(this.options);
		orderedObjParser.addExternalEntities(this.externalEntities);
		const orderedResult = orderedObjParser.parseXml(xmlData);
		if (this.options.preserveOrder || orderedResult === undefined) return orderedResult;
		else return prettify(orderedResult, this.options);
	}
	addEntity(key, value) {
		if (value.indexOf("&") !== -1) {
			throw new Error("Entity value can't have '&'");
		} else if (key.indexOf("&") !== -1 || key.indexOf(";") !== -1) {
			throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
		} else if (value === "&") {
			throw new Error("An entity with value '&' is not permitted");
		} else {
			this.externalEntities[key] = value;
		}
	}
	static getMetaDataSymbol() {
		return XmlNode.getMetaDataSymbol();
	}
}

// src/utils/xml-parser.ts
var xmlParser = new XMLParser();

// src/sams/match-series.ts
var SeasonSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});
var MatchSeriesSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string(),
	season: SeasonSchema,
	hierarchy: z.unknown(),
});
var MatchSeriesListSchema = z.object({
	matchSeries: z.array(MatchSeriesSchema),
});
var MatchSeriesResponseSchema = z.object({
	matchSeriesList: MatchSeriesListSchema,
});
async function matchSeries(props) {
	try {
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		let optionalParams = "";
		if (props?.seasonId) optionalParams += `&seasonId=${props.seasonId}`;
		const api = await fetch(`${serverUrl}/xml/matchSeries.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = MatchSeriesResponseSchema.parse(json).matchSeriesList.matchSeries;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching match series:", error);
		throw error;
	}
}

// src/sams/matches.ts
var TeamInMatchSchema = z.object({
	id: z.number().optional(),
	uuid: z.string().optional(),
	name: z.string().optional(),
	shortName: z.string().optional(),
	club: z.object({
		name: z.string().optional(),
		shortName: z.string().optional(),
	}),
});
var HostSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	club: z.string(),
});
var LocationSchema = z.object({
	id: z.number(),
	name: z.string(),
	street: z.string(),
	extraField: z.string(),
	postalCode: z.union([z.number(), z.string()]),
	city: z.string(),
	note: z.string(),
});
var MatchSeriesSchema2 = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string(),
	season: z.object({
		name: z.string(),
	}),
	hierarchy: z
		.object({
			hierarchyLevel: z.number(),
		})
		.optional(),
	fullHierarchy: z.object({}).optional(),
	association: z.object({}).optional(),
});
var ResultsSchema = z.object({
	winner: z.number(),
	setPoints: z.string(),
	ballPoints: z.string(),
	sets: z.object({}).optional(),
	verified: z.boolean(),
});
var MatchSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	number: z.number(),
	date: z.string(),
	time: z.string(),
	delayPossible: z.boolean(),
	decidingMatch: z.boolean(),
	indefinitelyRescheduled: z.boolean(),
	gameReassessed: z.boolean(),
	host: HostSchema,
	team: z.array(TeamInMatchSchema),
	matchSeries: MatchSeriesSchema2,
	location: LocationSchema,
	referees: z.object({
		referee: z.array(z.object({})).optional(),
	}),
	results: ResultsSchema,
	spectators: z.number(),
	netDuration: z.number(),
});
var MatchesSchema = z.object({
	match: z.array(MatchSchema),
});
var MatchesResponseSchema = z.object({
	matches: MatchesSchema,
});
var DatePropSchema = z.string().refine((value) => /^\d{2}\.\d{2}\.\d{4}$/.test(value) || /^\d{4}-\d{2}-\d{2}$/.test(value), {
	message: "Date must be in 'tt.mm.jjjj' or 'jjjj-mm-tt' format",
});
async function matches(props) {
	try {
		if (!props.matchSeriesId && !props.allSeasonMatchSeriesId) throw "Either matchSeriesId or allSeasonMatchSeriesId is required!";
		const before = props.before ? DatePropSchema.parse(props.before) : undefined;
		const after = props.after ? DatePropSchema.parse(props.after) : undefined;
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		let optionalParams = "";
		if (props?.matchSeriesId) optionalParams += `&matchSeriesId=${props.matchSeriesId}`;
		if (props?.allSeasonMatchSeriesId) optionalParams += `&allSeasonMatchSeriesId=${props.allSeasonMatchSeriesId}`;
		if (props?.teamId) optionalParams += `&teamId=${props.teamId}`;
		if (before) optionalParams += `&before=${before}`;
		if (after) optionalParams += `&after=${after}`;
		if (props?.past) optionalParams += `&past=true`;
		if (props?.future) optionalParams += `&future=true`;
		if (props?.limit) optionalParams += `&limit=${props.limit}`;
		const api = await fetch(`${serverUrl}/xml/matches.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = MatchesResponseSchema.parse(json).matches.match;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching matches:", error);
		throw error;
	}
}
matches({ allSeasonMatchSeriesId: "42b97d58-e625-c49d-468c-8804db710db3" }).then((data) => Bun.write("./examples/matches.json", JSON.stringify(data, null, 2)));

// src/sams/rankings.ts
var LogoSchema = z.object({
	url: z.string(),
});
var ClubSchema = z.object({
	name: z.string(),
	shortName: z.string(),
	id: z.number().optional(),
	logo: LogoSchema.optional(),
	www: z.string().optional(),
	wwwDepartment: z.string().optional(),
});
var HierarchyItemSchema = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string(),
	hierarchyLevel: z.number(),
});
var FullHierarchySchema = z.object({
	hierarchy: z.array(HierarchyItemSchema),
});
var AssociationSchema = z.object({
	name: z.string(),
	shortName: z.string(),
});
var SeasonSchema2 = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});
var TeamInfoSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	club: ClubSchema,
});
var MatchResultSchema = z.object({
	result: z.string(),
	count: z.number(),
});
var ResultTypesSchema = z.object({
	matchResult: z.array(MatchResultSchema),
});
var MatchSeriesDetailsSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string(),
	season: SeasonSchema2,
	hierarchy: HierarchyItemSchema,
	fullHierarchy: FullHierarchySchema,
	association: AssociationSchema,
});
var RankingSchema = z.object({
	team: TeamInfoSchema,
	place: z.number(),
	matchesPlayed: z.number(),
	wins: z.number(),
	losses: z.number(),
	points: z.number(),
	setPoints: z.string(),
	setWinScore: z.number(),
	setLoseScore: z.number(),
	setPointDifference: z.number(),
	setQuotient: z.string(),
	ballPoints: z.string(),
	ballWinScore: z.number(),
	ballLoseScore: z.number(),
	ballPointDifference: z.number(),
	ballQuotient: z.string(),
	resultTypes: ResultTypesSchema,
});
var RankingsSchemaContent = z.object({
	matchSeries: MatchSeriesDetailsSchema,
	ranking: z.array(RankingSchema),
});
var RankingsResponseSchema = z.object({
	rankings: RankingsSchemaContent,
});
async function rankings(props) {
	try {
		if (!props.matchSeriesId && !props.allSeasonMatchSeriesId) throw "Either matchSeriesId or allSeasonMatchSeriesId is required!";
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		let optionalParams = "";
		if (props?.matchSeriesId) optionalParams += `&matchSeriesId=${props.matchSeriesId}`;
		if (props?.allSeasonMatchSeriesId) optionalParams += `&allSeasonMatchSeriesId=${props.allSeasonMatchSeriesId}`;
		const api = await fetch(`${serverUrl}/xml/rankings.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = RankingsResponseSchema.parse(json).rankings;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching rankings:", error);
		throw error;
	}
}

// src/sams/seasons.ts
var SeasonSchema3 = z.object({
	id: z.number(),
	name: z.string(),
	begin: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});
var SeasonsResponseSchema = z.object({
	seasons: z.object({
		season: z.array(SeasonSchema3),
	}),
});
async function seasons(props) {
	try {
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		const api = await fetch(`${serverUrl}/xml/seasons.xhtml?apiKey=${apiKey}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = SeasonsResponseSchema.parse(json).seasons.season;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching seasons:", error);
		throw error;
	}
}

// src/sams/sportsclub.ts
var LogoSchema2 = z.object({
	url: z.string().url(),
	filename: z.string().optional(),
	createDate: z.string().optional(),
});
var AddressSchema = z.object({
	postbox: z.string(),
	street: z.string(),
	extraField: z.string(),
	postcode: z.union([z.string(), z.number()]),
	city: z.string(),
	region: z.string(),
	country: z.string(),
});
var AssociationSchema2 = z.object({
	name: z.string().optional(),
	shortName: z.string().optional(),
});
var HierarchyItemSchema2 = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string(),
	hierarchyLevel: z.number(),
});
var SeasonSchema4 = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});
var FullHierarchySchema2 = z.object({
	hierarchy: z.array(HierarchyItemSchema2),
});
var MatchSeriesSchema3 = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string().optional(),
	season: SeasonSchema4,
	hierarchy: HierarchyItemSchema2,
	fullHierarchy: FullHierarchySchema2,
	association: AssociationSchema2,
});
var ClubSchema2 = z.object({
	name: z.string(),
	id: z.number(),
	shortName: z.string(),
	logo: LogoSchema2,
	www: z.string(),
	wwwDepartment: z.string(),
});
var TeamSchema = z.object({
	id: z.number(),
	uuid: z.string(),
	seasonTeamId: z.number(),
	placeCipher: z.number(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	status: z.string(),
	www: z.string(),
	logo: LogoSchema2,
	club: ClubSchema2,
	matchSeries: MatchSeriesSchema3,
});
var TeamsSchema = z.object({
	team: z.array(TeamSchema),
});
var MatchOperationCompanySchema = z.object({
	id: z.string(),
	name: z.string(),
	address: AddressSchema,
	homepage: z.string(),
});
var LocationSchema2 = z.object({
	id: z.number(),
	name: z.string(),
	address: AddressSchema,
	homepage: z.string(),
});
var LocationsSchema = z.object({
	main: LocationSchema2,
});
var SportsclubSchema = z.object({
	id: z.number(),
	name: z.string(),
	logo: LogoSchema2,
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: AssociationSchema2.optional(),
	matchOperationCompany: MatchOperationCompanySchema,
	teams: TeamsSchema,
	locations: LocationsSchema,
});
var SportsclubResponseSchema = z.object({
	sportsclub: SportsclubSchema,
});
async function sportsclub(props) {
	try {
		if (!props.sportsclubId) throw "sportsclubId is required!";
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		let requiredParams = "";
		if (props?.sportsclubId) requiredParams += `&sportsclubId=${props.sportsclubId}`;
		const api = await fetch(`${serverUrl}/xml/sportsclub.xhtml?apiKey=${apiKey}${requiredParams}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = SportsclubResponseSchema.parse(json).sportsclub;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclub:", error);
		throw error;
	}
}

// src/sams/sportsclub-list.ts
var SportsClubSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	lsbNumber: z.union([z.string(), z.number()]).optional(),
	internalSportsclubId: z.union([z.string(), z.number()]).optional(),
	association: z
		.object({
			id: z.number().optional(),
			name: z.string().optional(),
		})
		.optional(),
});
var SportsClubArraySchema = z.array(SportsClubSchema);
var SportsClubResponseSchema = z.object({
	sportsclubs: z.object({
		sportsclub: SportsClubArraySchema,
	}),
});
async function sportsclubList(props) {
	try {
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		const api = await fetch(`${serverUrl}/xml/sportsclubList.xhtml?apiKey=${apiKey}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = SportsClubResponseSchema.parse(json).sportsclubs.sportsclub;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching sportsclubs:", error);
		throw error;
	}
}

// src/sams/teams.ts
var LogoSchema3 = z.object({
	url: z.string(),
});
var ClubSchema3 = z.object({
	name: z.string(),
	id: z.number(),
	shortName: z.string(),
	logo: LogoSchema3,
	www: z.string(),
	wwwDepartment: z.string(),
});
var HierarchyItemSchema3 = z.object({
	id: z.number(),
	name: z.string(),
	shortName: z.string(),
	hierarchyLevel: z.number(),
});
var FullHierarchySchema3 = z.object({
	hierarchy: z.array(HierarchyItemSchema3),
});
var AssociationSchema3 = z.object({
	name: z.string(),
	shortName: z.string(),
});
var SeasonSchema5 = z.object({
	id: z.number(),
	uuid: z.string(),
	name: z.string(),
});
var MatchSeriesDetailsSchema2 = z.object({
	id: z.number(),
	uuid: z.string(),
	allSeasonId: z.string(),
	name: z.string(),
	shortName: z.string(),
	type: z.string(),
	updated: z.string(),
	structureUpdated: z.string(),
	resultsUpdated: z.string(),
	season: SeasonSchema5,
	hierarchy: HierarchyItemSchema3,
	fullHierarchy: FullHierarchySchema3,
	association: AssociationSchema3,
});
var TeamSchema2 = z.object({
	id: z.number(),
	uuid: z.string(),
	seasonTeamId: z.number(),
	placeCipher: z.number(),
	name: z.string(),
	shortName: z.string(),
	clubCode: z.string(),
	status: z.string(),
	www: z.string(),
	logo: LogoSchema3,
	club: ClubSchema3,
	matchSeries: MatchSeriesDetailsSchema2,
});
var TeamsSchema2 = z.object({
	team: z.array(TeamSchema2),
});
var TeamsResponseSchema = z.object({
	teams: TeamsSchema2,
});
async function teams(props) {
	try {
		if (!props.matchSeriesId && !props.allSeasonMatchSeriesId) throw "Either matchSeriesId or allSeasonMatchSeriesId is required!";
		const { apiKey, serverUrl } = verifyCredentials(props?.apiKey, props?.serverUrl);
		let optionalParams = "";
		if (props?.matchSeriesId) optionalParams += `&matchSeriesId=${props.matchSeriesId}`;
		if (props?.allSeasonMatchSeriesId) optionalParams += `&allSeasonMatchSeriesId=${props.allSeasonMatchSeriesId}`;
		const api = await fetch(`${serverUrl}/xml/teams.xhtml?apiKey=${apiKey}${optionalParams}`);
		const xmlData = await api.text();
		if (xmlData.includes("<error>")) throw "Error fetching data from SAMS server.";
		const json = xmlParser.parse(xmlData);
		const validatedJson = TeamsResponseSchema.parse(json).teams.team;
		return validatedJson;
	} catch (error) {
		console.error("Error fetching teams:", error);
		throw error;
	}
}

// src/index.ts
var sams = { matchSeries, matches, seasons, teams, rankings, sportsclubList, sportsclub };
export { sams, SamsServers };
