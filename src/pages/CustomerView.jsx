import React, { useMemo, useState } from "react";
import ProductTable from "../components/ProductTable.jsx";
import { filterNonExpired, loadProducts, sortByExpiry } from "../utils/products.js";

export default function CustomerView() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const products = useMemo(() => filterNonExpired(loadProducts()), []);
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    return sortByExpiry(
      products.filter((p) => {
        const matchesQuery = p.productName.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || p.category === category;
        const matchesMin = minPrice === "" || Number(p.price) >= Number(minPrice);
        const matchesMax = maxPrice === "" || Number(p.price) <= Number(maxPrice);
        return matchesQuery && matchesCategory && matchesMin && matchesMax;
      })
    );
  }, [products, query, category, minPrice, maxPrice]);

  return (
    <div className="page">
      <section className="page__header">
        <div>
          <h2>Available Products</h2>
          <p className="muted">Only non-expired items are shown to customers.</p>
        </div>
        <div className="tag">Total: {filtered.length}</div>
      </section>

      <section className="card filters">
        <label>
          Search
          <input
            placeholder="Search by name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          Min Price
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </label>
        <label>
          Max Price
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </label>
      </section>

      <section className="section">
        <ProductTable products={filtered} />
      </section>
    </div>
  );
}
