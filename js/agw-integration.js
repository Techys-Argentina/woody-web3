
import { createAbstractClient } from '@abstract-foundation/agw-client';
import { http } from 'viem';
import { abstractTestnet } from 'viem/chains';

let client;

async function initClient() {
  if (!client) {
    client = await createAbstractClient({
      chain: abstractTestnet,
      transport: http()
    });
  }
  return client;
}

export async function agwPurchase(type, id) {
  const PRICES = {
    montura1: 0.001,
    montura2: 0.002,
    montura3: 0.003,
    montura4: 0.01,
    world1: 0.01,
    world2: 0.01
  };

  const key = `${type}${id}`;
  const value = PRICES[key];

  if (!value) {
    alert("Compra inválida");
    return;
  }

  try {
    const client = await initClient();
    const tx = await client.sendTransaction({
      to: "0xCd993635a69bD6814a810fe6aE46CC95014781B4",
      value: BigInt(Math.floor(value * 1e18))
    });

    if (tx) {
      localStorage.setItem(key, 'on');
      if (typeof ig !== 'undefined' && ig.game && ig.game.reload) {
        ig.game.reload();
      } else {
        window.location.reload();
      }
    }
  } catch (err) {
    console.error("Error en la transacción:", err);
    alert("Fallo el pago");
  }
}
