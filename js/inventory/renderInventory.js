import { getInventory, updateInventory } from "./inventory.js";

export function rerenderInventory(newInventory) {


    const invenotry = getInventory();

    const container = $('.inventory');

    console.log(newInventory);

    for (let i = 0; i < newInventory.length; i++) {
        console.log(newInventory[i], invenotry[i]);
        if (JSON.stringify(newInventory[i]) === JSON.stringify(invenotry[i])) {
            continue


        } else {
            container.append($("<div/>").addClass(newInventory[i].type));

        }
        updateInventory(newInventory);
    }
}

