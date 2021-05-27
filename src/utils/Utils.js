import { firedb } from "../Firebaseconfig";

export default function validateRefs(refs) {
  let ok = true;
  let message = "";
  refs.forEach((element) => {
    console.log(element);
    if (element.current.value === "" || element.current.value === "default") {
      ok = false;
      message = "empty fields";
      return;
    }
    if (
      element.current.attributes["type"].value !== "number" &&
      element.current.value.length < 3
    ) {
      ok = false;
      message = "smaller word";
      return;
    }
    if (element.current.attributes["type"].value === "email") {
      if (!element.current.value.includes("@")) {
        ok = false;
        message = "not valid email address";
        return;
      }
    }
  });
  return { success: ok, message: message };
}

export function statusSwitch(status) {
  switch (status) {
    case "rejected":
      return (
        <button className="bg-red-400 text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Inspection Failed
        </button>
      );
    case "injested":
      return (
        <button className="bg-indigo-500 text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "moderation":
      return (
        <button className="bg-indigo-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "approved":
      return (
        <button className="bg-green-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          approved
        </button>
      );
    case "live":
      return (
        <button className="bg-indigo-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Locked
        </button>
      );
    case "consideration":
      return (
        <button className="bg-purple-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Processing
        </button>
      );
    default:
      return (
        <button className="bg-yellow-500 rounded text-white h-7 w-max text-center p-1 shadow-lg focus:outline-none">
          Pending
        </button>
      );
  }
}
export function getEarnigns(data) {
  var total = 0;
  data.forEach((d) => {
    total += Number(d.earnings);
  });

  return total;
}

export async function updateEarnings(user) {
  return new Promise(async (resolve, reject) => {
    var total = 0;
    var paid = 0;
    var stats = [];
    await firedb
      .collection("album")
      .where("email", "==", user)
      .get()
      .then((data) => {
        data.docs.forEach((d) => {
          var datastate = d.data();
          if (datastate?.stats) stats.push(datastate.stats);
        });
        return true;
      })
      .catch((e) => false);

    stats.forEach((stat) => {
      stat.forEach((earn) => {
        total += Number.parseInt(earn.earnings);
      });
    });

    firedb
      .collection("user")
      .doc(user)
      .collection("transactions")
      .onSnapshot((snapshot) => {
        console.log(stats);
        snapshot.docs.forEach((snap) => {
          paid += snap.data().amount;
        });
        console.log(stats);
        firedb
          .collection("user")
          .doc(user)
          .update({
            transactionStat: { outstanding: total - paid, total: total },
          })
          .then(() => {
            resolve(true);
          })
          .catch((e) => {
            reject(false);
          });
      });
  });
}

export function calculateTotalTransaction(data) {
  return data.reduce((total, a) => total + Number.parseInt(a.amount), 0);
}
