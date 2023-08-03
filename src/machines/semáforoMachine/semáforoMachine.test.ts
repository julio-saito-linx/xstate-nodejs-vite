import { interpret } from "xstate";
import { machine } from "./semáforoMachine";
import { test } from "vitest";

test.only("semáforoMachine interpreter", async () => {
  const actor = interpret(machine);

  const subscription = actor.subscribe({
    next(snapshot) {
      console.log(".", snapshot.value, ":", snapshot.context);
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
  }, 10000);

  subscription.unsubscribe();
}, 50000);
