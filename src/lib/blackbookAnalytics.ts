import type { BlackbookProduct } from "@/data/blackbookCatalog";

const checkoutProductById: Record<BlackbookProduct["id"], string> = {
  "blackbook-01": "blackbook_01",
  "blackbook-02": "blackbook_02",
  "blackbook-03": "blackbook_03",
  "blackbook-complete-system": "complete_system",
};

export const trackBlackbookCheckout = (productId: BlackbookProduct["id"]) => {
  try {
    if (typeof gtag !== "undefined") {
      gtag("event", "blackbook_checkout_clicked", {
        product: checkoutProductById[productId],
        source: "blackbook_catalog",
      });
    }
  } catch {
    // El tracking es fail-open: nunca bloquea el enlace de checkout.
  }
};
