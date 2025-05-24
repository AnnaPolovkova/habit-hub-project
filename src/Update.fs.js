import { FSharpRef, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { Reminder, Habit, HabitCategory, Model, Achievement, StatsFilter as StatsFilter_2, TimeRange, NewHabitForm as NewHabitForm_1, Page, HabitCategory$reflection, TimeRange$reflection, Page$reflection } from "./Model.fs.js";
import { union_type, option_type, class_type, string_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";
import { isNullOrWhiteSpace } from "./fable_modules/fable-library.4.0.0/String.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.0.0/Choice.js";
import { tryParse } from "./fable_modules/fable-library.4.0.0/Int32.js";
import { length, tryFind, exists, map, filter, ofArray, empty, sortDescending, cons, head, tail, isEmpty } from "./fable_modules/fable-library.4.0.0/List.js";
import { utcNow, compare, addDays, date as date_2, equals } from "./fable_modules/fable-library.4.0.0/Date.js";
import { newGuid } from "./fable_modules/fable-library.4.0.0/Guid.js";
import { create } from "./fable_modules/fable-library.4.0.0/TimeSpan.js";
import { List_distinct } from "./fable_modules/fable-library.4.0.0/Seq2.js";
import { safeHash, equals as equals_1 } from "./fable_modules/fable-library.4.0.0/Util.js";

export class Msg extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["NavigateTo", "UpdateTitle", "UpdateDescription", "UpdateTarget", "UpdateCategory", "AddHabit", "DeleteHabit", "MarkHabitDone", "UnmarkHabitDone", "ToggleDarkMode", "ChangeStatsTimeRange", "FilterByCategory", "CheckAchievements", "ToggleReminder", "NoOp"];
    }
}

export function Msg$reflection() {
    return union_type("Update.Msg", [], Msg, () => [[["Item", Page$reflection()]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", class_type("System.Guid")]], [["Item1", class_type("System.Guid")], ["Item2", class_type("System.DateTime")]], [["Item1", class_type("System.Guid")], ["Item2", class_type("System.DateTime")]], [], [["Item", TimeRange$reflection()]], [["Item", option_type(HabitCategory$reflection())]], [], [["Item", class_type("System.Guid")]], []]);
}

export function validateHabit(title, description, target) {
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
            if (matchValue[1] > 0) {
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
                return new FSharpResult$2(0, [matchValue[1]]);
            }
            case 1: {
                return new FSharpResult$2(1, ["Target must be a number greater than 0"]);
            }
        }
    }
}

export function calculateStreak(progress) {
    if (isEmpty(progress)) {
        return 0;
    }
    else {
        const loop = (currentStreak_mut, dates_mut) => {
            loop:
            while (true) {
                const currentStreak = currentStreak_mut, dates = dates_mut;
                if (!isEmpty(dates)) {
                    if (!isEmpty(tail(dates))) {
                        if (equals(date_2(head(dates)), addDays(date_2(head(tail(dates))), 1))) {
                            currentStreak_mut = (currentStreak + 1);
                            dates_mut = cons(head(tail(dates)), tail(tail(dates)));
                            continue loop;
                        }
                        else {
                            return (currentStreak + 1) | 0;
                        }
                    }
                    else {
                        return (currentStreak + 1) | 0;
                    }
                }
                else {
                    return currentStreak | 0;
                }
                break;
            }
        };
        return loop(0, sortDescending(progress, {
            Compare: compare,
        })) | 0;
    }
}

export function init() {
    return new Model(empty(), new Page(0, []), new NewHabitForm_1("", "", "", "Health", void 0), true, new StatsFilter_2(new TimeRange(0, []), void 0), ofArray([new Achievement(newGuid(), "First Step", "Add your first habit", false, void 0), new Achievement(newGuid(), "Week Streak", "Complete a habit every day for a week", false, void 0), new Achievement(newGuid(), "Variety", "Have habits in 3 different categories", false, void 0)]), empty());
}

export function update(msg, model) {
    let inputRecord, inputRecord_1, inputRecord_2, inputRecord_3, r_1;
    let model_1;
    switch (msg.tag) {
        case 1: {
            model_1 = (new Model(model.Habits, model.CurrentPage, (inputRecord = model.NewHabitForm, new NewHabitForm_1(msg.fields[0], inputRecord.Description, inputRecord.Target, inputRecord.SelectedCategory, inputRecord.Error)), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 2: {
            model_1 = (new Model(model.Habits, model.CurrentPage, (inputRecord_1 = model.NewHabitForm, new NewHabitForm_1(inputRecord_1.Title, msg.fields[0], inputRecord_1.Target, inputRecord_1.SelectedCategory, inputRecord_1.Error)), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 3: {
            model_1 = (new Model(model.Habits, model.CurrentPage, (inputRecord_2 = model.NewHabitForm, new NewHabitForm_1(inputRecord_2.Title, inputRecord_2.Description, msg.fields[0], inputRecord_2.SelectedCategory, inputRecord_2.Error)), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 4: {
            model_1 = (new Model(model.Habits, model.CurrentPage, (inputRecord_3 = model.NewHabitForm, new NewHabitForm_1(inputRecord_3.Title, inputRecord_3.Description, inputRecord_3.Target, msg.fields[0], inputRecord_3.Error)), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 5: {
            const form = model.NewHabitForm;
            const matchValue = validateHabit(form.Title, form.Description, form.Target);
            if (matchValue.tag === 1) {
                model_1 = (new Model(model.Habits, model.CurrentPage, new NewHabitForm_1(form.Title, form.Description, form.Target, form.SelectedCategory, matchValue.fields[0]), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            }
            else {
                let category_1;
                const matchValue_1 = form.SelectedCategory;
                category_1 = ((matchValue_1 === "Health") ? (new HabitCategory(0, [])) : ((matchValue_1 === "Productivity") ? (new HabitCategory(1, [])) : ((matchValue_1 === "Learning") ? (new HabitCategory(2, [])) : ((matchValue_1 === "Personal") ? (new HabitCategory(3, [])) : (new HabitCategory(4, [matchValue_1]))))));
                model_1 = (new Model(cons(new Habit(newGuid(), form.Title, form.Description, matchValue.fields[0], empty(), utcNow(), category_1, 0), model.Habits), model.CurrentPage, new NewHabitForm_1("", "", "", "Health", void 0), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            }
            break;
        }
        case 6: {
            model_1 = (new Model(filter((h) => (h.Id !== msg.fields[0]), model.Habits), model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 7: {
            const date = msg.fields[1];
            model_1 = (new Model(map((h_1) => {
                if (h_1.Id === msg.fields[0]) {
                    if (exists((d) => equals(date_2(d), date_2(date)), h_1.Progress)) {
                        return h_1;
                    }
                    else {
                        const newProgress = cons(date, h_1.Progress);
                        return new Habit(h_1.Id, h_1.Title, h_1.Description, h_1.TargetPerWeek, newProgress, h_1.CreatedAt, h_1.Category, calculateStreak(newProgress));
                    }
                }
                else {
                    return h_1;
                }
            }, model.Habits), model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 8: {
            model_1 = (new Model(map((h_2) => {
                if (h_2.Id === msg.fields[0]) {
                    const newProgress_1 = filter((d_1) => (!equals(date_2(d_1), date_2(msg.fields[1]))), h_2.Progress);
                    return new Habit(h_2.Id, h_2.Title, h_2.Description, h_2.TargetPerWeek, newProgress_1, h_2.CreatedAt, h_2.Category, calculateStreak(newProgress_1));
                }
                else {
                    return h_2;
                }
            }, model.Habits), model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 9: {
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, !model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 10: {
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, new StatsFilter_2(msg.fields[0], model.StatsFilter.CategoryFilter), model.Achievements, model.Reminders));
            break;
        }
        case 11: {
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, new StatsFilter_2(model.StatsFilter.TimeRange, msg.fields[0]), model.Achievements, model.Reminders));
            break;
        }
        case 13: {
            const habitId_3 = msg.fields[0];
            const existingReminder = tryFind((r) => (r.HabitId === habitId_3), model.Reminders);
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, (existingReminder == null) ? cons(new Reminder(habitId_3, create(20, 0, 0), ofArray([1, 3, 5]), true), model.Reminders) : ((r_1 = existingReminder, map((rem) => {
                if (rem.HabitId === habitId_3) {
                    return new Reminder(rem.HabitId, rem.Time, rem.Days, !rem.IsActive);
                }
                else {
                    return rem;
                }
            }, model.Reminders)))));
            break;
        }
        case 12: {
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, map((a) => {
                const matchValue_2 = a.Title;
                let matchResult;
                if (matchValue_2 === "First Step") {
                    if (!a.IsUnlocked) {
                        matchResult = 0;
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else if (matchValue_2 === "Week Streak") {
                    if (!a.IsUnlocked) {
                        matchResult = 1;
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else if (matchValue_2 === "Variety") {
                    if (!a.IsUnlocked) {
                        matchResult = 2;
                    }
                    else {
                        matchResult = 3;
                    }
                }
                else {
                    matchResult = 3;
                }
                switch (matchResult) {
                    case 0: {
                        if (!isEmpty(model.Habits)) {
                            return new Achievement(a.Id, a.Title, a.Description, true, utcNow());
                        }
                        else {
                            return a;
                        }
                    }
                    case 1: {
                        if (exists((h_3) => (h_3.Streak >= 7), model.Habits)) {
                            return new Achievement(a.Id, a.Title, a.Description, true, utcNow());
                        }
                        else {
                            return a;
                        }
                    }
                    case 2: {
                        if (length(List_distinct(map((h_4) => h_4.Category, model.Habits), {
                            Equals: equals_1,
                            GetHashCode: safeHash,
                        })) >= 3) {
                            return new Achievement(a.Id, a.Title, a.Description, true, utcNow());
                        }
                        else {
                            return a;
                        }
                    }
                    case 3: {
                        return a;
                    }
                }
            }, model.Achievements), model.Reminders));
            break;
        }
        case 14: {
            model_1 = model;
            break;
        }
        default: {
            model_1 = (new Model(model.Habits, msg.fields[0], model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
        }
    }
    return new Model(model_1.Habits, model_1.CurrentPage, model_1.NewHabitForm, model_1.DarkMode, model_1.StatsFilter, map((a_1) => {
        const matchValue_3 = a_1.Title;
        let matchResult_1;
        if (matchValue_3 === "First Step") {
            if (!a_1.IsUnlocked) {
                matchResult_1 = 0;
            }
            else {
                matchResult_1 = 3;
            }
        }
        else if (matchValue_3 === "Week Streak") {
            if (!a_1.IsUnlocked) {
                matchResult_1 = 1;
            }
            else {
                matchResult_1 = 3;
            }
        }
        else if (matchValue_3 === "Variety") {
            if (!a_1.IsUnlocked) {
                matchResult_1 = 2;
            }
            else {
                matchResult_1 = 3;
            }
        }
        else {
            matchResult_1 = 3;
        }
        switch (matchResult_1) {
            case 0: {
                if (!isEmpty(model_1.Habits)) {
                    return new Achievement(a_1.Id, a_1.Title, a_1.Description, true, utcNow());
                }
                else {
                    return a_1;
                }
            }
            case 1: {
                if (exists((h_5) => (h_5.Streak >= 7), model_1.Habits)) {
                    return new Achievement(a_1.Id, a_1.Title, a_1.Description, true, utcNow());
                }
                else {
                    return a_1;
                }
            }
            case 2: {
                if (length(List_distinct(map((h_6) => h_6.Category, model_1.Habits), {
                    Equals: equals_1,
                    GetHashCode: safeHash,
                })) >= 3) {
                    return new Achievement(a_1.Id, a_1.Title, a_1.Description, true, utcNow());
                }
                else {
                    return a_1;
                }
            }
            case 3: {
                return a_1;
            }
        }
    }, model_1.Achievements), model_1.Reminders);
}

