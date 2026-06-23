export function identificarCat(url) {
    if (!url || typeof url !== 'string') {
        return "desconhecido"
    }

    const urlLower = url.toLowerCase()

const palavrasEcommerce = ["shop", "store", "loja", "marketplace", "market", "ecommerce", "commerce", "buy", "cart", "checkout", "order", "orders", "purchase", "purchases", "sales", "deals", "offers", "product", "products", "catalog", "collection", "collections", "category", "categories", "item", "items", "inventory", "payment", "payments", "billing", "invoice", "invoices", "shipping", "delivery", "shipment", "coupon", "coupons", "discount", "discounts", "voucher", "vouchers", "seller", "vendor", "merchant"]
    if (palavrasEcommerce.some(palavra => urlLower.includes(palavra))) {
        return "ecommerce"
    }
    
    const palavrasServico = ["service", "services", "tool", "tools", "utility", "utilities", "app", "dashboard", "panel", "platform", "portal", "system", "manager", "management", "api", "cloud", "hosting", "storage", "analytics", "monitor", "tracking", "workspace", "suite", "solutions", "software", "saas", "automation", "generator", "converter", "calculator"]
    if (palavrasServico.some(palavra => urlLower.includes(palavra))) {
        return "utilitarios"
    } return "desconhecido"
}