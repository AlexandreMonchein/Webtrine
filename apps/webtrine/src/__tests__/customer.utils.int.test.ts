import { describe, expect, it } from "vitest";

import { getCustomer } from "../customer.utils";

describe("getCustomer dev override", () => {
  it("returns ?customer= param in dev", () => {
    window.history.pushState({}, "", "/?customer=apt235");
    expect(getCustomer()).toBe("apt235");
  });

  it("ignores invalid param values", () => {
    window.history.pushState({}, "", "/?customer=../evil");
    expect(getCustomer()).not.toBe("../evil");
  });

  it("falls back to env when param absent", () => {
    window.history.pushState({}, "", "/");
    expect(typeof getCustomer()).toBe("string");
    expect(getCustomer().length).toBeGreaterThan(0);
  });
});
