import { string, succeed, andThen } from "./fable_modules/Thoth.Json.10.4.1/Decode.fs.js";
import { defaultOf, uncurry } from "./fable_modules/fable-library.4.0.0/Util.js";
import { Model$reflection, HabitCategory } from "./Model.fs.js";
import { newGuid } from "./fable_modules/fable-library.4.0.0/Guid.js";
import { add } from "./fable_modules/fable-library.4.0.0/Map.js";
import { Auto_generateBoxedEncoder_437914C6, toString, decimal } from "./fable_modules/Thoth.Json.10.4.1/./Encode.fs.js";
import { Auto_generateBoxedDecoder_Z6670B51, fromString, decimal as decimal_1 } from "./fable_modules/Thoth.Json.10.4.1/./Decode.fs.js";
import { empty } from "./fable_modules/Thoth.Json.10.4.1/Extra.fs.js";
import { ExtraCoders } from "./fable_modules/Thoth.Json.10.4.1/Types.fs.js";
import { toConsole } from "./fable_modules/fable-library.4.0.0/String.js";

function encodeHabitCategory(cat) {
    switch (cat.tag) {
        case 1: {
            return "Productivity";
        }
        case 2: {
            return "Learning";
        }
        case 3: {
            return "Personal";
        }
        case 4: {
            return cat.fields[0];
        }
        default: {
            return "Health";
        }
    }
}

const decodeHabitCategory = (path_1) => ((value_1) => andThen(uncurry(3, (_arg) => {
    if (_arg === "Health") {
        return (arg10$0040) => ((arg20$0040) => succeed(new HabitCategory(0, []), arg10$0040, arg20$0040));
    }
    else if (_arg === "Productivity") {
        return (arg10$0040_1) => ((arg20$0040_1) => succeed(new HabitCategory(1, []), arg10$0040_1, arg20$0040_1));
    }
    else if (_arg === "Learning") {
        return (arg10$0040_2) => ((arg20$0040_2) => succeed(new HabitCategory(2, []), arg10$0040_2, arg20$0040_2));
    }
    else if (_arg === "Personal") {
        return (arg10$0040_3) => ((arg20$0040_3) => succeed(new HabitCategory(3, []), arg10$0040_3, arg20$0040_3));
    }
    else {
        return (arg10$0040_4) => ((arg20$0040_4) => succeed(new HabitCategory(4, [_arg]), arg10$0040_4, arg20$0040_4));
    }
}), string, path_1, value_1));

export const extraCoders = (() => {
    let copyOfStruct, copyOfStruct_1;
    const extra_3 = new ExtraCoders((copyOfStruct = newGuid(), copyOfStruct), add("System.Decimal", [decimal, (path) => ((value_1) => decimal_1(path, value_1))], empty.Coders));
    return new ExtraCoders((copyOfStruct_1 = newGuid(), copyOfStruct_1), add("Model.HabitCategory", [encodeHabitCategory, decodeHabitCategory], extra_3.Coders));
})();

export function saveState(model) {
    localStorage.setItem("habitTrackerState", toString(4, Auto_generateBoxedEncoder_437914C6(Model$reflection(), void 0, extraCoders, void 0)(model)));
}

export function loadState() {
    const matchValue = localStorage.getItem("habitTrackerState");
    if (matchValue === defaultOf()) {
        return void 0;
    }
    else {
        const matchValue_1 = fromString(uncurry(2, Auto_generateBoxedDecoder_Z6670B51(Model$reflection(), void 0, extraCoders)), matchValue);
        if (matchValue_1.tag === 1) {
            toConsole(`Ошибка при декодировании: ${matchValue_1.fields[0]}`);
            return void 0;
        }
        else {
            return matchValue_1.fields[0];
        }
    }
}

