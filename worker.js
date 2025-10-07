import { parentPort, workerData } from "worker_threads";
import fetch from "node-fetch";

const { chunk, token, headers_token, cookiesString } = workerData;

async function getOfferForPoint(point) {
  const headers = {
    ...headers_token,
    "content-type": "application/json",
    "origin": "https://dostavka.yandex.ru",
    "x-csrf-token": token,
    cookie: cookiesString,
  };

  const data = {
    items: [
      { title: "Другое", cost_value: "0", cost_currency: "RUB", quantity: 1, pickup_point: 0, dropoff_point: 1 },
    ],
    requirements: { taxi_class: ["express"], cargo_options: [] },
    route_points: [point, point],
    payment_info: { kind: "card", has_disable_reason: false },
  };

  try {
    const response = await fetch(
      "https://dostavka.yandex.ru/api/b2b/phoenix/dcaa/cargo/v2/offers/calculate",
      { method: "POST", headers, body: JSON.stringify(data) }
    );
    const json = await response.json();
    return { lat: point.lat, lon: point.lon, price: json?.claims_offers?.[3]?.price?.total_price ?? 0 };
  } catch {
    return { lat: point.lat, lon: point.lon, price: 0 };
  }
}

Promise.all(chunk.map(getOfferForPoint)).then((data) => parentPort.postMessage(data));