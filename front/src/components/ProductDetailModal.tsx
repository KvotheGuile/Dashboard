import type { Product } from "my-types"

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon, PencilIcon, PhotoIcon } from "@heroicons/react/24/outline";

interface Props{
  product: Product | null;
  onClose: () => void;
  onEdit: () => void;
}

interface FieldProps {
  label: string;
  value: string;
}


const Field: React.FC<FieldProps> = ({ label, value }) => (
  <div className="m-2">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="mt-1 text-sm text-gray-900">{value}</p>
  </div>
);

const ProductDetailModal: React.FC<Props> = ({ product, onClose, onEdit }) => {
  return (
    <Dialog open={product !== null} onClose={onClose} className="relative z-50">

      {/* 1. Overlay oscuro */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* 2. Contenedor centrador */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-white shadow-xl flex flex-col">

          
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <DialogTitle className="text-base font-semibold text-gray-900">
            Product Details
        </DialogTitle>
        <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
        >
            <XMarkIcon className="h-5 w-5" />
        </button>
        </div>


        {/* Body */}
        <div className="m-3">
            <div className="flex items-center gap-4">
                <div className="shrink-0 flex items-center justify-center h-16 w-16 rounded-lg bg-gray-100 border border-gray-200">
                    <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</p>
                    <p className="text-base font-semibold text-gray-900">{product?.title}</p>
                    <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {product?.category.title}
                    </span>
                </div>
            </div>

            <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Description</p>
            <p className="mt-1 text-sm text-gray-900 leading-relaxed">{product?.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-gray-100 pt-4">
                <Field label="Price"       value={`$${product?.price.toFixed(2)}`} />
                <Field label="Stock"       value={String(product?.stock)} />
                <Field label="Discount"    value={`${product?.discountPercentage.toFixed(1)}%`} />
                <Field label="Rating"      value={`${product?.rating} / 10`} />
                <Field label="Category ID" value={String(product?.category.id)} />
                <Field label="Product ID"  value={String(product?.id)} />
            </div>
        </div>
        

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
        <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
            Close
        </button>
        <button
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
            <PencilIcon className="h-4 w-4" />
            Edit
        </button>
        </div>

        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ProductDetailModal;
