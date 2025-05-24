module Model

open System

type HabitId = Guid

type HabitCategory =
    | Health
    | Productivity
    | Learning
    | Personal
    | Other of string

type Habit = {
    Id: HabitId
    Title: string
    Description: string
    TargetPerWeek: int
    Progress: DateTime list
    CreatedAt: DateTime
    Category: HabitCategory
    Streak: int
}

type Page =
    | Home
    | Tracker
    | Stats
    | Achievements

type NewHabitForm = {
    Title: string
    Description: string
    Target: string
    SelectedCategory: string
    Error: string option
}

type TimeRange =
    | Week
    | Month
    | Year

type StatsFilter = {
    TimeRange: TimeRange
    CategoryFilter: HabitCategory option
}

type Achievement = {
    Id: Guid
    Title: string
    Description: string
    IsUnlocked: bool
    UnlockDate: DateTime option
}

type Reminder = {
    HabitId: HabitId
    Time: TimeSpan
    Days: DayOfWeek list
    IsActive: bool
}

type Model = {
    Habits: Habit list
    CurrentPage: Page
    NewHabitForm: NewHabitForm
    DarkMode: bool
    StatsFilter: StatsFilter
    Achievements: Achievement list
    Reminders: Reminder list
}