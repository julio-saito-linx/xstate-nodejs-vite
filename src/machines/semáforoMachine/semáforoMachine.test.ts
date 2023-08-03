import { interpret, waitFor } from "xstate";
import { machine } from "./semáforoMachine";
import { test } from "vitest";
import { printSnapshot } from "../../utils/tests/printSnapshot";

test("semáforoMachine interpreter", async () => {
  return await new Promise(async (done) => {
    const actor = interpret(machine);

    const subscription = actor.subscribe({
      next(snapshot) {
        printSnapshot({ snapshot, __filename });
      },
      error(data) {
        console.error(data);
        // ...
      },
      complete() {
        console.log("done");
        // ...
      },
    });

    // Ativa a máquina
    actor.start();

    actor.send({ type: "POWER_ON" });

    setTimeout(() => {
      actor.send({ type: "POWER_OFF" });
      subscription.unsubscribe();
      done({
        value: "done",
      });
    }, 600);

    const loggedInState = await waitFor(actor, (state) =>
      state.hasTag("green")
    );

    console.log(loggedInState.value);
  });
}, 5000);
