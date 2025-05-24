import { FSharpRef, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { Habit, Model, NewHabitForm as NewHabitForm_1, Page, Page$reflection } from "./Model.fs.js";
import { union_type, class_type, string_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";
import { exists, map, filter, cons, empty } from "./fable_modules/fable-library.4.0.0/List.js";
import { isNullOrWhiteSpace } from "./fable_modules/fable-library.4.0.0/String.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.0.0/Choice.js";
import { tryParse } from "./fable_modules/fable-library.4.0.0/Int32.js";
import { newGuid } from "./fable_modules/fable-library.4.0.0/Guid.js";
import { date as date_1, equals, utcNow } from "./fable_modules/fable-library.4.0.0/Date.js";

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NavigateTo", "UpdateTitle", "UpdateDescription", "UpdateTarget", "AddHabit", "DeleteHabit", "MarkHabitDone", "ToggleDarkMode", "NoOp"];
    }
}

export function Msg$reflection() {
    return union_type("Update.Msg", [], Msg, () => [[["Item", Page$reflection()]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", class_type("System.Guid")]], [["Item1", class_type("System.Guid")], ["Item2", class_type("System.DateTime")]], [], []]);
}

export function init() {
    return new Model(empty(), new Page(0, []), new NewHabitForm_1("", "", "", void 0), true);
}

export function validateHabit(title, description, target) {
    let n;
    if (isNullOrWhiteSpace(title)) {
        return new FSharpResult$2(1, ["Title cannot be empty"]);
    }
    else if (isNullOrWhiteSpace(description)) {
        return new FSharpResult$2(1, ["Description cannot be empty"]);
    }
    else {
        let matchValue;
        let outArg = 0;
        matchValue = [tryParse(target, 511, false, 32, new FSharpRef(() => outArg, (v) => {
            outArg = (v | 0);
        })), outArg];
        let matchResult;
        if (matchValue[0]) {
            if ((n = (matchValue[1] | 0), n > 0)) {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
        }
        else {
            matchResult = 1;
        }
        switch (matchResult) {
            case 0: {
                const n_1 = matchValue[1] | 0;
                return new FSharpResult$2(0, [n_1]);
            }
            case 1: {
                return new FSharpResult$2(1, ["Target must be a number greater than 0"]);
            }
        }
    }
}

export function update(msg, model) {
    switch (msg.tag) {
        case 1: {
            const title = msg.fields[0];
            let updatedForm;
            const inputRecord = model.NewHabitForm;
            updatedForm = (new NewHabitForm_1(title, inputRecord.Description, inputRecord.Target, inputRecord.Error));
            return new Model(model.Habits, model.CurrentPage, updatedForm, model.DarkMode);
        }
        case 2: {
            const desc = msg.fields[0];
            let updatedForm_1;
            const inputRecord_1 = model.NewHabitForm;
            updatedForm_1 = (new NewHabitForm_1(inputRecord_1.Title, desc, inputRecord_1.Target, inputRecord_1.Error));
            return new Model(model.Habits, model.CurrentPage, updatedForm_1, model.DarkMode);
        }
        case 3: {
            const target = msg.fields[0];
            let updatedForm_2;
            const inputRecord_2 = model.NewHabitForm;
            updatedForm_2 = (new NewHabitForm_1(inputRecord_2.Title, inputRecord_2.Description, target, inputRecord_2.Error));
            return new Model(model.Habits, model.CurrentPage, updatedForm_2, model.DarkMode);
        }
        case 4: {
            const form = model.NewHabitForm;
            const matchValue = validateHabit(form.Title, form.Description, form.Target);
            if (matchValue.tag === 1) {
                const msg_1 = matchValue.fields[0];
                const formWithError = new NewHabitForm_1(form.Title, form.Description, form.Target, msg_1);
                return new Model(model.Habits, model.CurrentPage, formWithError, model.DarkMode);
            }
            else {
                const target_1 = matchValue.fields[0] | 0;
                const newHabit = new Habit(newGuid(), form.Title, form.Description, target_1, empty(), utcNow());
                return new Model(cons(newHabit, model.Habits), model.CurrentPage, new NewHabitForm_1("", "", "", void 0), model.DarkMode);
            }
        }
        case 5: {
            const habitId = msg.fields[0];
            const updatedHabits = filter((h) => (h.Id !== habitId), model.Habits);
            return new Model(updatedHabits, model.CurrentPage, model.NewHabitForm, model.DarkMode);
        }
        case 6: {
            const habitId_1 = msg.fields[0];
            const date = msg.fields[1];
            const updatedHabits_1 = map((h_1) => {
                if (h_1.Id === habitId_1) {
                    if (exists((d) => equals(date_1(d), date_1(date)), h_1.Progress)) {
                        return h_1;
                    }
                    else {
                        return new Habit(h_1.Id, h_1.Title, h_1.Description, h_1.TargetPerWeek, cons(date, h_1.Progress), h_1.CreatedAt);
                    }
                }
                else {
                    return h_1;
                }
            }, model.Habits);
            return new Model(updatedHabits_1, model.CurrentPage, model.NewHabitForm, model.DarkMode);
        }
        case 7: {
            return new Model(model.Habits, model.CurrentPage, model.NewHabitForm, !model.DarkMode);
        }
        case 8: {
            return model;
        }
        default: {
            const page = msg.fields[0];
            return new Model(model.Habits, page, model.NewHabitForm, model.DarkMode);
        }
    }
}

