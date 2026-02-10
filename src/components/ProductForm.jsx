import React, { useEffect, useState } from "react";

const emptyForm = {
  productName: "",
  category: "",
  quantity: "",
  price: "",
  expiryDate: "",
};

export default function ProductForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(initialValues ? { ...initialValues } : emptyForm);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };
    onSubmit(payload);
    if (!initialValues) {
      setForm(emptyForm);
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>{initialValues ? "Edit Product" : "Add Product"}</h3>
      <div className="grid grid--2">
        <label>
          Product Name
          <input
            name="productName"
            value={form.productName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Quantity
          <input
            name="quantity"
            type="number"
            min="0"
            value={form.quantity}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Expiry Date
          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form__actions">
        <button className="btn" type="submit">
          {initialValues ? "Update" : "Add Product"}
        </button>
        {initialValues && (
          <button className="btn btn--ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
