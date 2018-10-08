import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export let options = {
  vus: 200,
  rps: 2000,
  duration: "300s",
};

export default function() {
  let res = http.get(`http://localhost:3000`);
  check(res, {
    "status was 200": r => r.status == 200 
  })
}