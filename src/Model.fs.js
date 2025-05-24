import { Union, Record } from "./fable_modules/fable-library.4.0.0/Types.js";
import { bool_type, option_type, union_type, record_type, list_type, int32_type, string_type, class_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";

export class Habit extends Record {
    "constructor"(Id, Title, Description, TargetPerWeek, Progress, CreatedAt) {
        super();
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.TargetPerWeek = (TargetPerWeek | 0);
        this.Progress = Progress;
        this.CreatedAt = CreatedAt;
    }
}

export function Habit$reflection() {
    return record_type("Model.Habit", [], Habit, () => [["Id", class_type("System.Guid")], ["Title", string_type], ["Description", string_type], ["TargetPerWeek", int32_type], ["Progress", list_type(class_type("System.DateTime"))], ["CreatedAt", class_type("System.DateTime")]]);
}

export class Page extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Home", "Tracker", "Stats"];
    }
}

export function Page$reflection() {
    return union_type("Model.Page", [], Page, () => [[], [], []]);
}

export class NewHabitForm extends Record {
    "constructor"(Title, Description, Target, Error$) {
        super();
        this.Title = Title;
        this.Description = Description;
        this.Target = Target;
        this.Error = Error$;
    }
}

export function NewHabitForm$reflection() {
    return record_type("Model.NewHabitForm", [], NewHabitForm, () => [["Title", string_type], ["Description", string_type], ["Target", string_type], ["Error", option_type(string_type)]]);
}

export class Model extends Record {
    "constructor"(Habits, CurrentPage, NewHabitForm, DarkMode) {
        super();
        this.Habits = Habits;
        this.CurrentPage = CurrentPage;
        this.NewHabitForm = NewHabitForm;
        this.DarkMode = DarkMode;
    }
}

export function Model$reflection() {
    return record_type("Model.Model", [], Model, () => [["Habits", list_type(Habit$reflection())], ["CurrentPage", Page$reflection()], ["NewHabitForm", NewHabitForm$reflection()], ["DarkMode", bool_type]]);
}

