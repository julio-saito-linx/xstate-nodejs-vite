import { interpret, waitFor } from "xstate";
import { machine } from "./mixerMachine";
import { test } from "vitest";

test.only("mixerMachine interpreter", async () => {
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

  actor.send({ type: "LIGAR" });

  actor.send({ type: "AUMENTAR" });
  actor.send({ type: "AUMENTAR" });
  actor.send({ type: "AUMENTAR" });
  actor.send({ type: "AUMENTAR" });
  actor.send({ type: "DIMINUIR" });
  actor.send({ type: "DIMINUIR" });
  actor.send({ type: "DIMINUIR" });
  actor.send({ type: "DIMINUIR" });
  actor.send({ type: "DIMINUIR" });

  actor.send({ type: "DESLIGAR" });

  subscription.unsubscribe();
}, 50000);
