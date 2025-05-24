import { FSharpRef, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { Reminder, Habit, HabitCategory, Model, StatsFilter as StatsFilter_2, TimeRange, NewHabitForm as NewHabitForm_1, Page, Achievement, HabitCategory$reflection, TimeRange$reflection, Page$reflection } from "./Model.fs.js";
import { union_type, option_type, class_type, string_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";
import { isNullOrWhiteSpace } from "./fable_modules/fable-library.4.0.0/String.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.0.0/Choice.js";
import { tryParse } from "./fable_modules/fable-library.4.0.0/Int32.js";
import { length, tryFind, exists, map, filter, empty, ofArray, cons, head, tail, sortDescending, isEmpty } from "./fable_modules/fable-library.4.0.0/List.js";
import { utcNow, addDays, date as date_2, equals, compare } from "./fable_modules/fable-library.4.0.0/Date.js";
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

export function calculateStreak(progress) {
    if (isEmpty(progress)) {
        return 0;
    }
    else {
        const sorted = sortDescending(progress, {
            Compare: compare,
        });
        const loop = (currentStreak_mut, dates_mut) => {
            loop:
            while (true) {
                const currentStreak = currentStreak_mut, dates = dates_mut;
                if (!isEmpty(dates)) {
                    if (!isEmpty(tail(dates))) {
                        const d1 = head(dates);
                        const d2 = head(tail(dates));
                        const rest = tail(tail(dates));
                        if (equals(date_2(d1), addDays(date_2(d2), 1))) {
                            currentStreak_mut = (currentStreak + 1);
                            dates_mut = cons(d2, rest);
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
        return loop(0, sorted) | 0;
    }
}

export function init() {
    const defaultAchievements = ofArray([new Achievement(newGuid(), "First Step", "Add your first habit", false, void 0), new Achievement(newGuid(), "Week Streak", "Complete a habit every day for a week", false, void 0), new Achievement(newGuid(), "Variety", "Have habits in 3 different categories", false, void 0)]);
    return new Model(empty(), new Page(0, []), new NewHabitForm_1("", "", "", "Health", void 0), true, new StatsFilter_2(new TimeRange(0, []), void 0), defaultAchievements, empty());
}

export function update(msg, model) {
    let model_1;
    switch (msg.tag) {
        case 1: {
            const title = msg.fields[0];
            let updatedForm;
            const inputRecord = model.NewHabitForm;
            updatedForm = (new NewHabitForm_1(title, inputRecord.Description, inputRecord.Target, inputRecord.SelectedCategory, inputRecord.Error));
            model_1 = (new Model(model.Habits, model.CurrentPage, updatedForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 2: {
            const desc = msg.fields[0];
            let updatedForm_1;
            const inputRecord_1 = model.NewHabitForm;
            updatedForm_1 = (new NewHabitForm_1(inputRecord_1.Title, desc, inputRecord_1.Target, inputRecord_1.SelectedCategory, inputRecord_1.Error));
            model_1 = (new Model(model.Habits, model.CurrentPage, updatedForm_1, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 3: {
            const target = msg.fields[0];
            let updatedForm_2;
            const inputRecord_2 = model.NewHabitForm;
            updatedForm_2 = (new NewHabitForm_1(inputRecord_2.Title, inputRecord_2.Description, target, inputRecord_2.SelectedCategory, inputRecord_2.Error));
            model_1 = (new Model(model.Habits, model.CurrentPage, updatedForm_2, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 4: {
            const category = msg.fields[0];
            let updatedForm_3;
            const inputRecord_3 = model.NewHabitForm;
            updatedForm_3 = (new NewHabitForm_1(inputRecord_3.Title, inputRecord_3.Description, inputRecord_3.Target, category, inputRecord_3.Error));
            model_1 = (new Model(model.Habits, model.CurrentPage, updatedForm_3, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 5: {
            const form = model.NewHabitForm;
            const matchValue = validateHabit(form.Title, form.Description, form.Target);
            if (matchValue.tag === 1) {
                const msg_1 = matchValue.fields[0];
                const formWithError = new NewHabitForm_1(form.Title, form.Description, form.Target, form.SelectedCategory, msg_1);
                model_1 = (new Model(model.Habits, model.CurrentPage, formWithError, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            }
            else {
                const target_1 = matchValue.fields[0] | 0;
                let category_1;
                const matchValue_1 = form.SelectedCategory;
                if (matchValue_1 === "Health") {
                    category_1 = (new HabitCategory(0, []));
                }
                else if (matchValue_1 === "Productivity") {
                    category_1 = (new HabitCategory(1, []));
                }
                else if (matchValue_1 === "Learning") {
                    category_1 = (new HabitCategory(2, []));
                }
                else if (matchValue_1 === "Personal") {
                    category_1 = (new HabitCategory(3, []));
                }
                else {
                    const other = matchValue_1;
                    category_1 = (new HabitCategory(4, [other]));
                }
                const newHabit = new Habit(newGuid(), form.Title, form.Description, target_1, empty(), utcNow(), category_1, 0);
                model_1 = (new Model(cons(newHabit, model.Habits), model.CurrentPage, new NewHabitForm_1("", "", "", "Health", void 0), model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            }
            break;
        }
        case 6: {
            const habitId = msg.fields[0];
            const updatedHabits = filter((h) => (h.Id !== habitId), model.Habits);
            model_1 = (new Model(updatedHabits, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 7: {
            const habitId_1 = msg.fields[0];
            const date = msg.fields[1];
            const updatedHabits_1 = map((h_1) => {
                if (h_1.Id === habitId_1) {
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
            }, model.Habits);
            model_1 = (new Model(updatedHabits_1, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 8: {
            const habitId_2 = msg.fields[0];
            const date_1 = msg.fields[1];
            const updatedHabits_2 = map((h_2) => {
                if (h_2.Id === habitId_2) {
                    const newProgress_1 = filter((d_1) => (!equals(date_2(d_1), date_2(date_1))), h_2.Progress);
                    return new Habit(h_2.Id, h_2.Title, h_2.Description, h_2.TargetPerWeek, newProgress_1, h_2.CreatedAt, h_2.Category, calculateStreak(newProgress_1));
                }
                else {
                    return h_2;
                }
            }, model.Habits);
            model_1 = (new Model(updatedHabits_2, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 9: {
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, !model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
            break;
        }
        case 10: {
            const range = msg.fields[0];
            const currentFilter = model.StatsFilter;
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, new StatsFilter_2(range, currentFilter.CategoryFilter), model.Achievements, model.Reminders));
            break;
        }
        case 11: {
            const category_2 = msg.fields[0];
            const currentFilter_1 = model.StatsFilter;
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, new StatsFilter_2(currentFilter_1.TimeRange, category_2), model.Achievements, model.Reminders));
            break;
        }
        case 13: {
            const habitId_3 = msg.fields[0];
            const existingReminder = tryFind((r) => (r.HabitId === habitId_3), model.Reminders);
            let updatedReminders;
            if (existingReminder == null) {
                updatedReminders = cons(new Reminder(habitId_3, create(20, 0, 0), ofArray([1, 3, 5]), true), model.Reminders);
            }
            else {
                const r_1 = existingReminder;
                updatedReminders = map((rem) => {
                    if (rem.HabitId === habitId_3) {
                        return new Reminder(rem.HabitId, rem.Time, rem.Days, !rem.IsActive);
                    }
                    else {
                        return rem;
                    }
                }, model.Reminders);
            }
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, updatedReminders));
            break;
        }
        case 12: {
            const updatedAchievements = map((a) => {
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
                        const categories = List_distinct(map((h_4) => h_4.Category, model.Habits), {
                            Equals: equals_1,
                            GetHashCode: safeHash,
                        });
                        if (length(categories) >= 3) {
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
            }, model.Achievements);
            model_1 = (new Model(model.Habits, model.CurrentPage, model.NewHabitForm, model.DarkMode, model.StatsFilter, updatedAchievements, model.Reminders));
            break;
        }
        case 14: {
            model_1 = model;
            break;
        }
        default: {
            const page = msg.fields[0];
            model_1 = (new Model(model.Habits, page, model.NewHabitForm, model.DarkMode, model.StatsFilter, model.Achievements, model.Reminders));
        }
    }
    const modelWithAchievements = new Model(model_1.Habits, model_1.CurrentPage, model_1.NewHabitForm, model_1.DarkMode, model_1.StatsFilter, map((a_1) => {
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
                const categories_1 = List_distinct(map((h_6) => h_6.Category, model_1.Habits), {
                    Equals: equals_1,
                    GetHashCode: safeHash,
                });
                if (length(categories_1) >= 3) {
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
    return modelWithAchievements;
}

