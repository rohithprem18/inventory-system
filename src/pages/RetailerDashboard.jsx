import React, { useMemo, useState } from "react";
import ProductForm from "../components/ProductForm.jsx";
import ProductTable from "../components/ProductTable.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { loadProducts, saveProducts, splitByExpiry, sortByExpiry } from "../utils/products.js";

export default function RetailerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState(() => loadProducts());
  const [editing, setEditing] = useState(null);

  const retailerProducts = useMemo(
    () => products.filter((p) => p.retailerId === user.id),
    [products, user.id]
  );

  const sections = useMemo(() => splitByExpiry(retailerProducts), [retailerProducts]);

  const recommendations = useMemo(() => {
    const prioritized = [...sections.expiringSoon, ...sections.safe];
    return sortByExpiry(prioritized).slice(0, 5);
  }, [sections]);

  const handleAdd = (data) => {
    const newProduct = {
      ...data,
      productId: crypto.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      retailerId: user.id,
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveProducts(updated);
  };

  const handleEdit = (data) => {
    if (!editing) return;
    const updated = products.map((p) =>
      p.productId === editing.productId
        ? { ...p, ...data, productId: editing.productId, retailerId: editing.retailerId }
        : p
    );
    setProducts(updated);
    saveProducts(updated);
    setEditing(null);
  };

  const handleDelete = (product) => {
    const confirmed = window.confirm(`Delete ${product.productName}?`);
    if (!confirmed) return;
    const updated = products.filter((p) => p.productId !== product.productId);
    setProducts(updated);
    saveProducts(updated);
  };

  return (
    <div className="page">
      <section className="page__header">
        <div>
          <h2>Retailer Dashboard</h2>
          <p className="muted">Manage your inventory and track expiry risks.</p>
        </div>
        <div className="tag">Total: {retailerProducts.length}</div>
      </section>

      <section className="grid grid--2 gap">
        <ProductForm
          initialValues={editing ? {
            productName: editing.productName,
            category: editing.category,
            quantity: editing.quantity,
            price: editing.price,
            expiryDate: editing.expiryDate,
          } : null}
          onSubmit={editing ? handleEdit : handleAdd}
          onCancel={() => setEditing(null)}
        />
        <div className="card">
          <h3>Top Expiry Recommendations</h3>
          <p className="muted">Focus on the closest expiry dates to reduce waste.</p>
          <ProductTable products={recommendations} />
        </div>
      </section>

      <section className="section">
        <h3>Expiring Soon (≤ 7 days)</h3>
        <ProductTable
          products={sections.expiringSoon}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </section>

      <section className="section">
        <h3>Expired Products</h3>
        <ProductTable
          products={sections.expired}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </section>

      <section className="section">
        <h3>Safe Products</h3>
        <ProductTable
          products={sections.safe}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
