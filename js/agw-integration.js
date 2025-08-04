
// Script para integrar Abstract Wallet y desbloqueo de contenido en el juego

import { AbstractWalletProvider, useLoginWithAbstract, useAbstractClient } from '@abstract-foundation/agw-react';

// Mapeo de precios por tipo e ID
const PRICES = {
  montura1: 0.001,
  montura2: 0.002,
  montura3: 0.003,
  montura4: 0.01,
  world1: 0.01,
  world2: 0.01
};

const toWei = (eth) => BigInt(Math.floor(eth * 1e18));

export async function agwPurchase(type, id) {
  const { login } = useLoginWithAbstract();
  const { data: client } = useAbstractClient();

  await login();
  if (!client) {
    alert("No se pudo conectar la wallet");
    return;
  }

  const key = `${type}${id}`;
  const value = PRICES[key];

  if (!value) {
    alert("Elemento no válido para comprar");
    return;
  }

  try {
    const txHash = await client.sendTransaction({
      to: "0xCd993635a69bD6814a810fe6aE46CC95014781B4", // Cambiar por tu dirección
      value: toWei(value)
    });

    if (txHash) {
      localStorage.setItem(key, 'on');
      if (typeof ig !== 'undefined' && ig.game && ig.game.reload) {
        ig.game.reload(); // Actualiza el juego si existe el método
      } else {
        window.location.reload();
      }
    }
  } catch (err) {
    console.error("Error en la transacción:", err);
    alert("Falló la transacción");
  }
}
