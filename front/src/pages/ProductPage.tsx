

import {
  PhotoIcon,
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";


import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import type { Category, Product } from "my-types";
import { getAllProducts, deleteProduct } from "../api/productapi";
import { getAllCategories } from "../api/categoryapi";

import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ProductDetailModal from "../components/ProductDetailModal";




interface Props {}


const ProductPage: React.FC<Props> = () => {

  // Extra vars
  const neutralCategory = "[ select category ]";
  const navigate = useNavigate();

  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [titleQuery, setTitleQuery] = useState("");
  const [descriptionQuery, setDescriptionQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToView, setProductToView] = useState<Product | null>(null);

  // Filtering
  const filteredProducts = useMemo(() => {
      const _title = titleQuery.trim().toLowerCase();
      const _description = descriptionQuery.trim().toLowerCase();
      const _category = categoryQuery.trim().toLowerCase();

      return products.filter((p) => {
        const matchesTitle =
          _title.length === 0 ||
          p.title.toLowerCase().includes(_title);

        const matchesDescription =
          _description.length === 0 ||
          p.description.toLowerCase().includes(_description);

        const matchesCategory = 
          _category.length === 0 ||
          _category === neutralCategory ||
          p.category.title.toLowerCase() == _category;
        
        //console.log(`MATCH [${matchesCategory ? 'TRUE' : 'FALSE'}], Product ${p.title}, Category: ${p.category.title.toLowerCase()}, Looking for ${_category}`);
        return matchesTitle && matchesDescription && matchesCategory;
      });
    }, [descriptionQuery, titleQuery, categoryQuery, products, categories]);

  
  // Behaviour
  useEffect( () => {
    getAllProducts().then((_products: Product[]) => {
      setProducts(_products)
    });

    getAllCategories().then(
      (_categories: Category[]) => {
        setCategories(_categories)
    });

  }, [])
  
  const handleDelete = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id).then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setProductToDelete(null);
    }).catch(() => {
      console.log("Error deleting product");
    });
  };

  // Behaviour test 
  /*
  useEffect( () => {
    getAllProducts().then(setProducts)
  }, [products]) //*/

  // Render
  return (
    <div className="p-6">
      <nav className="bg-white shadow rounded-lg">


        {/* Header */}
        <div className="border-b p-4">
          <p className="text-lg font-semibold">All Products</p>
        </div>

        
        {/* Filter */}
        <div className="px-4 py-4 space-y-3">
          <h2 className="text-sm font-semibold text-gray-900">Filter</h2>

          <div className="flex flex-wrap gap-3 items-end">

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Title
              </label>
              <input
                className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Title"
                value={titleQuery}
                onChange={(e) => setTitleQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Description
              </label>
              <input
                className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                type="text"
                placeholder="Description"
                value={descriptionQuery}
                onChange={(e) => setDescriptionQuery(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600">
                Category
              </label>
              <select className="mt-1 w-40 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm 
              text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
              "
              defaultValue={neutralCategory}
              onChange={e => {setCategoryQuery(e.target.value)}}
              >
                <option className="text-gray-500">{neutralCategory}</option>
                {categories.length === 0 ? 
                ( <option>None</option> )
                : ( 
                  categories.map(category => (
                    <option>{category.title}</option>
                  ))
                )}
              </select>
            </div>

            <div>
            </div>

          </div>
        </div>

        {/* Results */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-md font-semibold mb-2">Results</h2>
            <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 
            py-1.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 
            focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            onClick={() => navigate("/products/new")}
            >
                NEW PRODUCT
            </button>
          </div>


          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Title</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Disc.%</th>
                    <th className="p-2 border">Rating</th>
                    <th className="p-2 border">Stock</th>
                    <th className="p-2 border">Modify</th>
                    <th className="p-2 border">Delete</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      className="px-3 py-6 text-center text-sm text-gray-500"
                      colSpan={10}
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 font-medium text-gray-900">
                        {index + 1}
                      </td>

                      <td className="px-3 py-3 text-center text-gray-700">
                        <PhotoIcon
                          className="mx-auto h-4 w-4 text-gray-400"
                        />
                      </td>

                      <td className="px-3 py-3">
                        <button 
                          className="text-blue-600 hover:underline text-sm font-medium"
                          onClick={() => setProductToView(product)}>
                          {product.title}
                        </button>
                      </td>

                      <td className="px-3 py-3 text-sm text-gray-600">
                        {product.description}
                      </td>

                      <td className="px-3 py-3 text-gray-700">
                        {product.price.toFixed(2)}
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {product.discountPercentage.toFixed(1)}
                        %
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {product.rating}
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {product.stock}
                      </td>

                      {/* Edit */}
                      <td className="px-3 py-3 text-center">
                        <button
                          onClick={() => navigate(`/products/${product.id}/edit`, { state: { product } })
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                      </td>

                      {/* Delete */}
                      <td className="px-3 py-3 text-center">
                        <button onClick={() => setProductToDelete(product)}
                          className="text-red-600 hover:text-red-800">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>

            </table>
          </div>
        </div>

        {/*Popups*/}
        <ProductDetailModal
          product={productToView}
          onClose={() => setProductToView(null)}
          onEdit={() => {
            navigate(`/products/${productToView?.id}/edit`, { state: { product: productToView } });
            setProductToView(null);
          }}
        />

        <DeleteConfirmModal
          product={productToDelete}
          onClose={() => setProductToDelete(null)}
          onConfirm={handleDelete}
        />

      </nav>
    </div>
  );
};

export default ProductPage;