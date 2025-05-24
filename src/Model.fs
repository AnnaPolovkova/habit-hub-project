module Model

open System

type HabitId = Guid

type Habit = {
    Id: HabitId
    Title: string
    Description: string
    TargetPerWeek: int
    Progress: DateTime list
    CreatedAt: DateTime
}

type Page =
    | Home
    | Tracker
    | Stats

type NewHabitForm = {
    Title: string
    Description: string
    Target: string
    Error: string option
}

type Model = {
    Habits: Habit list
    CurrentPage: Page
    NewHabitForm: NewHabitForm
    DarkMode: bool
}
