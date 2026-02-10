import React from "react";
import { getExpiryStatus, daysUntil } from "../utils/products.js";

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="table">
      <div className="table__row table__head">
        <span>Name</span>
        <span>Category</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Expiry</span>
        <span>Status</span>
        {(onEdit || onDelete) && <span>Actions</span>}
      </div>
      {products.length === 0 && <div className="table__empty">No products found.</div>}
      {products.map((product) => {
        const status = getExpiryStatus(product.expiryDate);
        const days = daysUntil(product.expiryDate);
        return (
          <div className="table__row" key={product.productId}>
            <span>{product.productName}</span>
            <span>{product.category}</span>
            <span>{product.quantity}</span>
            <span>${Number(product.price).toFixed(2)}</span>
            <span>{product.expiryDate}</span>
            <span className={`status status--${status}`}>
              {status === "expired" ? "Expired" : status === "expiring" ? `Expiring (${days}d)` : "Safe"}
            </span>
            {(onEdit || onDelete) && (
              <span className="table__actions">
                {onEdit && (
                  <button className="btn btn--ghost" onClick={() => onEdit(product)}>
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button className="btn btn--danger" onClick={() => onDelete(product)}>
                    Delete
                  </button>
                )}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
