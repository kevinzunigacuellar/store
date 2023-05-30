import {
  cart,
  removeItemFromCart,
  updateCartItemQuantity,
  getCartTotal,
  getItemSubTotal,
} from "../scripts/store";
import { Counter } from "./Counter";
import { For, createSignal, Show, createEffect } from "solid-js";
import type { CartProduct } from "../env.d.ts";

export function CartList() {
  return (
    <Show
      when={cart.length > 0}
      fallback={<p class="text-center py-8">Your cart is empty</p>}
    >
      <p class="block text-right border-b pb-1 py-4 mb-4">Subtotal</p>
      <div class="grid grid-cols-1 gap-8">
        <For each={cart}>{(item) => <Card {...item} />}</For>
      </div>
      <p class="block border-t text-right pt-1 mt-4">
        <span class="font-bold">Total: </span>${getCartTotal().toFixed(2)}
      </p>
    </Show>
  );
}

function Card({ name, price, quantity, image, id }: CartProduct) {
  const [count, setCount] = createSignal(quantity);

  createEffect(() => {
    updateCartItemQuantity(id, count());
  });

  const increaseCounter = () => {
    setCount((c) => c + 1);
  };

  const decreaseCounter = () => {
    setCount((c) => c - 1);
  };

  return (
    <article class="flex gap-3 sm:gap-6">
      <img src={image} alt={name} class="w-1/3 sm:w-40 h-auto rounded-md" />
      <div class="text-sm sm:text-base flex flex-col gap-1 flex-1">
        <h2 class="font-medium">{name}</h2>
        <p>{price.toFixed(2)}</p>
        <div class="flex flex-col sm:flex-row gap-1.5">
          <Counter
            count={count}
            increaseCounter={increaseCounter}
            decreaseCounter={decreaseCounter}
          />
          <div>
            <button
              class="bg-red-200 p-2 rounded-md text-red-700 border border-transparent hover:bg-red-300"
              onClick={() => removeItemFromCart(id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p>${getItemSubTotal(id).toFixed(2)}</p>
    </article>
  );
}
