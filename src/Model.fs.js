import { Record, Union } from "./fable_modules/fable-library.4.0.0/Types.js";
import { enum_type, bool_type, option_type, record_type, list_type, int32_type, class_type, union_type, string_type } from "./fable_modules/fable-library.4.0.0/Reflection.js";

export class HabitCategory extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Health", "Productivity", "Learning", "Personal", "Other"];
    }
}

export function HabitCategory$reflection() {
    return union_type("Model.HabitCategory", [], HabitCategory, () => [[], [], [], [], [["Item", string_type]]]);
}

export class Habit extends Record {
    "constructor"(Id, Title, Description, TargetPerWeek, Progress, CreatedAt, Category, Streak) {
        super();
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.TargetPerWeek = (TargetPerWeek | 0);
        this.Progress = Progress;
        this.CreatedAt = CreatedAt;
        this.Category = Category;
        this.Streak = (Streak | 0);
    }
}

export function Habit$reflection() {
    return record_type("Model.Habit", [], Habit, () => [["Id", class_type("System.Guid")], ["Title", string_type], ["Description", string_type], ["TargetPerWeek", int32_type], ["Progress", list_type(class_type("System.DateTime"))], ["CreatedAt", class_type("System.DateTime")], ["Category", HabitCategory$reflection()], ["Streak", int32_type]]);
}

export class Page extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Home", "Tracker", "Stats", "Achievements"];
    }
}

export function Page$reflection() {
    return union_type("Model.Page", [], Page, () => [[], [], [], []]);
}

export class NewHabitForm extends Record {
    "constructor"(Title, Description, Target, SelectedCategory, Error$) {
        super();
        this.Title = Title;
        this.Description = Description;
        this.Target = Target;
        this.SelectedCategory = SelectedCategory;
        this.Error = Error$;
    }
}

export function NewHabitForm$reflection() {
    return record_type("Model.NewHabitForm", [], NewHabitForm, () => [["Title", string_type], ["Description", string_type], ["Target", string_type], ["SelectedCategory", string_type], ["Error", option_type(string_type)]]);
}

export class TimeRange extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Week", "Month", "Year"];
    }
}

export function TimeRange$reflection() {
    return union_type("Model.TimeRange", [], TimeRange, () => [[], [], []]);
}

export class StatsFilter extends Record {
    "constructor"(TimeRange, CategoryFilter) {
        super();
        this.TimeRange = TimeRange;
        this.CategoryFilter = CategoryFilter;
    }
}

export function StatsFilter$reflection() {
    return record_type("Model.StatsFilter", [], StatsFilter, () => [["TimeRange", TimeRange$reflection()], ["CategoryFilter", option_type(HabitCategory$reflection())]]);
}

export class Achievement extends Record {
    "constructor"(Id, Title, Description, IsUnlocked, UnlockDate) {
        super();
        this.Id = Id;
        this.Title = Title;
        this.Description = Description;
        this.IsUnlocked = IsUnlocked;
        this.UnlockDate = UnlockDate;
    }
}

export function Achievement$reflection() {
    return record_type("Model.Achievement", [], Achievement, () => [["Id", class_type("System.Guid")], ["Title", string_type], ["Description", string_type], ["IsUnlocked", bool_type], ["UnlockDate", option_type(class_type("System.DateTime"))]]);
}

export class Reminder extends Record {
    "constructor"(HabitId, Time, Days, IsActive) {
        super();
        this.HabitId = HabitId;
        this.Time = Time;
        this.Days = Days;
        this.IsActive = IsActive;
    }
}

export function Reminder$reflection() {
    return record_type("Model.Reminder", [], Reminder, () => [["HabitId", class_type("System.Guid")], ["Time", class_type("System.TimeSpan")], ["Days", list_type(enum_type("System.DayOfWeek", int32_type, [["Sunday", 0], ["Monday", 1], ["Tuesday", 2], ["Wednesday", 3], ["Thursday", 4], ["Friday", 5], ["Saturday", 6]]))], ["IsActive", bool_type]]);
}

export class Model extends Record {
    "constructor"(Habits, CurrentPage, NewHabitForm, DarkMode, StatsFilter, Achievements, Reminders) {
        super();
        this.Habits = Habits;
        this.CurrentPage = CurrentPage;
        this.NewHabitForm = NewHabitForm;
        this.DarkMode = DarkMode;
        this.StatsFilter = StatsFilter;
        this.Achievements = Achievements;
        this.Reminders = Reminders;
    }
}

export function Model$reflection() {
    return record_type("Model.Model", [], Model, () => [["Habits", list_type(Habit$reflection())], ["CurrentPage", Page$reflection()], ["NewHabitForm", NewHabitForm$reflection()], ["DarkMode", bool_type], ["StatsFilter", StatsFilter$reflection()], ["Achievements", list_type(Achievement$reflection())], ["Reminders", list_type(Reminder$reflection())]]);
}

