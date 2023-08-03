import { interpret } from "xstate";
import { machine } from "./mixerMachine";
import { test } from "vitest";
import { printSnapshot } from "../../utils/tests/printSnapshot";

test("mixerMachine interpreter", async () => {
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

  actor.send({ type: "LIGAR" });

  actor.send({ type: "AUMENTAR" });

  actor.send({ type: "DESLIGAR" });
  actor.send({ type: "LIGAR" });

  actor.send({ type: "AUMENTAR" });
  actor.send({ type: "DIMINUIR" });
  actor.send({ type: "DIMINUIR" });

  actor.send({ type: "DESLIGAR" });
  actor.send({ type: "LIGAR" });

  actor.send({ type: "AUMENTAR" });

  actor.send({ type: "DESLIGAR" });
  actor.send({ type: "LIGAR" });

  actor.send({ type: "AUMENTAR" });

  actor.send({ type: "DESLIGAR" });
  actor.send({ type: "LIGAR" });

  subscription.unsubscribe();
}, 50000);
