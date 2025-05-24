import { loadState } from "./Api.fs.js";
import { update, Msg, init as init_1 } from "./Update.fs.js";
import { singleton } from "./fable_modules/fable-library.4.0.0/List.js";
import { ProgramModule_mkSimple, ProgramModule_run } from "./fable_modules/Fable.Elmish.4.0.0/program.fs.js";
import { Program_withReactBatched } from "./fable_modules/Fable.Elmish.React.4.0.0/react.fs.js";
import { rootView } from "./View.fs.js";

export function init() {
    const matchValue = loadState();
    if (matchValue == null) {
        return init_1();
    }
    else {
        const savedState = matchValue;
        return savedState;
    }
}

export function subscribe(model) {
    return singleton((dispatch) => {
        window.addEventListener("storage", (_arg) => {
            const matchValue = loadState();
            if (matchValue == null) {
            }
            else {
                const state = matchValue;
                dispatch(new Msg(12, []));
            }
        });
    });
}

ProgramModule_run(Program_withReactBatched("app", ProgramModule_mkSimple(init, update, rootView)));

