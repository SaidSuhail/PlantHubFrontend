import React from "react";

function ConfirmDeleteModal({ title = "Confirm Delete", message = "Are you sure you want to delete this item?", onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0  bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4 text-red-600">{title}</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
